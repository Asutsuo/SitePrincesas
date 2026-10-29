"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import RoyalDivider from "@/components/common/RoyalDivider";
import {
  Sparkles,
  Calendar,
  MapPin,
  ZoomIn,
  Video,
  Play,
  CheckCircle2,
  Quote,
  Filter,
} from "lucide-react";

const CATEGORY_LABELS: Record<string, string> = {
  todas: "Todas as Fotos",
  ambiente: "Mesa Real & Ambiente",
  momentos: "Momentos & Comunhão",
  dinamica: "Dinâmica & Cura",
  convite: "Símbolo & Convite",
};

export default function EditionsShowcase() {
  const {
    siteData,
    activeEditionYear,
    setActiveEditionYear,
    palette,
    openLightbox,
  } = useTheme();

  const [selectedCategory, setSelectedCategory] = useState<string>("todas");

  const editions = siteData?.editions || [];
  const currentEdition =
    editions.find((e) => Number(e.year) === Number(activeEditionYear)) ||
    editions[0];

  // Reset category filter when changing active edition
  useEffect(() => {
    setSelectedCategory("todas");
  }, [activeEditionYear]);

  // Extract available categories for the current edition
  const availableCategories = React.useMemo(() => {
    if (!currentEdition?.photos) return ["todas"];
    const cats = new Set<string>();
    currentEdition.photos.forEach((p) => {
      if (p.category) cats.add(p.category);
    });
    return ["todas", ...Array.from(cats)];
  }, [currentEdition]);

  // Filter photos
  const filteredPhotos = React.useMemo(() => {
    if (!currentEdition?.photos) return [];
    if (selectedCategory === "todas") return currentEdition.photos;
    return currentEdition.photos.filter((p) => p.category === selectedCategory);
  }, [currentEdition, selectedCategory]);

  const featuredImage =
    currentEdition?.bannerImage ||
    currentEdition?.logoImage ||
    "/assets/logo-princesas-generico.png";

  const isLogo2026 = featuredImage.includes("logo-2026");
  const isBackpack = featuredImage.includes("convite-2025");
  const isGenericLogo = featuredImage.includes("logo-princesas-generico");

  return (
    <section
      id="edicoes"
      className="py-20 sm:py-28 bg-[#fcfaf7] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-[var(--color-primary-deep)] text-xs font-serif uppercase tracking-widest font-semibold mb-3 border border-[var(--color-primary-border)] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
            Edições do Chá
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--color-primary-deep)] tracking-tight text-balance">
            Edições do Chá das Princesas
          </h2>
          <p className="mt-3 text-stone-600 font-serif italic text-base sm:text-lg text-balance">
            Selecione a edição para ver a história, registros e fotos de cada encontro
          </p>
          <RoyalDivider variant="crown" className="my-6" />
        </div>

        {/* Scalable Edition Switcher Tabs */}
        <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1 mb-10 justify-start sm:justify-center">
          {editions.map((edition) => {
            const isSelected =
              Number(edition.year) === Number(activeEditionYear);
            return (
              <button
                key={edition.id}
                onClick={() => setActiveEditionYear(edition.year)}
                className={`flex items-center gap-2.5 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-2xl transition-all duration-300 border font-serif text-sm sm:text-base font-bold cursor-pointer whitespace-nowrap flex-shrink-0 ${
                  isSelected
                    ? "bg-white border-[var(--color-primary)] text-[var(--color-primary-deep)] shadow-md scale-102 ring-2 ring-[var(--color-primary)]/20"
                    : "bg-white/70 hover:bg-white border-stone-200 text-stone-600 hover:text-stone-900 shadow-xs"
                }`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/10 flex-shrink-0"
                  style={{
                    backgroundColor:
                      edition.themePaletteKey === "blue"
                        ? "#1d5b96"
                        : edition.themePaletteKey === "lilac"
                          ? "#8a4b9c"
                          : "#c59b27",
                  }}
                />
                <span>
                  {edition.number} ({edition.year})
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-md font-sans font-medium text-stone-600 bg-stone-100">
                  {edition.themeColor}
                </span>
                {edition.status === "current" && (
                  <span className="text-[10px] uppercase font-sans font-bold px-2 py-0.5 rounded-full bg-[var(--color-accent-gold-light)] text-[var(--color-accent-gold-dark)] border border-[var(--color-accent-gold)]/30">
                    Atual
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Edition Display Card */}
        {currentEdition && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[var(--color-primary-border)] shadow-xl transition-all duration-500 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Details */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-serif uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary-deep)]">
                    {currentEdition.number}
                  </span>
                  <span className="text-xs text-stone-600 flex items-center gap-1 font-sans">
                    <Calendar className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
                    {currentEdition.date}
                  </span>
                  <span className="text-xs text-stone-600 flex items-center gap-1 font-sans">
                    <MapPin className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
                    {currentEdition.location}
                  </span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--color-primary-deep)]">
                  Tema: {currentEdition.title}
                </h3>

                {currentEdition.subtitle && (
                  <p className="font-serif italic text-base text-[var(--color-accent-gold-dark)] font-medium">
                    {currentEdition.subtitle}
                  </p>
                )}

                <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-sans">
                  {currentEdition.description}
                </p>

                {/* Bible Verse Banner */}
                {currentEdition.bibleTheme && (
                  <div className="bg-[var(--color-primary-subtle)] p-5 rounded-2xl border-l-4 border-[var(--color-primary)]">
                    <p className="font-serif italic text-stone-800 text-sm leading-relaxed">
                      &ldquo;{currentEdition.bibleTheme.verse}&rdquo;
                    </p>
                    <p className="text-xs font-semibold text-[var(--color-primary-deep)] mt-2 font-serif">
                      — {currentEdition.bibleTheme.reference}
                    </p>
                  </div>
                )}
              </div>

              {/* Right Column: Featured Emblem or Symbol */}
              <div className="lg:col-span-5 flex justify-center">
                <div
                  onClick={() =>
                    openLightbox(
                      featuredImage,
                      `${currentEdition.number} — ${isLogo2026 ? "Logotipo Oficial" : currentEdition.title}`,
                    )
                  }
                  className={`group cursor-pointer relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden shadow-xl border-4 border-white flex items-center justify-center transition-all duration-300 hover:shadow-2xl ${
                    isLogo2026
                      ? "p-2 bg-white"
                      : isBackpack
                        ? "p-6"
                        : "p-6"
                  }`}
                  style={{
                    backgroundColor: isLogo2026
                      ? "#ffffff"
                      : isBackpack
                        ? palette.primaryLight
                        : palette.primary,
                  }}
                  title="Clique para ampliar o símbolo oficial"
                >
                  <Image
                    src={featuredImage}
                    alt={currentEdition.title}
                    width={400}
                    height={400}
                    priority
                    className={`w-full h-full group-hover:scale-105 transition-transform duration-500 ${
                      isLogo2026
                        ? "object-cover rounded-2xl shadow-inner"
                        : isGenericLogo
                          ? "object-contain brightness-0 invert p-2"
                          : isBackpack
                            ? "object-contain drop-shadow-lg"
                            : "object-contain rounded-2xl"
                    }`}
                  />
                  <div className="absolute bottom-3 right-3 bg-white/90 rounded-full px-2.5 py-1 text-[11px] font-sans font-medium text-stone-700 shadow-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-3 h-3" /> Ampliar
                  </div>
                </div>
              </div>
            </div>

            {/* VIDEO SPOTLIGHT CARD (If Edition has videoUrl) */}
            {currentEdition.videoUrl && (
              <div
                id="video-edicao"
                className="mt-12 pt-10 border-t border-stone-200 scroll-mt-24"
              >
                <div className="bg-gradient-to-br from-stone-50 via-white to-[var(--color-primary-subtle)] rounded-3xl p-6 sm:p-10 border border-[var(--color-primary-border)] shadow-lg relative overflow-hidden">
                  {/* Ambient accent background circle */}
                  <div
                    className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
                    style={{ backgroundColor: palette.primary }}
                  />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left: Video Player in Phone Frame */}
                    <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
                      <div className="relative w-full max-w-[300px] sm:max-w-[320px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-black ring-1 ring-black/10 aspect-[9/16]">
                        <video
                          src={currentEdition.videoUrl}
                          poster={currentEdition.videoPoster}
                          controls
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-cover rounded-2xl"
                        >
                          Seu navegador não suporta a reprodução deste vídeo.
                        </video>
                      </div>
                    </div>

                    {/* Right: Video Story & Details */}
                    <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-[var(--color-primary-deep)] text-xs font-serif uppercase tracking-widest font-bold border border-[var(--color-primary-border)] shadow-xs">
                        <Video className="w-4 h-4 text-[var(--color-accent-gold)]" />
                        Registro em Vídeo Exclusivo
                      </div>

                      <h4 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-primary-deep)]">
                        Tour pelos Detalhes da Mesa Real
                      </h4>

                      <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans">
                        {currentEdition.videoCaption ||
                          "Acompanhe o tour filmado momentos antes da chegada das princesas, revelando a dedicação e o amor em cada taça, flor e prato posto com excelência."}
                      </p>

                      {/* Quote Box */}
                      <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-[var(--color-primary-border)] shadow-xs relative">
                        <Quote className="w-8 h-8 text-[var(--color-accent-gold)]/30 absolute top-3 right-3" />
                        <p className="font-serif italic text-stone-700 text-sm sm:text-base leading-relaxed">
                          &ldquo;Cada detalhe importa! O Senhor me ensinou que
                          uma mesa ricamente preparada quebra cadeias de
                          rejeição antes mesmo de proferirmos a primeira
                          palavra.&rdquo;
                        </p>
                        <p className="text-xs font-semibold text-[var(--color-primary-deep)] mt-2 font-serif">
                          — Edinea Gomes Barbalho, Idealizadora
                        </p>
                      </div>

                      {/* Highlights */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[var(--color-accent-gold)] flex-shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-stone-700 font-sans">
                            Louças finas e taças em cristal azul celeste
                          </span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[var(--color-accent-gold)] flex-shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-stone-700 font-sans">
                            Lugares personalizados com versículos bíblicos
                          </span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[var(--color-accent-gold)] flex-shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-stone-700 font-sans">
                            Balões translúcidos e cortinas de voil brancas
                          </span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[var(--color-accent-gold)] flex-shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-stone-700 font-sans">
                            Colheres de coração e tiaras reais
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Photos Gallery for this Edition */}
            {currentEdition.photos && currentEdition.photos.length > 0 && (
              <div className="mt-12 pt-10 border-t border-stone-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h4 className="font-serif font-bold text-xl sm:text-2xl text-[var(--color-primary-deep)] flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[var(--color-accent-gold)]" />
                      Galeria Fotográfica da {currentEdition.number} (
                      {currentEdition.year})
                    </h4>
                    <p className="text-xs text-stone-500 font-sans mt-1">
                      {filteredPhotos.length} de {currentEdition.photos.length}{" "}
                      registros reais • Clique para ampliar em alta resolução
                    </p>
                  </div>

                  {/* Category Filter Pills */}
                  {availableCategories.length > 1 && (
                    <div className="flex flex-wrap items-center gap-2">
                      {availableCategories.map((cat) => {
                        const isCatSelected = selectedCategory === cat;
                        const label = CATEGORY_LABELS[cat] || cat;
                        return (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-1.5 rounded-full text-xs font-serif font-semibold transition-all cursor-pointer border ${
                              isCatSelected
                                ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-sm"
                                : "bg-white text-stone-600 hover:text-stone-900 border-stone-200 hover:border-stone-300"
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Photo Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredPhotos.map((photo, idx) => {
                    const isPhotoBackpack = photo.url.includes("convite-2025");
                    return (
                      <div
                        key={idx}
                        onClick={() => openLightbox(photo.url, photo.caption)}
                        className={`group cursor-pointer relative aspect-square rounded-2xl overflow-hidden shadow-sm border-2 border-white hover:shadow-xl transition-all duration-300 ${
                          isPhotoBackpack ? "bg-stone-50 p-4" : "bg-stone-100"
                        }`}
                        title={photo.caption}
                      >
                        <Image
                          src={photo.url}
                          alt={photo.caption}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className={`transition-transform duration-500 ${
                            isPhotoBackpack
                              ? "object-contain p-2 group-hover:scale-105"
                              : "object-cover group-hover:scale-110"
                          }`}
                        />

                        {/* Subtle Category Pill on Thumbnail */}
                        {photo.category && (
                          <div className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-[10px] font-serif font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-xs">
                              {CATEGORY_LABELS[photo.category] ||
                                photo.category}
                            </span>
                          </div>
                        )}

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center z-10">
                          <ZoomIn className="w-6 h-6 mb-1.5 text-[var(--color-accent-gold-light)]" />
                          <span className="text-white text-xs font-serif font-medium line-clamp-3 leading-snug">
                            {photo.caption}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
