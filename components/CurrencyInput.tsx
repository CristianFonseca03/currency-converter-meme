"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ALL_CURRENCIES } from "@/lib/currencies";

interface CurrencyInputProps {
  amount: string;
  selectedCode: string;
  onAmountChange: (value: string) => void;
  onCurrencyChange: (code: string) => void;
}

export default function CurrencyInput({
  amount,
  selectedCode,
  onAmountChange,
  onCurrencyChange,
}: CurrencyInputProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const selected = ALL_CURRENCIES.find((c) => c.code === selectedCode)!;

  useEffect(() => {
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;
    fetch("/sounds/multhit1.mp3")
      .then((r) => r.arrayBuffer())
      .then((buf) => ctx.decodeAudioData(buf))
      .then((decoded) => { audioBufferRef.current = decoded; })
      .catch(() => {});
    return () => { ctx.close(); };
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const playKeySound = useCallback(() => {
    const ctx = audioCtxRef.current;
    const buffer = audioBufferRef.current;
    if (!ctx || !buffer) return;
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start(0);
  }, []);

  return (
    <div className="bg-[#161B22] rounded-2xl p-4 sm:p-5">
      <p className="text-[#8B949E] text-xs font-semibold tracking-widest mb-3">
        MONTO A CONVERTIR
      </p>
      <div className="flex gap-2 sm:gap-3">
        {/* Amount input */}
        <div className="flex-1 flex items-center bg-[#0D1117] rounded-xl px-4 gap-2 h-12">
          <span className="text-[#8B949E] text-base">$</span>
          <input
            type="number"
            min="0"
            value={amount}
            onChange={(e) => { playKeySound(); onAmountChange(e.target.value); }}
            className="flex-1 bg-transparent text-white text-xl font-bold outline-none
                       [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none
                       [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="0.00"
          />
        </div>

        {/* Currency selector */}
        <div className="relative flex flex-col" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-2 bg-[#0D1117] text-white font-semibold
                       rounded-xl px-3 sm:px-4 h-12 min-w-[80px] sm:min-w-[120px] cursor-pointer"
          >
            <span>{selected.emoji}</span>
            <span>{selected.code}</span>
            <span className="text-[#8B949E] ml-1">⌄</span>
          </button>

          {open && (
            <div className="absolute right-0 top-[calc(100%+6px)] z-50 bg-[#161B22] border
                            border-[#30363D] rounded-xl overflow-hidden shadow-xl min-w-[150px]">
              {ALL_CURRENCIES.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => { onCurrencyChange(c.code); setOpen(false); }}
                  className={`flex items-center gap-2 w-full px-4 py-2.5 text-sm font-medium
                              hover:bg-[#21262D] transition-colors
                              ${c.code === selectedCode ? "text-blue-400" : "text-white"}`}
                >
                  <span>{c.emoji}</span>
                  <span>{c.code}</span>
                  <span className="text-[#8B949E] text-xs ml-1">{c.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
