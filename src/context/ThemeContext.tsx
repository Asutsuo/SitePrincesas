"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  ThemePalette,
  PRESET_THEMES,
  getActiveThemePalette,
} from "@/lib/theme-manager";
import { SiteData, Edition } from "@/lib/types";
import PhotoLightboxModal from "@/components/common/PhotoLightboxModal";

interface ThemeContextType {
  palette: ThemePalette;
  themeKey: string;
  customHex: string;
  activeEditionYear: number;
  activeEdition: Edition | undefined;
  siteData: SiteData | null;
  isLoading: boolean;
  setThemeKey: (key: string) => void;
  setCustomHex: (hex: string) => void;
  setActiveEditionYear: (year: number) => void;
  refreshData: () => Promise<void>;
  openLightbox: (src: string, caption?: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData: SiteData;
}) {
  const [siteData, setSiteData] = useState<SiteData>(initialData);
  const [activeEditionYear, setActiveEditionYearState] = useState<number>(
    initialData?.settings?.activeEditionYear || 2026,
  );
  const [themeKey, setThemeKeyState] = useState<string>(
    initialData?.settings?.currentThemeKey || "blue",
  );
  const [customHex, setCustomHexState] = useState<string>(
    initialData?.settings?.customColorHex || "#1d5b96",
  );
  const [isLoading, setIsLoading] = useState(false);

  // Lightbox global state
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    src: string;
    caption?: string;
  }>({
    isOpen: false,
    src: "",
    caption: "",
  });

  const openLightbox = (src: string, caption?: string) => {
    setLightbox({ isOpen: true, src, caption });
  };

  const closeLightbox = () => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
  };

  // Keep state in sync with official server settings on mount, or check local preview
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("princesas_theme_key");
      const savedCustom = localStorage.getItem("princesas_custom_hex");
      const savedYear = localStorage.getItem("princesas_active_year");
      if (savedTheme) setThemeKeyState(savedTheme);
      if (savedCustom) setCustomHexState(savedCustom);
      if (savedYear) setActiveEditionYearState(parseInt(savedYear, 10));
    } catch {}
  }, []);

  const activeEdition =
    siteData?.editions?.find(
      (e) => Number(e.year) === Number(activeEditionYear),
    ) || siteData?.editions?.[0];

  const palette = getActiveThemePalette(themeKey, customHex);

  // Apply CSS variables on DOM
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--color-primary", palette.primary);
    root.style.setProperty("--color-primary-hover", palette.primaryHover);
    root.style.setProperty("--color-primary-dark", palette.primaryDark);
    root.style.setProperty("--color-primary-deep", palette.primaryDeep);
    root.style.setProperty("--color-primary-light", palette.primaryLight);
    root.style.setProperty("--color-primary-subtle", palette.primarySubtle);
    root.style.setProperty("--color-primary-border", palette.primaryBorder);
    root.style.setProperty("--color-accent-gold", palette.accentGold);
    root.style.setProperty(
      "--color-accent-gold-light",
      palette.accentGoldLight,
    );
    root.style.setProperty("--color-accent-gold-dark", palette.accentGoldDark);
    root.style.setProperty("--color-badge-bg", palette.badgeBg);
    root.style.setProperty("--color-badge-text", palette.badgeText);
  }, [palette]);

  const setThemeKey = (key: string) => {
    setThemeKeyState(key);
    try {
      localStorage.setItem("princesas_theme_key", key);
    } catch {}
  };

  const setCustomHex = (hex: string) => {
    setCustomHexState(hex);
    setThemeKeyState("custom");
    try {
      localStorage.setItem("princesas_theme_key", "custom");
      localStorage.setItem("princesas_custom_hex", hex);
    } catch {}
  };

  const setActiveEditionYear = (year: number) => {
    setActiveEditionYearState(year);
    try {
      localStorage.setItem("princesas_active_year", year.toString());
    } catch {}

    const targetEdition = siteData?.editions?.find(
      (e) => Number(e.year) === Number(year),
    );
    if (targetEdition?.themePaletteKey) {
      setThemeKey(targetEdition.themePaletteKey);
    }
  };

  const refreshData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/data", { cache: "no-store" });
      const json = await res.json();
      if (json.success && json.data) {
        setSiteData(json.data);
        if (json.data.settings?.currentThemeKey) {
          setThemeKeyState(json.data.settings.currentThemeKey);
          localStorage.setItem(
            "princesas_theme_key",
            json.data.settings.currentThemeKey,
          );
        }
        if (json.data.settings?.customColorHex) {
          setCustomHexState(json.data.settings.customColorHex);
          localStorage.setItem(
            "princesas_custom_hex",
            json.data.settings.customColorHex,
          );
        }
        if (json.data.settings?.activeEditionYear) {
          setActiveEditionYearState(json.data.settings.activeEditionYear);
          localStorage.setItem(
            "princesas_active_year",
            String(json.data.settings.activeEditionYear),
          );
        }
      }
    } catch (e) {
      console.error("Failed to refresh site data:", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        palette,
        themeKey,
        customHex,
        activeEditionYear,
        activeEdition,
        siteData,
        isLoading,
        setThemeKey,
        setCustomHex,
        setActiveEditionYear,
        refreshData,
        openLightbox,
      }}
    >
      {children}
      <PhotoLightboxModal
        isOpen={lightbox.isOpen}
        src={lightbox.src}
        caption={lightbox.caption}
        onClose={closeLightbox}
      />
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
