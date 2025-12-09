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

describe("Knowledge Base", () => {
  it("should search knowledge base articles", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const results = await caller.knowledgeBase.search({
      query: "rental",
      category: "all",
      language: "en",
    });

    expect(results).toBeDefined();
    expect(Array.isArray(results)).toBe(true);
    expect(results.length).toBeGreaterThan(0);
  });

  it("should filter by category", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const results = await caller.knowledgeBase.search({
      category: "rental_law",
      language: "en",
    });

    expect(results).toBeDefined();
    expect(results.every((article: any) => article.category === "rental_law")).toBe(true);
  });

  it("should get categories with counts", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const categories = await caller.knowledgeBase.getCategories();

    expect(categories).toBeDefined();
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(0);
    expect(categories[0]).toHaveProperty("value");
    expect(categories[0]).toHaveProperty("label");
    expect(categories[0]).toHaveProperty("count");
  });

  it("should search for eviction procedures", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const results = await caller.knowledgeBase.search({
      query: "eviction",
      category: "all",
      language: "en",
    });

    expect(results.length).toBeGreaterThan(0);
    const hasEvictionContent = results.some((article: any) =>
      article.contentEn.toLowerCase().includes("eviction") ||
      article.titleEn.toLowerCase().includes("eviction")
    );
    expect(hasEvictionContent).toBe(true);
  });

  it("should search for security deposit information", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const results = await caller.knowledgeBase.search({
      query: "security deposit",
      category: "all",
      language: "en",
    });

    expect(results.length).toBeGreaterThan(0);
  });

  it("should return all articles when no query provided", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const results = await caller.knowledgeBase.search({
      category: "all",
      language: "en",
    });

    expect(results).toBeDefined();
    expect(results.length).toBeGreaterThan(30); // We have 42 articles
  });
});

describe("Bookmarks", () => {
  it("should create a bookmark", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.bookmarks.create({
      articleId: "26-2007-art1",
      notes: "Important article about rental law",
    });

    expect(result).toBeDefined();
    expect(result.bookmarkId).toBeGreaterThan(0);
  });

  it("should list user bookmarks", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const bookmarks = await caller.bookmarks.list();

    expect(bookmarks).toBeDefined();
    expect(Array.isArray(bookmarks)).toBe(true);
  });

  it("should check if article is bookmarked", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // First create a bookmark
    await caller.bookmarks.create({
      articleId: "test-article-123",
      notes: "Test bookmark",
    });

    // Then check if it exists
    const result = await caller.bookmarks.checkBookmark({
      articleId: "test-article-123",
    });

    expect(result).toBeDefined();
    expect(result.isBookmarked).toBe(true);
    expect(result.bookmark).toBeDefined();
  });

  it("should prevent duplicate bookmarks", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const articleId = "duplicate-test-article";

    // Create first bookmark
    await caller.bookmarks.create({
      articleId,
      notes: "First bookmark",
    });

    // Try to create duplicate - should throw error
    await expect(
      caller.bookmarks.create({
        articleId,
        notes: "Duplicate bookmark",
      })
    ).rejects.toThrow("Article already bookmarked");
  });

  it("should delete a bookmark", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Create a bookmark
    const { bookmarkId } = await caller.bookmarks.create({
      articleId: "delete-test-article",
      notes: "To be deleted",
    });

    // Delete it
    const result = await caller.bookmarks.delete({ id: bookmarkId });

    expect(result.success).toBe(true);

    // Verify it's deleted
    const check = await caller.bookmarks.checkBookmark({
      articleId: "delete-test-article",
    });
    expect(check.isBookmarked).toBe(false);
  });

  it("should update bookmark notes", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Create a bookmark
    const { bookmarkId } = await caller.bookmarks.create({
      articleId: "update-test-article",
      notes: "Original notes",
    });

    // Update notes
    const result = await caller.bookmarks.updateNotes({
      id: bookmarkId,
      notes: "Updated notes",
    });

    expect(result.success).toBe(true);

    // Verify update
    const check = await caller.bookmarks.checkBookmark({
      articleId: "update-test-article",
    });
    expect(check.bookmark?.notes).toBe("Updated notes");
  });
});
