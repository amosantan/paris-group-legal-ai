import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { SignJWT } from "jose";
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
      console.log("[LocalAuth] Login attempt:", { username: input.username });
      
      // Check credentials
      if (
        input.username !== ADMIN_CREDENTIALS.username ||
        input.password !== ADMIN_CREDENTIALS.password
      ) {
        console.log("[LocalAuth] Invalid credentials");
        throw new Error("Invalid credentials");
      }

      console.log("[LocalAuth] Credentials valid, querying database...");
      console.log("[LocalAuth] DATABASE_URL configured:", !!DATABASE_URL);
      console.log("[LocalAuth] Looking for user ID:", ADMIN_CREDENTIALS.userId);
      
      // Get user from database using postgres client directly
      const sql = postgres(DATABASE_URL, {
        max: 1,
        idle_timeout: 20,
        connect_timeout: 10,
      });
      
      try {
        console.log("[LocalAuth] Executing SQL query...");
        const result = await sql`
          SELECT id, email, name, role 
          FROM users 
          WHERE id = ${ADMIN_CREDENTIALS.userId}
          LIMIT 1
        `;
        
        console.log("[LocalAuth] Query completed, result count:", result?.length || 0);
        console.log("[LocalAuth] Query result:", JSON.stringify(result));
        
        await sql.end();
        console.log("[LocalAuth] Connection closed");
        
        if (!result || result.length === 0) {
          console.error("[LocalAuth] User not found in database");
          throw new Error("User not found in database");
        }
        
        const user = result[0];

        console.log("[LocalAuth] User found:", { id: user.id, email: user.email, name: user.name, role: user.role });
        
        // Generate JWT token with OAuth-compatible fields using jose library
        const secretKey = new TextEncoder().encode(JWT_SECRET);
        const token = await new SignJWT({
          // Local auth fields
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          // OAuth-compatible fields (required by verifySession)
          openId: user.id, // Use local user ID as openId
          appId: process.env.VITE_APP_ID || "local-dev", // Use the app ID from env
        })
          .setProtectedHeader({ alg: "HS256" })
          .setExpirationTime("7d")
          .sign(secretKey);
        
        console.log("[LocalAuth] JWT payload:", {
          id: user.id,
          openId: user.id,
          appId: process.env.VITE_APP_ID,
          name: user.name,
          role: user.role,
        });

        console.log("[LocalAuth] JWT token generated, length:", token.length);
        
        // Set cookie
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, token, cookieOptions);
        
        console.log("[LocalAuth] Cookie set with name:", COOKIE_NAME);
        console.log("[LocalAuth] Login successful!");

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
        console.error("[LocalAuth] Error during login:", error);
        try {
          await sql.end();
        } catch (endError) {
          console.error("[LocalAuth] Error closing connection:", endError);
        }
        throw new Error(error instanceof Error ? error.message : "Login failed");
      }
    }),

  // Check if local auth is enabled
  isEnabled: publicProcedure.query(() => {
    return {
      enabled: process.env.NODE_ENV === "development" || process.env.ENABLE_LOCAL_AUTH === "true",
    };
  }),
});
