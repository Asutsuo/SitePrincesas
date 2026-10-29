"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import ThemeSwitcherPill from "@/components/home/ThemeSwitcherPill";
import { Crown, MessageCircle, ShieldCheck } from "lucide-react";

export default function Navbar() {
  const { siteData, activeEditionYear, setActiveEditionYear, palette } =
    useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappNumber = siteData?.settings?.contactWhatsapp || "5511999999999";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Olá! Gostaria de receber informações sobre o Chá das Princesas (${activeEditionYear}).`,
  )}`;

  const editions = siteData?.editions || [];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#fffefb]/95 backdrop-blur-md shadow-sm border-b border-[var(--color-primary-border)]/50 py-2.5"
          : "bg-[#faf8f5]/90 backdrop-blur-sm py-3.5 border-b border-stone-200/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo & Name */}
          <Link
            href="/"
            className="flex items-center gap-3 group flex-shrink-0"
          >
            {/* Logo container with dynamic theme background */}
            <div
              className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-[var(--color-accent-gold)] shadow-sm flex items-center justify-center p-1.5 transition-colors duration-500"
              style={{ backgroundColor: palette.primary }}
            >
              <Image
                src="/assets/logo-princesas-generico.png"
                alt="Chá das Princesas Logo"
                width={40}
                height={40}
                className="object-contain brightness-0 invert group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-lg sm:text-xl tracking-tight text-[var(--color-primary-deep)] leading-tight">
                  Chá das Princesas
                </span>
                <Crown className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
              </div>
              <p className="text-[11px] text-stone-500 font-sans tracking-wide">
                Encontro Real de Mulheres
              </p>
            </div>
          </Link>

          {/* Center: Functional Edition Selector Tabs (Clean & Direct) */}
          <div className="flex items-center p-1 rounded-full bg-stone-200/60 border border-stone-300/50 shadow-inner">
            {editions.map((ed) => {
              const isSelected = Number(ed.year) === Number(activeEditionYear);
              return (
                <button
                  key={ed.id}
                  onClick={() => setActiveEditionYear(ed.year)}
                  className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-serif font-bold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-white text-[var(--color-primary-deep)] shadow-sm"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  <span>{ed.number}</span>
                  <span className="hidden sm:inline font-sans text-xs ml-1 opacity-75">
                    ({ed.year})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Action Items: Theme Picker + WhatsApp + Admin */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeSwitcherPill />

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-white shadow-sm transition-all duration-200"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Participar</span>
            </a>

            <Link
              href="/admin"
              className="p-2 rounded-full text-stone-400 hover:text-[var(--color-primary-deep)] hover:bg-stone-100 transition-colors"
              title="Área da Coordenação"
            >
              <ShieldCheck className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
