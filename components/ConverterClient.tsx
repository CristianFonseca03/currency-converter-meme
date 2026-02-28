"use client";

import { useState } from "react";
import { convertAll } from "@/lib/currencies";
import type { ExchangeRates } from "@/types/currency";
import CurrencyInput from "./CurrencyInput";
import ExchangeResults from "./ExchangeResults";
import Equivalencies from "./Equivalencies";

interface ConverterClientProps {
  initialRates: ExchangeRates;
}

export default function ConverterClient({ initialRates }: ConverterClientProps) {
  const [amount, setAmount] = useState("1");
  const [selectedCode, setSelectedCode] = useState("USD");
  const [rates] = useState<ExchangeRates>(initialRates);

  const numericAmount = parseFloat(amount) || 0;
  const conversions = convertAll(numericAmount, selectedCode, rates);

  return (
    <div className="flex flex-col gap-4">
      <CurrencyInput
        amount={amount}
        selectedCode={selectedCode}
        onAmountChange={setAmount}
        onCurrencyChange={setSelectedCode}
      />
      <ExchangeResults
        conversions={conversions}
        selectedCode={selectedCode}
        lastUpdated={rates.lastUpdated}
      />
      <Equivalencies rates={rates} />
    </div>
  );
}
