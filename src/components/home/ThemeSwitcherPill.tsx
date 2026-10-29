"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { PRESET_THEMES } from "@/lib/theme-manager";
import { Palette, Check, Sparkles, SlidersHorizontal } from "lucide-react";

export default function ThemeSwitcherPill() {
  const { themeKey, setThemeKey, customHex, setCustomHex, palette } =
    useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border border-[var(--color-primary-border)] bg-white/90 hover:bg-white shadow-sm transition-all duration-200 text-[var(--color-primary-deep)]"
        title="Alterar tema visual do evento"
        aria-label="Paleta de Cores do Evento"
      >
        <span
          className="w-3.5 h-3.5 rounded-full shadow-inner border border-black/10 transition-colors duration-300"
          style={{ backgroundColor: palette.primary }}
        />
        <span className="hidden sm:inline">Cor do Tema:</span>
        <span className="font-serif font-semibold">{palette.name}</span>
        <Palette className="w-3.5 h-3.5 text-[var(--color-accent-gold-dark)] ml-0.5 opacity-80" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-white/95 backdrop-blur-md border border-[var(--color-primary-border)] shadow-xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-stone-100">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-primary-deep)] font-serif">
              <Sparkles className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
              Cores Anuais do Chá
            </div>
            <span className="text-[11px] text-stone-600">
              Contraste Aprovado
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            {Object.values(PRESET_THEMES).map((theme) => {
              const isSelected = themeKey === theme.key;
              return (
                <button
                  key={theme.key}
                  onClick={() => {
                    setThemeKey(theme.key);
                  }}
                  className={`flex items-center gap-2.5 p-2 rounded-xl text-left text-xs transition-all border ${
                    isSelected
                      ? "border-[var(--color-primary)] bg-[var(--color-primary-light)] font-medium shadow-sm"
                      : "border-stone-100 hover:bg-stone-50 text-stone-700"
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full flex-shrink-0 shadow-sm border border-black/10 flex items-center justify-center text-white"
                    style={{ backgroundColor: theme.primary }}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </span>
                  <div className="min-w-0">
                    <div className="truncate font-serif text-[12px]">
                      {theme.name}
                    </div>
                    {theme.yearHint && (
                      <div className="text-[10px] text-stone-600 truncate">
                        {theme.yearHint}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Custom color input */}
          <div className="pt-2 border-t border-stone-100">
            <div className="flex items-center justify-between text-xs text-stone-600 mb-1.5">
              <span className="flex items-center gap-1">
                <SlidersHorizontal className="w-3 h-3 text-[var(--color-accent-gold)]" />
                Nova Cor para Próximo Ano:
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={customHex}
                onChange={(e) => setCustomHex(e.target.value)}
                className="w-8 h-8 rounded-lg border border-stone-200 cursor-pointer p-0.5 bg-white"
                title="Escolha qualquer cor personalizada"
              />
              <input
                type="text"
                value={customHex}
                onChange={(e) => setCustomHex(e.target.value)}
                placeholder="#1d5b96"
                className="flex-1 px-2 py-1 text-xs rounded-lg border border-stone-200 text-stone-700 font-mono focus:outline-none focus:border-[var(--color-primary)]"
              />
              <button
                onClick={() => setCustomHex(customHex)}
                className="px-2.5 py-1 text-xs rounded-lg font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-deep)] border border-[var(--color-primary-border)] hover:bg-[var(--color-primary-light)] transition-colors"
              >
                Aplicar
              </button>
            </div>
            <p className="text-[10px] text-stone-600 mt-1 italic">
              O sistema calcula automaticamente as cores de fundo e texto para
              manter leitura perfeita.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
