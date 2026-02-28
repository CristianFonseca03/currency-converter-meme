import { convertAll, ALL_CURRENCIES, REAL_CURRENCIES, FICTIONAL_CURRENCIES } from "@/lib/currencies";
import type { ExchangeRates } from "@/types/currency";

const mockRates: ExchangeRates = {
  COP: 4000,
  MXN: 17,
  lastUpdated: "2024-01-01T00:00:00Z",
};

describe("ALL_CURRENCIES", () => {
  it("includes real currencies", () => {
    const codes = ALL_CURRENCIES.map((c) => c.code);
    expect(codes).toContain("USD");
    expect(codes).toContain("COP");
    expect(codes).toContain("MXN");
  });

  it("includes fictional currencies", () => {
    expect(FICTIONAL_CURRENCIES.length).toBeGreaterThan(0);
    FICTIONAL_CURRENCIES.forEach((c) => {
      expect(c.fictional).toBe(true);
      expect(c.usdEquivalent).toBeDefined();
    });
  });

  it("contains all real + fictional currencies", () => {
    expect(ALL_CURRENCIES.length).toBe(REAL_CURRENCIES.length + FICTIONAL_CURRENCIES.length);
  });
});

describe("convertAll", () => {
  it("converts USD to COP correctly", () => {
    const result = convertAll(1, "USD", mockRates);
    expect(result["COP"]).toBe(4000);
  });

  it("converts USD to MXN correctly", () => {
    const result = convertAll(1, "USD", mockRates);
    expect(result["MXN"]).toBe(17);
  });

  it("converts COP to USD correctly", () => {
    const result = convertAll(4000, "COP", mockRates);
    expect(result["USD"]).toBeCloseTo(1);
  });

  it("converts MXN to COP correctly (cross-currency via USD)", () => {
    // 17 MXN → 1 USD → 4000 COP
    const result = convertAll(17, "MXN", mockRates);
    expect(result["COP"]).toBeCloseTo(4000);
  });

  it("converts USD to fictional currency", () => {
    const fictional = FICTIONAL_CURRENCIES[0];
    const result = convertAll(5, "USD", mockRates);
    // fromUSD: 5 / usdEquivalent
    expect(result[fictional.code]).toBeCloseTo(5 / fictional.usdEquivalent!);
  });

  it("converts fictional currency to USD", () => {
    const fictional = FICTIONAL_CURRENCIES[0];
    const amount = 3;
    const result = convertAll(amount, fictional.code, mockRates);
    // toUSD: amount * usdEquivalent
    expect(result["USD"]).toBeCloseTo(amount * fictional.usdEquivalent!);
  });

  it("returns 0 for all currencies when amount is 0", () => {
    const result = convertAll(0, "USD", mockRates);
    Object.values(result).forEach((v) => expect(v).toBe(0));
  });

  it("does not include the source currency in results", () => {
    const result = convertAll(100, "USD", mockRates);
    expect(result["USD"]).toBeUndefined();
  });

  it("returns results for all other currencies", () => {
    const result = convertAll(1, "USD", mockRates);
    const expectedCount = ALL_CURRENCIES.length - 1;
    expect(Object.keys(result).length).toBe(expectedCount);
  });
});
