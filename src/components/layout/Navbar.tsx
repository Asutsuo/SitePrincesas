"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import ThemeSwitcherPill from "@/components/home/ThemeSwitcherPill";
import { Crown, MessageCircle, ShieldCheck, ChevronDown, Check } from "lucide-react";

export default function Navbar() {
  const { siteData, activeEditionYear, setActiveEditionYear, palette } =
    useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [isEditionDropdownOpen, setIsEditionDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsEditionDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const whatsappNumber = siteData?.settings?.contactWhatsapp || "5511999999999";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Olá! Gostaria de receber informações sobre o Chá das Princesas (${activeEditionYear}).`,
  )}`;

  const editions = siteData?.editions || [];
  const currentEdition =
    editions.find((e) => Number(e.year) === Number(activeEditionYear)) ||
    editions[0];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#fffefb]/95 backdrop-blur-md shadow-sm border-b border-[var(--color-primary-border)]/50 py-2 sm:py-2.5"
          : "bg-[#faf8f5]/90 backdrop-blur-sm py-2.5 sm:py-3.5 border-b border-stone-200/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo & Name */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 group flex-shrink-0"
          >
            {/* Logo container with dynamic theme background */}
            <div
              className="relative w-8 h-8 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-[var(--color-accent-gold)] shadow-xs flex items-center justify-center p-1 sm:p-1.5 transition-colors duration-500 flex-shrink-0"
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
            <div className="min-w-0">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="font-serif font-bold text-sm sm:text-lg lg:text-xl tracking-tight text-[var(--color-primary-deep)] leading-tight truncate">
                  Chá das Princesas
                </span>
                <Crown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[var(--color-accent-gold)] flex-shrink-0" />
              </div>
              <p className="text-[10px] sm:text-[11px] text-stone-500 font-sans tracking-wide hidden xs:block truncate">
                Encontro Real de Mulheres
              </p>
            </div>
          </Link>

          {/* Center: Scalable Royal Edition Dropdown Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsEditionDropdownOpen(!isEditionDropdownOpen)}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 rounded-full bg-white/90 hover:bg-white border border-[var(--color-primary-border)] shadow-xs text-xs sm:text-sm font-serif font-bold text-[var(--color-primary-deep)] transition-all cursor-pointer hover:shadow-md"
              title="Clique para alternar entre as edições"
              aria-expanded={isEditionDropdownOpen}
            >
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{
                  backgroundColor:
                    currentEdition?.themePaletteKey === "blue"
                      ? "#1d5b96"
                      : currentEdition?.themePaletteKey === "lilac"
                        ? "#8a4b9c"
                        : "#c59b27",
                }}
              />
              <span className="hidden md:inline">
                {currentEdition?.number || `${currentEdition?.year}`}
              </span>
              <span className="md:hidden">
                {currentEdition?.year}
              </span>
              <span className="hidden sm:inline font-sans text-xs text-stone-500 font-normal">
                ({currentEdition?.year})
              </span>
              <ChevronDown
                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-stone-500 transition-transform duration-200 ${
                  isEditionDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Popover (Handles 2, 5, 20 or more editions) */}
            {isEditionDropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 sm:w-72 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 animate-fade-in">
                <div className="px-3 py-1.5 border-b border-stone-100 flex items-center justify-between text-[11px] font-serif uppercase tracking-wider text-stone-500 font-semibold">
                  <span>Edições do Chá</span>
                  <span className="text-[10px] font-sans font-normal text-stone-400">
                    {editions.length} registradas
                  </span>
                </div>

                <div className="max-h-64 overflow-y-auto divide-y divide-stone-100/60 font-sans text-xs">
                  {editions.map((ed) => {
                    const isSelected =
                      Number(ed.year) === Number(activeEditionYear);
                    return (
                      <button
                        key={ed.id}
                        onClick={() => {
                          setActiveEditionYear(ed.year);
                          setIsEditionDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2.5 flex items-center justify-between transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-[var(--color-primary-subtle)] text-[var(--color-primary-deep)] font-semibold"
                            : "hover:bg-stone-50 text-stone-700"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                            style={{
                              backgroundColor:
                                ed.themePaletteKey === "blue"
                                  ? "#1d5b96"
                                  : ed.themePaletteKey === "lilac"
                                    ? "#8a4b9c"
                                    : "#c59b27",
                            }}
                          />
                          <div className="truncate">
                            <div className="font-serif font-bold text-sm leading-tight truncate">
                              {ed.number} ({ed.year})
                            </div>
                            <div className="text-[11px] text-stone-500 truncate">
                              {ed.title || ed.themeColor}
                            </div>
                          </div>
                        </div>

                        {isSelected && (
                          <Check className="w-4 h-4 text-[var(--color-primary)] flex-shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Action Items: Theme Picker + WhatsApp + Admin */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
            <ThemeSwitcherPill />

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 p-2 sm:px-3.5 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold text-white shadow-xs transition-all duration-200 hover:shadow-md hover:scale-102 flex-shrink-0"
              style={{ backgroundColor: "var(--color-primary)" }}
              title="Falar no WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden md:inline">Participar</span>
            </a>

            <Link
              href="/admin"
              className="p-1.5 sm:p-2 rounded-full text-stone-500 hover:text-[var(--color-primary-deep)] hover:bg-stone-100 transition-colors flex-shrink-0"
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
