export interface BibleTheme {
  verse: string;
  reference: string;
}

export interface ItineraryItem {
  step: number;
  title: string;
  subtitle?: string;
  description: string;
  song?: string;
  icon?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  photoUrl?: string;
  editionYear: number;
  tag?: string;
}

export interface EditionPhoto {
  url: string;
  caption: string;
  category?: "ambiente" | "dinamica" | "momentos" | "convite";
}

export interface Edition {
  id: string;
  year: number;
  number: string;
  title: string;
  subtitle: string;
  bibleTheme: BibleTheme;
  themeColor: string; // color name or hex
  themePaletteKey:
    | "blue"
    | "lilac"
    | "rose"
    | "gold"
    | "sage"
    | "burgundy"
    | "custom";
  customHex?: string;
  date: string;
  location: string;
  status: "past" | "current" | "upcoming";
  description: string;
  bannerImage?: string;
  logoImage?: string;
  videoUrl?: string;
  videoPoster?: string;
  videoCaption?: string;
  itinerary: ItineraryItem[];
  rules: string[];
  photos: EditionPhoto[];
  testimonials: Testimonial[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  readTime: string;
  coverImage?: string;
  category: "Historia" | "Reflexao" | "Bastidores" | "Avisos";
  tags: string[];
}

export interface SiteSettings {
  activeEditionYear: number;
  currentThemeKey:
    | "blue"
    | "lilac"
    | "rose"
    | "gold"
    | "sage"
    | "burgundy"
    | "custom";
  customColorHex: string;
  siteName: string;
  tagline: string;
  motto: string;
  contactWhatsapp: string;
  instagramUrl: string;
  churchName: string;
  churchAddress: string;
  adminPin: string;
}

export interface SiteData {
  settings: SiteSettings;
  editions: Edition[];
  posts: BlogPost[];
  story: {
    founder: string;
    partner: string;
    genesis: string;
    revelation: string;
    motto: string;
    faithPrinciple: string;
    dreamDescription: string;
    helpersDescription: string;
  };
}
