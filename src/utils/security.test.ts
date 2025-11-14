import { describe, it, expect } from "vitest";
import { sanitizeHtml, validateEmail, validatePassword } from "../utils/security";

describe("Security Utils", () => {
  describe("sanitizeHtml", () => {
    it("should remove script tags", () => {
      const input = '<script>alert("xss")</script>Hello';
      const result = sanitizeHtml(input);
      expect(result).not.toContain("<script>");
    });

    it("should preserve normal text", () => {
      const input = "Hello World";
      const result = sanitizeHtml(input);
      expect(result).toBe("Hello World");
    });
  });

  describe("validateEmail", () => {
    it("should validate correct email", () => {
      expect(validateEmail("test@example.com")).toBe(true);
    });

    it("should reject invalid email", () => {
      expect(validateEmail("invalid-email")).toBe(false);
    });

    it("should reject empty string", () => {
      expect(validateEmail("")).toBe(false);
    });
  });

  describe("validatePassword", () => {
    it("should require minimum 8 characters", () => {
      const result = validatePassword("short");
      expect(result.isValid).toBe(false);
    });

    it("should require uppercase letter", () => {
      const result = validatePassword("password123");
      expect(result.isValid).toBe(false);
    });

    it("should validate strong password", () => {
      const result = validatePassword("StrongPass123");
      expect(result.isValid).toBe(true);
    });
  });
});
