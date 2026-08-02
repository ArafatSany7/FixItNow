"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-16 h-8 rounded-full bg-secondary/10" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex items-center justify-between w-16 h-8 rounded-full bg-secondary/10 border border-secondary/20 p-1 cursor-pointer transition-colors"
      aria-label="Toggle theme"
    >
      <Sun className={`h-4 w-4 z-10 ml-0.5 transition-colors ${!isDark ? 'text-text' : 'text-text/40'}`} />
      <Moon className={`h-4 w-4 z-10 mr-0.5 transition-colors ${isDark ? 'text-primary' : 'text-text/40'}`} />
      
      <motion.div
        className="absolute top-1 left-1 bottom-1 w-6 bg-background rounded-full shadow-sm border border-secondary/20"
        animate={{
          x: isDark ? 32 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  );
}
