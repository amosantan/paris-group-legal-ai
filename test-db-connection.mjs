import { drizzle } from "drizzle-orm/mysql2";

// Check if DATABASE_URL is set
const dbUrl = process.env.DATABASE_URL;

console.log("=== Database Connection Test ===");
console.log("DATABASE_URL set:", dbUrl ? "✅ Yes" : "❌ No");

if (dbUrl) {
  console.log("DATABASE_URL format:", dbUrl.substring(0, 20) + "...");
  
  try {
    const db = drizzle(dbUrl);
    console.log("Database instance created: ✅");
    
    // Try a simple query
    const result = await db.execute("SELECT 1 as test");
    console.log("Database query test: ✅", result);
  } catch (error) {
    console.log("Database connection error: ❌");
    console.error(error.message);
  }
} else {
  console.log("\n⚠️  DATABASE_URL environment variable is not set");
  console.log("The application needs DATABASE_URL to connect to MySQL");
}

console.log("\n=== Environment Check ===");
console.log("NODE_ENV:", process.env.NODE_ENV || "not set");
console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY ? "✅ Set" : "❌ Not set");
console.log("OAUTH_SERVER_URL:", process.env.OAUTH_SERVER_URL || "not set");
