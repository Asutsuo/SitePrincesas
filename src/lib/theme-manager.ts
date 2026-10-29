export interface ThemePalette {
  key: string;
  name: string;
  yearHint?: string;
  previewColor: string;
  primary: string;
  primaryHover: string;
  primaryDark: string;
  primaryDeep: string;
  primaryLight: string;
  primarySubtle: string;
  primaryBorder: string;
  accentGold: string;
  accentGoldLight: string;
  accentGoldDark: string;
  badgeBg: string;
  badgeText: string;
  heroGradient: string;
}

export const PRESET_THEMES: Record<string, ThemePalette> = {
  blue: {
    key: "blue",
    name: "Azul Celestial",
    yearHint: "2ª Edição (2026)",
    previewColor: "#1d5b96",
    primary: "#1d5b96",
    primaryHover: "#174878",
    primaryDark: "#123960",
    primaryDeep: "#0c243d",
    primaryLight: "#e0effe",
    primarySubtle: "#f2f8fd",
    primaryBorder: "#bae0fd",
    accentGold: "#c59b27",
    accentGoldLight: "#fef7dc",
    accentGoldDark: "#87670f",
    badgeBg: "#e0effe",
    badgeText: "#123960",
    heroGradient:
      "linear-gradient(135deg, rgba(29, 91, 150, 0.08) 0%, rgba(242, 248, 253, 0.9) 100%)",
  },
  lilac: {
    key: "lilac",
    name: "Lilás Imperial",
    yearHint: "1ª Edição (2025)",
    previewColor: "#8a4b9c",
    primary: "#8a4b9c",
    primaryHover: "#733c84",
    primaryDark: "#5c2c6b",
    primaryDeep: "#3e174b",
    primaryLight: "#f6eafa",
    primarySubtle: "#faf4fc",
    primaryBorder: "#e8c9f2",
    accentGold: "#c59b27",
    accentGoldLight: "#fef7dc",
    accentGoldDark: "#87670f",
    badgeBg: "#f6eafa",
    badgeText: "#5c2c6b",
    heroGradient:
      "linear-gradient(135deg, rgba(138, 75, 156, 0.08) 0%, rgba(250, 244, 252, 0.9) 100%)",
  },
  rose: {
    key: "rose",
    name: "Rosa Chá Princesa",
    yearHint: "Edição Especial",
    previewColor: "#b93e68",
    primary: "#b93e68",
    primaryHover: "#9c2f53",
    primaryDark: "#7f1f3f",
    primaryDeep: "#530d24",
    primaryLight: "#fde8ef",
    primarySubtle: "#fdf3f6",
    primaryBorder: "#f8c2d3",
    accentGold: "#c59b27",
    accentGoldLight: "#fef7dc",
    accentGoldDark: "#87670f",
    badgeBg: "#fde8ef",
    badgeText: "#7f1f3f",
    heroGradient:
      "linear-gradient(135deg, rgba(185, 62, 104, 0.08) 0%, rgba(253, 243, 246, 0.9) 100%)",
  },
  gold: {
    key: "gold",
    name: "Dourado & Pérola",
    yearHint: "Edição Nobre",
    previewColor: "#a67715",
    primary: "#a67715",
    primaryHover: "#8b620e",
    primaryDark: "#6f4c07",
    primaryDeep: "#493002",
    primaryLight: "#fdf5e2",
    primarySubtle: "#fdfaf2",
    primaryBorder: "#f5deb0",
    accentGold: "#a67715",
    accentGoldLight: "#fdf5e2",
    accentGoldDark: "#6f4c07",
    badgeBg: "#fdf5e2",
    badgeText: "#6f4c07",
    heroGradient:
      "linear-gradient(135deg, rgba(166, 119, 21, 0.08) 0%, rgba(253, 250, 242, 0.9) 100%)",
  },
  sage: {
    key: "sage",
    name: "Verde Sálvia & Paz",
    yearHint: "Edição Esperança",
    previewColor: "#3d6d53",
    primary: "#3d6d53",
    primaryHover: "#305842",
    primaryDark: "#234431",
    primaryDeep: "#13281d",
    primaryLight: "#e7f3ec",
    primarySubtle: "#f2f8f5",
    primaryBorder: "#c4e2d2",
    accentGold: "#c59b27",
    accentGoldLight: "#fef7dc",
    accentGoldDark: "#87670f",
    badgeBg: "#e7f3ec",
    badgeText: "#234431",
    heroGradient:
      "linear-gradient(135deg, rgba(61, 109, 83, 0.08) 0%, rgba(242, 248, 245, 0.9) 100%)",
  },
  burgundy: {
    key: "burgundy",
    name: "Borgonha Majestoso",
    yearHint: "Edição Real",
    previewColor: "#801f35",
    primary: "#801f35",
    primaryHover: "#6a1629",
    primaryDark: "#540e1e",
    primaryDeep: "#390612",
    primaryLight: "#fae8ec",
    primarySubtle: "#fcf3f5",
    primaryBorder: "#f2c1cb",
    accentGold: "#c59b27",
    accentGoldLight: "#fef7dc",
    accentGoldDark: "#87670f",
    badgeBg: "#fae8ec",
    badgeText: "#540e1e",
    heroGradient:
      "linear-gradient(135deg, rgba(128, 31, 53, 0.08) 0%, rgba(252, 243, 245, 0.9) 100%)",
  },
};

