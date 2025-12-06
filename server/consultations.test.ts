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

describe("consultations.create", () => {
  it("creates a new consultation with valid data", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.consultations.create({
      title: "Test Rental Dispute",
      category: "rental_dispute",
      language: "en",
    });

    expect(result).toHaveProperty("consultationId");
    expect(typeof result.consultationId).toBe("number");
    expect(result.consultationId).toBeGreaterThan(0);
  });

  it("creates consultation with Arabic language", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.consultations.create({
      title: "نزاع إيجار",
      category: "rental_dispute",
      language: "ar",
    });

    expect(result).toHaveProperty("consultationId");
    expect(typeof result.consultationId).toBe("number");
  });

  it("creates consultation for real estate transaction", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.consultations.create({
      title: "Property Transfer Consultation",
      category: "real_estate_transaction",
      language: "en",
    });

    expect(result).toHaveProperty("consultationId");
    expect(typeof result.consultationId).toBe("number");
  });
});

describe("consultations.list", () => {
  it("retrieves user consultations", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Create a consultation first
    await caller.consultations.create({
      title: "Test Consultation",
      category: "contract_review",
      language: "en",
    });

    const consultations = await caller.consultations.list();

    expect(Array.isArray(consultations)).toBe(true);
    expect(consultations.length).toBeGreaterThan(0);
  });
});
