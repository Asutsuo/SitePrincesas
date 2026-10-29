"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import RoyalDivider from "@/components/common/RoyalDivider";
import { Heart, Quote, ZoomIn, MessageSquareQuote } from "lucide-react";

export default function TestimonialsSection() {
  const { siteData, activeEditionYear, setActiveEditionYear, openLightbox } =
    useTheme();

  // Find currently active edition
  const currentEdition =
    siteData?.editions?.find(
      (e) => Number(e.year) === Number(activeEditionYear),
    ) || siteData?.editions?.[0];

  const testimonials = currentEdition?.testimonials || [];
  const editions = siteData?.editions || [];

  return (
    <section
      id="testemunhos"
      className="py-20 sm:py-28 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[var(--color-primary-subtle)] text-[var(--color-primary-deep)] text-xs font-serif uppercase tracking-widest font-semibold mb-3 border border-[var(--color-primary-border)]">
            <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
            Depoimentos Reais
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--color-primary-deep)] tracking-tight text-balance">
            Relatos das Participantes{" "}
            <span className="inline-block whitespace-nowrap">
              ({currentEdition?.number || "Edição"} — {currentEdition?.year})
            </span>
          </h2>
          <p className="mt-3 text-stone-600 font-serif italic text-base sm:text-lg">
            {Number(currentEdition?.year) === 2026
              ? "Mensagens reais enviadas pelas participantes após o Chá das Princesas de 2026"
              : "Mensagens reais enviadas pelas participantes após o primeiro Chá das Princesas (2025)"}
          </p>
          <RoyalDivider variant="crown" className="my-6" />
        </div>

        {/* Edition Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
          {editions.map((ed) => {
            const isSelected = Number(ed.year) === Number(activeEditionYear);
            return (
              <button
                key={ed.id}
                onClick={() => setActiveEditionYear(ed.year)}
                className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-serif font-bold transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-white border-[var(--color-primary)] text-[var(--color-primary-deep)] shadow-md scale-105 ring-2 ring-[var(--color-primary)]/20"
                    : "bg-white/70 hover:bg-white border-stone-200 text-stone-600 hover:text-stone-900 shadow-xs"
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full border border-black/10"
                  style={{
                    backgroundColor:
                      ed.themePaletteKey === "blue"
                        ? "#1d5b96"
                        : ed.themePaletteKey === "lilac"
                          ? "#8a4b9c"
                          : "#c59b27",
                  }}
                />
                <span>
                  {ed.number} ({ed.year})
                </span>
                <span className="text-xs px-2 py-0.5 rounded-md font-sans font-medium text-stone-500 bg-stone-100">
                  {ed.testimonials?.length || 0} relatos
                </span>
              </button>
            );
          })}
        </div>

        {/* Testimonials Grid: Verbatim text and CENTERED WhatsApp screenshots */}
        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="bg-[#fcfaf7] rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Top: Name and Tag */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-200/60">
                    <div>
                      <h3 className="font-serif font-bold text-xl text-[var(--color-primary-deep)]">
                        {item.name}
                      </h3>
                      <p className="text-xs text-stone-500 font-sans">
                        {currentEdition?.number} — {currentEdition?.date}
                      </p>
                    </div>
                    {item.tag && (
                      <span className="text-[11px] font-serif uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary-deep)] border border-[var(--color-primary-border)]">
                        {item.tag}
                      </span>
                    )}
                  </div>

                  <Quote className="w-8 h-8 text-[var(--color-accent-gold)] opacity-40 mb-2" />

                  {/* Complete Verbatim Text */}
                  <blockquote className="font-serif text-stone-800 text-base sm:text-lg leading-relaxed mb-6 whitespace-pre-line">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                </div>

                {/* Card Bottom: CENTERED Clickable Original WhatsApp Screenshot */}
                {item.photoUrl && (
                  <div className="pt-5 border-t border-stone-200/70 flex flex-col items-center text-center">
                    <div className="text-xs text-stone-600 mb-2 flex items-center justify-center gap-1.5 font-sans">
                      <MessageSquareQuote className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
                      <span>
                        Print original da mensagem (clique para ampliar):
                      </span>
                    </div>

                    {/* Centered Box */}
                    <div
                      onClick={() =>
                        openLightbox(
                          item.photoUrl!,
                          `Print original da mensagem de ${item.name} (${currentEdition?.number} — ${currentEdition?.year})`,
                        )
                      }
                      className="group cursor-pointer relative w-full max-w-md mx-auto p-2.5 bg-stone-100/90 hover:bg-stone-200/90 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-center transition-all duration-300"
                      title="Clique para ver o print completo em tela cheia com zoom"
                    >
                      <div className="relative w-full h-44 sm:h-52 flex items-center justify-center overflow-hidden rounded-xl bg-[#0b141a]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.photoUrl}
                          alt={`Print da mensagem de ${item.name}`}
                          className="max-h-full max-w-full w-auto h-auto object-contain mx-auto block group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-serif italic gap-1.5">
                          <ZoomIn className="w-4 h-4 text-[var(--color-accent-gold-light)]" />
                          <span className="font-sans font-semibold">
                            Ampliar em Tela Cheia
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-stone-50 rounded-3xl border border-stone-200 max-w-xl mx-auto">
            <Heart className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <p className="font-serif text-lg text-stone-600">
              Nenhum relato cadastrado para esta edição ainda.
            </p>
          </div>
        )}

        {/* Edition Highlight Photo Banner */}
        {Number(currentEdition?.year) === 2026 ? (
          <div
            onClick={() =>
              openLightbox(
                "/assets/edicoes/2026/princesas-trajes-celestes.jpg",
                "As Princesas da 2ª Edição (2026) celebrando a comunhão e o amor de Deus",
              )
            }
            className="group cursor-pointer mt-14 rounded-3xl overflow-hidden shadow-xl border-4 border-white max-w-5xl mx-auto relative"
            title="Clique para ampliar a foto da 2ª Edição"
          >
            <div className="relative h-64 sm:h-80 w-full bg-stone-900 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/edicoes/2026/princesas-trajes-celestes.jpg"
                alt="Princesas da 2ª Edição do Chá das Princesas"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                <span className="text-xs font-serif uppercase tracking-widest text-[var(--color-accent-gold-light)] font-bold mb-1 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 fill-red-400 text-red-400" />{" "}
                  Registro da 2ª Edição (2026)
                </span>
                <p className="font-serif italic text-lg sm:text-2xl font-semibold max-w-2xl">
                  &ldquo;A cada edição, um novo mover de Deus: mulheres
                  restauradas, fortalecidas e acolhidas como verdadeiras filhas
                  do Rei!&rdquo;
                </p>
                <span className="text-xs text-stone-300 mt-2 flex items-center gap-1 font-sans">
                  <ZoomIn className="w-3.5 h-3.5" /> Clique para ampliar a foto
                  original em alta resolução
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div
            onClick={() =>
              openLightbox(
                "/assets/edicoes/2025/grupo-princesas-sorrindo.jpg",
                "O resultado emocionante da 1ª Edição: sorrisos restaurados de princesas que antes não sorriam!",
              )
            }
            className="group cursor-pointer mt-14 rounded-3xl overflow-hidden shadow-xl border-4 border-white max-w-5xl mx-auto relative"
            title="Clique para ampliar a foto do grupo da 1ª Edição"
          >
            <div className="relative h-64 sm:h-80 w-full bg-stone-900 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/edicoes/2025/grupo-princesas-sorrindo.jpg"
                alt="Princesas sorrindo no Chá das Princesas"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                <span className="text-xs font-serif uppercase tracking-widest text-[var(--color-accent-gold-light)] font-bold mb-1 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 fill-red-400 text-red-400" />{" "}
                  Registro da 1ª Edição (2025)
                </span>
                <p className="font-serif italic text-lg sm:text-2xl font-semibold max-w-2xl">
                  &ldquo;Observe nesse grupo e pode ter certeza: aí tem sorriso
                  de princesa que antes não sorria.&rdquo;
                </p>
                <span className="text-xs text-stone-300 mt-2 flex items-center gap-1 font-sans">
                  <ZoomIn className="w-3.5 h-3.5" /> Clique para ampliar a foto
                  original em alta resolução
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
