
import React from "react";
import { Sun, Moon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useDarkMode } from "@/hooks/useDarkMode";

const ThemeToggle: React.FC = () => {
  const { isDark, toggleDark } = useDarkMode();

  return (
    <button
      aria-label={isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      onClick={toggleDark}
      className="flex items-center gap-2 px-2 py-2 rounded-full transition-colors hover:bg-muted"
      type="button"
      title={isDark ? "Tema oscuro activado" : "Tema claro activado"}
    >
      {isDark ? (
        <Moon size={20} className="text-rynlette-purple" />
      ) : (
        <Sun size={20} className="text-yellow-500" />
      )}
      <span className="sr-only">Cambiar tema</span>
    </button>
  );
};

export default ThemeToggle;
