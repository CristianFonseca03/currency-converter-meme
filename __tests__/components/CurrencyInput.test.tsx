import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CurrencyInput from "@/components/CurrencyInput";

// Mock AudioContext and fetch since jsdom doesn't support them
global.fetch = jest.fn().mockResolvedValue({
  arrayBuffer: jest.fn().mockResolvedValue(new ArrayBuffer(0)),
}) as unknown as typeof fetch;

global.AudioContext = jest.fn().mockImplementation(() => ({
  decodeAudioData: jest.fn().mockResolvedValue({}),
  createBufferSource: jest.fn().mockReturnValue({
    buffer: null,
    connect: jest.fn(),
    start: jest.fn(),
  }),
  destination: {},
  close: jest.fn(),
})) as unknown as typeof AudioContext;

const defaultProps = {
  amount: "100",
  selectedCode: "USD",
  onAmountChange: jest.fn(),
  onCurrencyChange: jest.fn(),
};

describe("CurrencyInput", () => {
  beforeEach(() => jest.clearAllMocks());

  it("renders the amount input with the current value", () => {
    render(<CurrencyInput {...defaultProps} />);
    const input = screen.getByRole("spinbutton");
    expect(input).toHaveValue(100);
  });

  it("shows the selected currency code", () => {
    render(<CurrencyInput {...defaultProps} />);
    expect(screen.getByText("USD")).toBeInTheDocument();
  });

  it("calls onAmountChange when typing", async () => {
    const onAmountChange = jest.fn();
    render(<CurrencyInput {...defaultProps} onAmountChange={onAmountChange} />);
    const input = screen.getByRole("spinbutton");
    await userEvent.clear(input);
    await userEvent.type(input, "200");
    expect(onAmountChange).toHaveBeenCalled();
  });

  it("opens currency dropdown on button click", async () => {
    render(<CurrencyInput {...defaultProps} />);
    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(screen.getByText("COP")).toBeInTheDocument();
    expect(screen.getByText("MXN")).toBeInTheDocument();
  });

  it("calls onCurrencyChange when selecting a currency", async () => {
    const onCurrencyChange = jest.fn();
    render(<CurrencyInput {...defaultProps} onCurrencyChange={onCurrencyChange} />);
    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByText("COP"));
    expect(onCurrencyChange).toHaveBeenCalledWith("COP");
  });

  it("closes dropdown after selecting a currency", async () => {
    render(<CurrencyInput {...defaultProps} />);
    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByText("COP"));
    expect(screen.queryByText("MXN")).not.toBeInTheDocument();
  });
});
