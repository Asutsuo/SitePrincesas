"use client";

import React from "react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import TeaSteamIcon from "@/components/common/TeaSteamIcon";
import RoyalDivider from "@/components/common/RoyalDivider";
import { Crown, Sparkles, BookOpen, MessageCircle, Play } from "lucide-react";

export default function HeroSection() {
  const { activeEdition, activeEditionYear, siteData, palette, openLightbox } =
    useTheme();

  const whatsappNumber = siteData?.settings?.contactWhatsapp || "5511999999999";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Olá! Gostaria de informações sobre o Chá das Princesas (${activeEditionYear}).`,
  )}`;

  const logoSrc = "/assets/logo-princesas-generico.png";

  return (
    <section
      id="inicio"
      className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden bg-parchment transition-colors duration-500"
    >
      {/* Ambient background glows */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[500px] rounded-full blur-3xl pointer-events-none opacity-30 transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${palette.primaryLight} 0%, transparent 70%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Top Royal Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[var(--color-primary-border)] shadow-xs mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
            <span className="font-serif text-xs sm:text-sm font-semibold uppercase tracking-wider text-[var(--color-primary-deep)]">
              {activeEdition?.number || "2ª Edição"} • Ano {activeEditionYear}
            </span>
            <span className="text-stone-300">•</span>
            <span
              className="text-xs sm:text-sm font-medium px-2 py-0.5 rounded-md"
              style={{
                backgroundColor: "var(--color-badge-bg)",
                color: "var(--color-badge-text)",
              }}
            >
              Cor do Tema: {activeEdition?.themeColor || "Azul Celestial"}
            </span>
          </div>

          {/* Delicate Script Subtitle */}
          <p className="font-script text-2xl sm:text-3xl lg:text-4xl text-[var(--color-accent-gold-dark)] mb-2 font-normal">
            Encontro Real de Mulheres
          </p>

          {/* Main Title */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--color-primary-deep)] leading-[1.1] mb-6 text-balance">
            Chá das Princesas
          </h1>

          {/* Official Logo with DYNAMIC THEME BACKGROUND */}
          <div
            className="relative my-4 group cursor-pointer"
            onClick={() =>
              openLightbox(
                logoSrc,
                `Emblema Oficial — Chá das Princesas`,
              )
            }
          >
            {/* Ambient gold glow */}
            <div className="absolute -inset-2 rounded-full blur-xl bg-[var(--color-accent-gold)]/20 group-hover:bg-[var(--color-accent-gold)]/35 transition-all duration-500" />

            {/* Container with dynamic theme background */}
            <div
              className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full p-4 sm:p-5 shadow-xl border-4 border-white overflow-hidden flex items-center justify-center animate-float-soft transition-colors duration-500"
              style={{ backgroundColor: palette.primary }}
              title="Clique para ampliar o emblema"
            >
              <Image
                src={logoSrc}
                alt="Logo Oficial Chá das Princesas"
                width={224}
                height={224}
                priority
                className="w-full h-full object-contain brightness-0 invert p-1 transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Teacup steam icon overlay */}
            <div className="absolute -top-4 -right-2 bg-white/95 rounded-full p-2.5 shadow-lg border border-[var(--color-accent-gold)]/40 hidden sm:flex items-center justify-center">
              <TeaSteamIcon size={32} />
            </div>
          </div>

          <RoyalDivider variant="crown" className="my-6" />

          {/* Biblical Foundation & Purpose */}
          <p className="font-serif text-lg sm:text-2xl text-stone-700 italic font-medium max-w-2xl leading-relaxed mb-4 text-balance">
            &ldquo;Existem feridas que parecem espirituais, mas são pancadas
            emocionais silenciosas. O projeto do Rei é acolher, curar e
            restituir o seu sorriso.&rdquo;
          </p>
          <p className="text-sm sm:text-base text-stone-600 max-w-xl leading-relaxed mb-8 text-balance">
            Um ambiente preparado nos mínimos detalhes por{" "}
            <strong className="whitespace-nowrap">Edinea Gomes Barbalho</strong>, onde cada mulher descobre
            que é amada, preciosa e <strong className="whitespace-nowrap">filha do Rei Jesus</strong>.
          </p>

          {/* Bible Scripture Card */}
          <div className="w-full max-w-2xl bg-white/95 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-[var(--color-primary-border)] shadow-md mb-8 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[var(--color-accent-gold-light)] border border-[var(--color-accent-gold)]/50 text-[11px] font-serif font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)] flex items-center gap-1">
              <Crown className="w-3 h-3" />
              Tema Bíblico da Edição
            </div>

            <p className="font-serif italic text-stone-800 text-sm sm:text-base leading-relaxed text-center mt-1">
              &ldquo;{activeEdition?.bibleTheme?.verse}&rdquo;
            </p>
            <p className="text-xs font-semibold text-[var(--color-primary-deep)] text-center mt-2 font-serif">
              — {activeEdition?.bibleTheme?.reference}
            </p>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              <MessageCircle className="w-4 h-4" />
              <span>Quero Participar / Falar no WhatsApp</span>
            </a>

            <a
              href="#edicoes"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-[var(--color-primary-deep)] bg-white border border-[var(--color-primary-border)] shadow-sm hover:bg-stone-50 transition-all duration-300 hover:-translate-y-0.5"
            >
              <BookOpen className="w-4 h-4 text-[var(--color-accent-gold)]" />
              <span>Ver Detalhes da Edição</span>
            </a>

            {activeEdition?.videoUrl && (
              <a
                href="#video-edicao"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-[var(--color-primary-deep)] bg-white/95 border border-[var(--color-accent-gold)] shadow-sm hover:bg-white transition-all duration-300 hover:-translate-y-0.5"
              >
                <Play className="w-4 h-4 text-[var(--color-accent-gold)] fill-[var(--color-accent-gold)]" />
                <span>Vídeo da Mesa Real</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