// Utilities to parse hex and generate harmonious, accessible shades
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let clean = hex.replace("#", "");
  if (clean.length === 3) {
    clean = clean
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const num = parseInt(clean, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (val: number) => Math.min(255, Math.max(0, Math.round(val)));
  return (
    "#" +
    [clamp(r), clamp(g), clamp(b)]
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("")
  );
}

export function adjustBrightness(hex: string, percent: number): string {
  const { r, g, b } = hexToRgb(hex);
  const factor = percent / 100;
  if (factor > 0) {
    return rgbToHex(
      r + (255 - r) * factor,
      g + (255 - g) * factor,
      b + (255 - b) * factor,
    );
  } else {
    return rgbToHex(r * (1 + factor), g * (1 + factor), b * (1 + factor));
  }
}

export function generateCustomPalette(
  customHex: string,
  name = "Cor Personalizada",
): ThemePalette {
  const cleanHex = customHex.startsWith("#") ? customHex : `#${customHex}`;

  return {
    key: "custom",
    name,
    yearHint: "Personalizado",
    previewColor: cleanHex,
    primary: cleanHex,
    primaryHover: adjustBrightness(cleanHex, -15),
    primaryDark: adjustBrightness(cleanHex, -35),
    primaryDeep: adjustBrightness(cleanHex, -55),
    primaryLight: adjustBrightness(cleanHex, 85),
    primarySubtle: adjustBrightness(cleanHex, 94),
    primaryBorder: adjustBrightness(cleanHex, 65),
    accentGold: "#c59b27",
    accentGoldLight: "#fef7dc",
    accentGoldDark: "#87670f",
    badgeBg: adjustBrightness(cleanHex, 85),
    badgeText: adjustBrightness(cleanHex, -40),
    heroGradient: `linear-gradient(135deg, ${cleanHex}14 0%, #faf8f5 100%)`,
  };
}

export function getActiveThemePalette(
  themeKey: string,
  customHex?: string,
): ThemePalette {
  if (themeKey === "custom" && customHex) {
    return generateCustomPalette(customHex);
  }
  return PRESET_THEMES[themeKey] || PRESET_THEMES.blue;
}

export function applyThemeToCssVariables(
  palette: ThemePalette,
): Record<string, string> {
  return {
    "--color-primary": palette.primary,
    "--color-primary-hover": palette.primaryHover,
    "--color-primary-dark": palette.primaryDark,
    "--color-primary-deep": palette.primaryDeep,
    "--color-primary-light": palette.primaryLight,
    "--color-primary-subtle": palette.primarySubtle,
    "--color-primary-border": palette.primaryBorder,
    "--color-accent-gold": palette.accentGold,
    "--color-accent-gold-light": palette.accentGoldLight,
    "--color-accent-gold-dark": palette.accentGoldDark,
    "--color-badge-bg": palette.badgeBg,
    "--color-badge-text": palette.badgeText,
  };
}
