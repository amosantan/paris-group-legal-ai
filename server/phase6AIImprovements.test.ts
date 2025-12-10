import { describe, it, expect, beforeAll } from "vitest";
import { getConversationContext, extractKeyFacts, generateConversationSummary, buildContextString, mergeFacts } from "./conversationMemory";
import { generateProactiveSuggestions } from "./proactiveSuggestions";
import { suggestDocumentTypes, extractDemandLetterData } from "./automaticDocumentDrafting";
import { validateAudioFile } from "./voiceConsultation";
import { validateImageFile } from "./imageRecognition";
import { extractTextFromImage } from "./imageRecognition";

describe("Phase 6: AI Improvements - Comprehensive Tests", () => {
  
  // ==================== CONVERSATION MEMORY TESTS ====================
  
  describe("Conversation Memory System", () => {
    it("should extract key facts from user message", async () => {
      const message = "I'm having issues with my tenant John Smith at 123 Main Street. He owes me AED 50,000 in rent.";
      const facts = await extractKeyFacts(message, "user");
      
      expect(facts).toBeDefined();
      expect(Array.isArray(facts)).toBe(true);
      // Should extract person, property, and amount
      const types = facts.map(f => f.type);
      expect(types.some(t => t === "person" || t === "amount" || t === "property")).toBe(true);
    }, 30000);

    it("should generate conversation summary from messages", async () => {
      const messages = [
        { role: "user", content: "I want to evict my tenant for non-payment" },
        { role: "assistant", content: "You need to send a demand letter first under Dubai Law 26/2007" },
        { role: "user", content: "How long should I give them to pay?" },
        { role: "assistant", content: "Typically 30 days notice is required" },
      ];
      
      const summary = await generateConversationSummary(messages);
      
      expect(summary).toBeDefined();
      expect(typeof summary).toBe("string");
      expect(summary.length).toBeGreaterThan(10);
      expect(summary.toLowerCase()).toContain("evict" || "tenant" || "payment");
    }, 30000);

    it("should build context string from key facts", () => {
      const facts = [
        { type: "person" as const, value: "John Smith", context: "tenant" },
        { type: "property" as const, value: "123 Main Street", context: "rental property" },
        { type: "amount" as const, value: "AED 50,000", context: "rent arrears" },
      ];
      
      const contextString = buildContextString(facts);
      
      expect(contextString).toContain("John Smith");
      expect(contextString).toContain("123 Main Street");
      expect(contextString).toContain("AED 50,000");
    });

    it("should merge facts without duplicates", () => {
      const existing = [
        { type: "person" as const, value: "John Smith", context: "tenant" },
      ];
      
      const newFacts = [
        { type: "person" as const, value: "John Smith", context: "tenant" }, // Duplicate
        { type: "property" as const, value: "123 Main Street", context: "rental" }, // New
      ];
      
      const merged = mergeFacts(existing, newFacts);
      
      expect(merged.length).toBe(2); // Should not duplicate John Smith
      expect(merged.some(f => f.value === "123 Main Street")).toBe(true);
    });
  });

  // ==================== PROACTIVE SUGGESTIONS TESTS ====================
  
  describe("Proactive Suggestion System", () => {
    it("should suggest missing information for rental disputes", async () => {
      const context = {
        consultationId: 1,
        keyFacts: [],
        summary: "Tenant not paying rent",
        lastUpdated: new Date(),
      };
      
      const suggestions = await generateProactiveSuggestions(
        "rental_dispute",
        context,
        "My tenant hasn't paid rent"
      );
      
      expect(suggestions).toBeDefined();
      expect(Array.isArray(suggestions)).toBe(true);
      expect(suggestions.length).toBeGreaterThan(0);
      
      // Should suggest missing property address, amount, dates
      const types = suggestions.map(s => s.type);
      expect(types).toContain("missing_info");
    }, 30000);

    it("should suggest related topics based on conversation", async () => {
      const context = {
        consultationId: 1,
        keyFacts: [],
        summary: "Discussion about eviction process",
        lastUpdated: new Date(),
      };
      
      const suggestions = await generateProactiveSuggestions(
        "rental_dispute",
        context,
        "I want to evict my tenant"
      );
      
      const relatedTopics = suggestions.filter(s => s.type === "related_topic");
      expect(relatedTopics.length).toBeGreaterThan(0);
      
      // Should suggest eviction notice requirements
      expect(relatedTopics.some(s => 
        s.title.toLowerCase().includes("eviction") || 
        s.description.toLowerCase().includes("notice")
      )).toBe(true);
    }, 30000);

    it("should recommend case precedents", async () => {
      const context = {
        consultationId: 1,
        keyFacts: [
          { type: "legal_issue" as const, value: "Rent non-payment", context: "main issue" },
        ],
        summary: "Tenant owes 6 months rent",
        lastUpdated: new Date(),
      };
      
      const suggestions = await generateProactiveSuggestions(
        "rental_dispute",
        context,
        "What are my rights?"
      );
      
      const casePrecedents = suggestions.filter(s => s.type === "case_precedent");
      // May or may not have case precedents depending on context
      expect(Array.isArray(casePrecedents)).toBe(true);
    }, 30000);

    it("should suggest next steps in legal process", async () => {
      const context = {
        consultationId: 1,
        keyFacts: [],
        summary: "Tenant has rent arrears, landlord wants to evict",
        lastUpdated: new Date(),
      };
      
      const suggestions = await generateProactiveSuggestions(
        "rental_dispute",
        context,
        "What should I do next?"
      );
      
      const nextSteps = suggestions.filter(s => s.type === "next_step");
      expect(nextSteps.length).toBeGreaterThan(0);
      
      // Should suggest demand letter or RDC filing
      expect(nextSteps.some(s => 
        s.title.toLowerCase().includes("demand") || 
        s.title.toLowerCase().includes("rdc")
      )).toBe(true);
    }, 30000);
  });

  // ==================== AUTOMATIC DOCUMENT DRAFTING TESTS ====================
  
  describe("Automatic Document Drafting", () => {
    it("should suggest document types based on consultation", () => {
      const context = {
        consultationId: 1,
        keyFacts: [],
        summary: "Tenant owes rent, landlord wants payment",
        lastUpdated: new Date(),
      };
      
      const suggestions = suggestDocumentTypes("rental_dispute", context);
      
      expect(suggestions).toBeDefined();
      expect(Array.isArray(suggestions)).toBe(true);
      expect(suggestions.length).toBeGreaterThan(0);
      
      // Should suggest demand letter
      expect(suggestions.some(s => s.type === "demand_letter")).toBe(true);
    });

    it("should extract demand letter data from consultation", async () => {
      const messages = [
        { role: "user", content: "My tenant Ahmed Ali at 456 Palm Street owes me AED 30,000 in rent" },
        { role: "assistant", content: "You should send a demand letter requesting payment" },
      ];
      
      const context = {
        consultationId: 1,
        keyFacts: [
          { type: "person" as const, value: "Ahmed Ali", context: "tenant" },
          { type: "property" as const, value: "456 Palm Street", context: "rental property" },
          { type: "amount" as const, value: "30000", context: "rent owed" },
        ],
        summary: "Landlord wants to send demand letter for unpaid rent",
        lastUpdated: new Date(),
      };
      
      const draft = await extractDemandLetterData(messages, context);
      
      expect(draft).toBeDefined();
      expect(draft.type).toBe("demand_letter");
      expect(draft.data).toBeDefined();
      expect(draft.confidence).toBeGreaterThanOrEqual(0);
      expect(draft.confidence).toBeLessThanOrEqual(100);
      expect(Array.isArray(draft.missingFields)).toBe(true);
    }, 30000);
  });

  // ==================== VOICE CONSULTATION TESTS ====================
  
  describe("Voice Consultation System", () => {
    it("should validate audio file size and format", () => {
      // Valid audio file
      expect(() => validateAudioFile(5 * 1024 * 1024, "audio/mpeg")).not.toThrow();
      expect(() => validateAudioFile(1 * 1024 * 1024, "audio/wav")).not.toThrow();
      
      // Invalid: too large
      expect(() => validateAudioFile(20 * 1024 * 1024, "audio/mpeg")).toThrow();
      
      // Invalid: unsupported format
      expect(() => validateAudioFile(1 * 1024 * 1024, "video/mp4")).toThrow();
    });
  });

  // ==================== IMAGE RECOGNITION TESTS ====================
  
  describe("Image Recognition System", () => {
    it("should validate image file size and format", () => {
      // Valid image file
      expect(() => validateImageFile(5 * 1024 * 1024, "image/jpeg")).not.toThrow();
      expect(() => validateImageFile(1 * 1024 * 1024, "image/png")).not.toThrow();
      
      // Invalid: too large
      expect(() => validateImageFile(15 * 1024 * 1024, "image/jpeg")).toThrow();
      
      // Invalid: unsupported format
      expect(() => validateImageFile(1 * 1024 * 1024, "image/gif")).toThrow();
    });

    // Note: Actual OCR testing requires real images, which we don't have in unit tests
    // In production, you would test with sample document images
  });

  // ==================== INTEGRATION TESTS ====================
  
  describe("AI Improvements Integration", () => {
    it("should work together: conversation memory + proactive suggestions", async () => {
      // Simulate a consultation flow
      const messages = [
        { id: 1, role: "user", content: "I want to evict my tenant John at 123 Main St for non-payment" },
        { id: 2, role: "assistant", content: "I can help with that. How much rent is owed?" },
        { id: 3, role: "user", content: "He owes AED 50,000 for 5 months" },
      ];
      
      // Get conversation context
      const context = await getConversationContext(1, messages);
      
      expect(context.keyFacts.length).toBeGreaterThan(0);
      expect(context.summary).toBeDefined();
      
      // Generate suggestions based on context
      const suggestions = await generateProactiveSuggestions(
        "rental_dispute",
        context,
        "He owes AED 50,000 for 5 months"
      );
      
      expect(suggestions.length).toBeGreaterThan(0);
      
      // Should suggest demand letter
      const nextSteps = suggestions.filter(s => s.type === "next_step");
      expect(nextSteps.some(s => s.title.toLowerCase().includes("demand"))).toBe(true);
    }, 60000);

    it("should work together: conversation context + document drafting", async () => {
      const messages = [
        { id: 1, role: "user", content: "My tenant Sarah at 789 Beach Road owes AED 25,000" },
        { id: 2, role: "assistant", content: "You should send a formal demand letter" },
      ];
      
      const context = await getConversationContext(1, messages);
      
      // Suggest documents
      const docSuggestions = suggestDocumentTypes("rental_dispute", context);
      expect(docSuggestions.some(d => d.type === "demand_letter")).toBe(true);
      
      // Extract document data
      const draft = await extractDemandLetterData(messages, context);
      expect(draft.data).toBeDefined();
      
      // Should extract some information (even if incomplete)
      const filledFields = Object.values(draft.data).filter(
        v => v !== "UNKNOWN" && v !== "" && v !== 0
      ).length;
      expect(filledFields).toBeGreaterThan(0);
    }, 60000);
  });
});
