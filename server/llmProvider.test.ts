import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "legal@parisgroup.ae",
    name: "Legal Department",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return ctx;
}

describe("llmProvider.getCurrent", () => {
  it("returns current LLM provider information", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.llmProvider.getCurrent();

    expect(result).toHaveProperty("provider");
    expect(result).toHaveProperty("info");
    expect(["manus", "gemini"]).toContain(result.provider);
    expect(result.info).toHaveProperty("name");
    expect(result.info).toHaveProperty("description");
  });
});

describe("llmProvider.getAvailable", () => {
  it("returns list of available providers", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.llmProvider.getAvailable();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    
    // Check that each provider has required fields
    result.forEach(provider => {
      expect(provider).toHaveProperty("id");
      expect(provider).toHaveProperty("name");
      expect(provider).toHaveProperty("available");
      expect(provider).toHaveProperty("current");
      expect(["manus", "gemini"]).toContain(provider.id);
    });
  });

  it("marks Manus as always available", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.llmProvider.getAvailable();
    const manusProvider = result.find(p => p.id === "manus");

    expect(manusProvider).toBeDefined();
    expect(manusProvider?.available).toBe(true);
  });
});

describe("llmProvider.getInfo", () => {
  it("returns Manus provider information", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.llmProvider.getInfo({ provider: "manus" });

    expect(result).toHaveProperty("name");
    expect(result).toHaveProperty("description");
    expect(result).toHaveProperty("features");
    expect(result).toHaveProperty("status");
    expect(result.name).toContain("Manus");
  });

  it("returns Gemini provider information", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.llmProvider.getInfo({ provider: "gemini" });

    expect(result).toHaveProperty("name");
    expect(result).toHaveProperty("description");
    expect(result).toHaveProperty("features");
    expect(result).toHaveProperty("status");
    expect(result.name).toContain("Gemini");
  });
});
