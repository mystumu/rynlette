
import { useCallback, useEffect, useState } from "react";

// Enhanced dark mode hook to *always* respect user choice in localStorage.
export function useDarkMode() {
  // Only default to OS preference if there is NO theme in localStorage
  const getInitialTheme = () => {
    if (typeof window === "undefined") return false;
    const stored = window.localStorage.getItem("theme");
    if (stored === "dark") return true;
    if (stored === "light") return false;
    // If nothing saved, follow OS preference just once
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  const [isDark, setIsDark] = useState(getInitialTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      window.localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      window.localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  // Listen for system changes ONLY if user never made a choice
  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    if (stored) return; // User made a choice

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
    };

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  const toggleDark = useCallback(() => {
    setIsDark((prev) => {
      // Always store user intent immediately
      window.localStorage.setItem("theme", !prev ? "dark" : "light");
      return !prev;
    });
  }, []);

  return { isDark, toggleDark };
}

