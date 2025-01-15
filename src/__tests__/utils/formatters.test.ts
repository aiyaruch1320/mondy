import { describe, expect, it } from "vitest";
import { formatDate } from "../../utils/formatters";

describe("formatters", () => {
  describe("formatDate", () => {
    it("formats date string correctly", () => {
      const date = new Date("2025-01-15");
      expect(formatDate(date.toISOString())).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);
      expect(formatDate(date.toISOString())).toEqual("15/1/2025");
    });
  });
});
