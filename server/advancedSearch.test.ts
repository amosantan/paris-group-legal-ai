import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "sample-user",
    email: "sample@example.com",
    name: "Sample User",
    loginMethod: "manus",
    role: "user",
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
    res: {} as TrpcContext["res"],
  };

  return ctx;
}

describe("Advanced Search Features", () => {
  describe("Multi-category Search", () => {
    it("should filter by multiple categories", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const results = await caller.knowledgeBase.search({
        categories: ["rental_law", "civil_code"],
        language: "en",
      });

      expect(results).toBeDefined();
      expect(results.every((article: any) => 
        article.category === "rental_law" || article.category === "civil_code"
      )).toBe(true);
    });

    it("should return all articles when categories includes 'all'", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const results = await caller.knowledgeBase.search({
        categories: ["all"],
        language: "en",
      });

      expect(results).toBeDefined();
      expect(results.length).toBeGreaterThan(30);
    });

    it("should support single category filter for backward compatibility", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const results = await caller.knowledgeBase.search({
        category: "rental_law",
        language: "en",
      });

      expect(results).toBeDefined();
      expect(results.every((article: any) => article.category === "rental_law")).toBe(true);
    });
  });

  describe("Date Range Filter", () => {
    it("should filter by date range (from and to)", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const results = await caller.knowledgeBase.search({
        dateFrom: "2007",
        dateTo: "2008",
        language: "en",
      });

      expect(results).toBeDefined();
      // Should include laws from 2007-2008 (Law 26/2007, Law 33/2008, Law 8/2007)
      expect(results.length).toBeGreaterThan(0);
      
      // Verify all results are within date range
      results.forEach((article: any) => {
        const yearMatch = article.lawNumber.match(/(\d{4})/);
        if (yearMatch) {
          const year = parseInt(yearMatch[1]);
          expect(year).toBeGreaterThanOrEqual(2007);
          expect(year).toBeLessThanOrEqual(2008);
        }
      });
    });

    it("should filter by dateFrom only", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const results = await caller.knowledgeBase.search({
        dateFrom: "2007",
        language: "en",
      });

      expect(results).toBeDefined();
      expect(results.length).toBeGreaterThan(0);
      
      results.forEach((article: any) => {
        const yearMatch = article.lawNumber.match(/(\d{4})/);
        if (yearMatch) {
          const year = parseInt(yearMatch[1]);
          expect(year).toBeGreaterThanOrEqual(2007);
        }
      });
    });

    it("should filter by dateTo only", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const results = await caller.knowledgeBase.search({
        dateTo: "2007",
        language: "en",
      });

      expect(results).toBeDefined();
      
      results.forEach((article: any) => {
        const yearMatch = article.lawNumber.match(/(\d{4})/);
        if (yearMatch) {
          const year = parseInt(yearMatch[1]);
          expect(year).toBeLessThanOrEqual(2007);
        }
      });
    });
  });

  describe("Combined Filters", () => {
    it("should apply query, categories, and date range together", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const results = await caller.knowledgeBase.search({
        query: "rental",
        categories: ["rental_law"],
        dateFrom: "2007",
        dateTo: "2008",
        language: "en",
      });

      expect(results).toBeDefined();
      expect(results.every((article: any) => article.category === "rental_law")).toBe(true);
      
      // Verify content includes "rental"
      const hasRentalContent = results.some((article: any) =>
        article.contentEn.toLowerCase().includes("rental") ||
        article.titleEn.toLowerCase().includes("rental")
      );
      expect(hasRentalContent).toBe(true);
    });
  });
});

describe("Saved Searches", () => {
  it("should create a saved search", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.savedSearches.create({
      name: "Rental disputes 2007-2010",
      query: "dispute",
      categories: ["rental_law"],
      dateFrom: "2007",
      dateTo: "2010",
      language: "en",
    });

    expect(result).toBeDefined();
    expect(result.searchId).toBeGreaterThan(0);
  });

  it("should list user saved searches", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Create a search first
    await caller.savedSearches.create({
      name: "Test Search",
      query: "test",
      language: "en",
    });

    const searches = await caller.savedSearches.list();

    expect(searches).toBeDefined();
    expect(Array.isArray(searches)).toBe(true);
    expect(searches.length).toBeGreaterThan(0);
  });

  it("should get saved search by id", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Create a search
    const { searchId } = await caller.savedSearches.create({
      name: "Get By ID Test",
      query: "test query",
      categories: ["rental_law", "civil_code"],
      language: "en",
    });

    // Get it back
    const search = await caller.savedSearches.getById({ id: searchId });

    expect(search).toBeDefined();
    expect(search?.name).toBe("Get By ID Test");
    expect(search?.query).toBe("test query");
    expect(search?.categories).toEqual(["rental_law", "civil_code"]);
  });

  it("should delete a saved search", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Create a search
    const { searchId } = await caller.savedSearches.create({
      name: "To Be Deleted",
      query: "delete test",
      language: "en",
    });

    // Delete it
    const result = await caller.savedSearches.delete({ id: searchId });

    expect(result.success).toBe(true);

    // Verify it's deleted
    const search = await caller.savedSearches.getById({ id: searchId });
    expect(search).toBeNull();
  });

  it("should update last used timestamp", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Create a search
    const { searchId } = await caller.savedSearches.create({
      name: "Last Used Test",
      query: "test",
      language: "en",
    });

    // Get original lastUsed
    const original = await caller.savedSearches.getById({ id: searchId });
    const originalLastUsed = original?.lastUsed;

    // Wait a bit
    await new Promise(resolve => setTimeout(resolve, 100));

    // Update last used
    await caller.savedSearches.updateLastUsed({ id: searchId });

    // Get updated search
    const updated = await caller.savedSearches.getById({ id: searchId });
    const updatedLastUsed = updated?.lastUsed;

    expect(updatedLastUsed).toBeDefined();
    expect(new Date(updatedLastUsed!).getTime()).toBeGreaterThan(new Date(originalLastUsed!).getTime());
  });

  it("should rename a saved search", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Create a search
    const { searchId } = await caller.savedSearches.create({
      name: "Original Name",
      query: "test",
      language: "en",
    });

    // Rename it
    await caller.savedSearches.rename({
      id: searchId,
      name: "New Name",
    });

    // Verify rename
    const search = await caller.savedSearches.getById({ id: searchId });
    expect(search?.name).toBe("New Name");
  });

  it("should save search with minimal fields", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.savedSearches.create({
      name: "Minimal Search",
      language: "en",
    });

    expect(result).toBeDefined();
    expect(result.searchId).toBeGreaterThan(0);

    const search = await caller.savedSearches.getById({ id: result.searchId });
    expect(search?.name).toBe("Minimal Search");
    expect(search?.query).toBeNull();
    expect(search?.categories).toEqual([]);
  });

  it("should save search with all fields", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.savedSearches.create({
      name: "Complete Search",
      query: "comprehensive query",
      categories: ["rental_law", "civil_code", "escrow_law"],
      dateFrom: "2005",
      dateTo: "2024",
      language: "ar",
    });

    expect(result).toBeDefined();

    const search = await caller.savedSearches.getById({ id: result.searchId });
    expect(search?.name).toBe("Complete Search");
    expect(search?.query).toBe("comprehensive query");
    expect(search?.categories).toEqual(["rental_law", "civil_code", "escrow_law"]);
    expect(search?.dateFrom).toBe("2005");
    expect(search?.dateTo).toBe("2024");
    expect(search?.language).toBe("ar");
  });
});
