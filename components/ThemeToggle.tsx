"use client";

import { useEffect, useState } from "react";
import TwemojiIcon from "@/components/TwemojiIcon";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem("theme") !== "light";
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggle = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return next;
    });
  };

  return (
    <button
      onClick={toggle}
      title={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className="w-9 h-9 rounded-xl bg-[#161B22] dark:bg-[#161B22] border border-[#D0D7DE] dark:border-[#30363D]
                 flex items-center justify-center text-base transition-colors
                 hover:bg-[#F3F4F6] dark:hover:bg-[#21262D] cursor-pointer"
    >
      <TwemojiIcon emoji={isDark ? "☀️" : "🌙"} size={18} />
    </button>
  );
}
