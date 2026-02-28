import { render, screen } from "@testing-library/react";
import ExchangeResults from "@/components/ExchangeResults";

const mockConversions: Record<string, number> = {
  COP: 4000,
  MXN: 17,
  GNS: 1,
  BAL: 0.1,
  SLK: 0.05,
};

describe("ExchangeResults", () => {
  it("renders the RESULTADOS header", () => {
    render(
      <ExchangeResults
        conversions={mockConversions}
        selectedCode="USD"
        lastUpdated={null}
      />
    );
    expect(screen.getByText("RESULTADOS")).toBeInTheDocument();
  });

  it("renders a row for each currency except the selected one", () => {
    render(
      <ExchangeResults
        conversions={mockConversions}
        selectedCode="USD"
        lastUpdated={null}
      />
    );
    expect(screen.getByText("COP")).toBeInTheDocument();
    expect(screen.getByText("MXN")).toBeInTheDocument();
    expect(screen.getByText("GNS")).toBeInTheDocument();
  });

  it("does not render the selected currency in results", () => {
    render(
      <ExchangeResults
        conversions={mockConversions}
        selectedCode="USD"
        lastUpdated={null}
      />
    );
    // USD should not appear as a result row code (only in button above, not here)
    const allCodes = screen.queryAllByText("USD");
    expect(allCodes.length).toBe(0);
  });

  it("shows lastUpdated when provided", () => {
    render(
      <ExchangeResults
        conversions={mockConversions}
        selectedCode="USD"
        lastUpdated="Mon, 01 Jan 2024 00:00:00 +0000"
      />
    );
    expect(screen.getByText(/Actualizado/)).toBeInTheDocument();
  });

  it("does not show lastUpdated when null", () => {
    render(
      <ExchangeResults
        conversions={mockConversions}
        selectedCode="USD"
        lastUpdated={null}
      />
    );
    expect(screen.queryByText(/Actualizado/)).not.toBeInTheDocument();
  });
});
