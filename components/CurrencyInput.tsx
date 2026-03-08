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
    <div className="bg-white dark:bg-[#161B22] rounded-2xl p-4 sm:p-5">
      <p className="text-[#57606A] dark:text-[#8B949E] text-[10px] sm:text-xs font-semibold tracking-widest mb-3">
        MONTO A CONVERTIR
      </p>
      <div className="flex gap-2 sm:gap-3">
        {/* Amount input */}
        <div className="flex-1 flex items-center bg-[#F0F2F5] dark:bg-[#0D1117] rounded-xl px-3 sm:px-4 gap-2 h-11 sm:h-12 min-w-0">
          <span className="text-[#57606A] dark:text-[#8B949E] text-sm sm:text-base flex-shrink-0">$</span>
          <input
            type="number"
            min="0"
            value={amount}
            onChange={(e) => { playKeySound(); onAmountChange(e.target.value); }}
            className="flex-1 bg-transparent text-[#1C2128] dark:text-white text-lg sm:text-xl font-bold outline-none min-w-0
                       [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none
                       [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="0.00"
          />
        </div>

        {/* Currency selector */}
        <div className="relative flex flex-col flex-shrink-0" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-1.5 sm:gap-2 bg-[#F0F2F5] dark:bg-[#0D1117] text-[#1C2128] dark:text-white font-semibold
                       rounded-xl px-3 sm:px-4 h-11 sm:h-12 min-w-[90px] sm:min-w-[120px] cursor-pointer"
          >
            <span className="text-base sm:text-lg">{selected.emoji}</span>
            <span className="text-sm sm:text-base">{selected.code}</span>
            <span className="text-[#57606A] dark:text-[#8B949E] ml-auto text-xs">▾</span>
          </button>

          {open && (
            <div className="absolute right-0 top-[calc(100%+6px)] z-50 bg-white dark:bg-[#161B22] border
                            border-[#D0D7DE] dark:border-[#30363D] rounded-xl overflow-hidden shadow-xl min-w-[160px] sm:min-w-[180px]
                            max-h-56 sm:max-h-72 overflow-y-auto">
              {ALL_CURRENCIES.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => { onCurrencyChange(c.code); setOpen(false); }}
                  className={`flex items-center gap-2 w-full px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium
                              hover:bg-[#F3F4F6] dark:hover:bg-[#21262D] transition-colors
                              ${c.code === selectedCode ? "text-blue-500 dark:text-blue-400" : "text-[#1C2128] dark:text-white"}`}
                >
                  <span className="flex-shrink-0">{c.emoji}</span>
                  <span className="flex-shrink-0 font-bold">{c.code}</span>
                  <span className="text-[#57606A] dark:text-[#8B949E] text-[10px] sm:text-xs ml-1 truncate">{c.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
