import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import postgres from "postgres";

const JWT_SECRET = process.env.JWT_SECRET || "paris-legal-ai-jwt-secret-2025-secure-token-key-v9";
const DATABASE_URL = process.env.DATABASE_URL || "";

// Development-only local authentication
// This bypasses OAuth for local development
// TODO: Remove this in production and use OAuth from sanzen.ae

const ADMIN_CREDENTIALS = {
  username: "SanzenAdmin",
  password: "Admin",
  userId: "sanzen-admin-001",
};

export const localAuthRouter = router({
  // Local login endpoint (development only)
  login: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Check credentials
      if (
        input.username !== ADMIN_CREDENTIALS.username ||
        input.password !== ADMIN_CREDENTIALS.password
      ) {
        throw new Error("Invalid credentials");
      }

      // Get user from database using postgres client directly
      const sql = postgres(DATABASE_URL);
      
      try {
        const result = await sql`
          SELECT id, email, name, role 
          FROM users 
          WHERE id = ${ADMIN_CREDENTIALS.userId}
          LIMIT 1
        `;
        
        await sql.end();
        
        if (!result || result.length === 0) {
          throw new Error("User not found in database");
        }
        
        const user = result[0];

        // Generate JWT token
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          },
          JWT_SECRET,
          { expiresIn: "7d" }
        );

        // Set cookie
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, token, cookieOptions);

        return {
          success: true,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          },
        };
      } catch (error) {
        await sql.end();
        throw error;
      }
    }),

  // Check if local auth is enabled
  isEnabled: publicProcedure.query(() => {
    return {
      enabled: process.env.NODE_ENV === "development" || process.env.ENABLE_LOCAL_AUTH === "true",
    };
  }),
});
