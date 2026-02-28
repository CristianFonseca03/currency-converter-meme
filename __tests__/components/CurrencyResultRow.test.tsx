import { render, screen } from "@testing-library/react";
import CurrencyResultRow from "@/components/CurrencyResultRow";
import type { Currency } from "@/types/currency";

const realCurrency: Currency = {
  code: "COP",
  name: "Peso colombiano",
  emoji: "🇨🇴",
  fictional: false,
};

const fictionalCurrency: Currency = {
  code: "GNS",
  name: "Gansito",
  emoji: "🪿",
  fictional: true,
  usdEquivalent: 1,
};

describe("CurrencyResultRow", () => {
  it("renders currency code and name", () => {
    render(<CurrencyResultRow currency={realCurrency} convertedAmount={4000} />);
    expect(screen.getByText("COP")).toBeInTheDocument();
    expect(screen.getByText("Peso colombiano")).toBeInTheDocument();
  });

  it("formats the converted amount with 2 decimal places", () => {
    render(<CurrencyResultRow currency={realCurrency} convertedAmount={4000} />);
    expect(screen.getByText("4,000.00")).toBeInTheDocument();
  });

  it("renders the currency emoji", () => {
    render(<CurrencyResultRow currency={realCurrency} convertedAmount={1} />);
    expect(screen.getByText("🇨🇴")).toBeInTheDocument();
  });

  it("applies blue color class for fictional currencies", () => {
    render(<CurrencyResultRow currency={fictionalCurrency} convertedAmount={5} />);
    const amountEl = screen.getByText("5.00");
    expect(amountEl).toHaveClass("text-blue-400");
  });

  it("applies white color class for real currencies", () => {
    render(<CurrencyResultRow currency={realCurrency} convertedAmount={100} />);
    const amountEl = screen.getByText("100.00");
    expect(amountEl).toHaveClass("text-white");
  });

  it("formats large numbers with thousands separator", () => {
    render(<CurrencyResultRow currency={realCurrency} convertedAmount={1234567.89} />);
    expect(screen.getByText("1,234,567.89")).toBeInTheDocument();
  });
});
