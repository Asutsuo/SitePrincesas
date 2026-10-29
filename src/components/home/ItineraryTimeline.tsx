"use client";

import React from "react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import RoyalDivider from "@/components/common/RoyalDivider";
import {
  Crown,
  Sparkles,
  Music,
  Volume2,
  Shield,
  HeartHandshake,
} from "lucide-react";

export default function ItineraryTimeline() {
  const { activeEdition, activeEditionYear } = useTheme();

  // Os Seis Momentos Sagrados e as Dinâmicas Centrais pertencem estritamente à 1ª Edição (2025)
  if (Number(activeEditionYear) !== 2025) {
    return null;
  }

  const itinerary = activeEdition?.itinerary || [];

  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[var(--color-primary-subtle)] text-[var(--color-primary-deep)] text-xs font-serif uppercase tracking-widest font-semibold mb-3 border border-[var(--color-primary-border)]">
            <Crown className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
            Roteiro Real do Evento
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--color-primary-deep)] tracking-tight">
            Os Seis Momentos Sagrados
          </h2>
          <p className="mt-3 text-stone-600 font-serif italic text-lg">
            Um percurso guiado pelo Espírito Santo para desatar nós e restaurar
            a identidade
          </p>
          <RoyalDivider variant="crown" className="my-6" />
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {itinerary.map((item) => (
            <div
              key={item.step}
              className="group relative bg-[#fcfaf7] hover:bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 hover:border-[var(--color-primary-border)] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Step badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-2xl bg-[var(--color-primary-light)] text-[var(--color-primary-deep)] font-serif font-bold text-lg flex items-center justify-center border border-[var(--color-primary-border)] group-hover:scale-110 transition-transform">
                    {item.step}º
                  </span>
                  {item.song && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[var(--color-accent-gold-light)] text-[var(--color-accent-gold-dark)] text-[11px] font-medium border border-[var(--color-accent-gold)]/30">
                      <Music className="w-3 h-3" />
                      Louvor
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-xl font-bold text-[var(--color-primary-deep)] mb-1">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="font-serif italic text-xs text-[var(--color-accent-gold-dark)] font-medium mb-3">
                    {item.subtitle}
                  </p>
                )}

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {item.song && (
                <div className="mt-5 pt-3 border-t border-stone-200/60 flex items-center gap-2 text-xs text-stone-500 font-sans">
                  <Volume2 className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
                  <span className="italic">Canção de Fundo:</span>
                  <span className="font-medium text-stone-700">
                    {item.song}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Dynamic Highlight Card (Espelho & Mochila) */}
        <div className="mt-12 bg-gradient-to-r from-[var(--color-primary-subtle)] via-white to-[var(--color-primary-subtle)] p-6 sm:p-8 rounded-3xl border border-[var(--color-primary-border)] shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-3">
              <span className="text-xs font-serif uppercase tracking-widest font-bold text-[var(--color-primary-deep)] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[var(--color-accent-gold)]" />
                As Dinâmicas Centrais
              </span>
              <h3 className="font-serif text-2xl font-bold text-[var(--color-primary-deep)]">
                A Mochila das Pedras & O Espelho da Verdade
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Durante a ministração, as participantes escrevem em pedras reais
                tudo aquilo que as oprime — ansiedade, julgamento, sensação de
                rejeição. Colocadas em uma mochila pesada nos ombros, sentem a
                dor do fardo, para então experimentarem o alívio de jogar as
                pedras fora diante da cruz de Cristo.
              </p>
              <p className="text-sm text-stone-600 leading-relaxed">
                Em seguida, com o espelho nas mãos, declaram que não aceitam
                mais palavras de humilhação:
                <strong className="text-[var(--color-primary-dark)]">
                  {" "}
                  &ldquo;Eu sou livre, eu sou amada, sou filha do Rei!&rdquo;
                </strong>
              </p>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-white">
              <Image
                src="/assets/photos/dinamica-espelho.jpg"
                alt="Dinâmica do espelho no Chá das Princesas"
                width={600}
                height={400}
                className="w-full h-64 sm:h-72 object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                <p className="text-white text-xs font-serif italic">
                  Momento emocionante: quebrando as correntes da rejeição com a
                  luz da Palavra.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
