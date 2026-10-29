"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import { Crown, Heart, MessageCircle, ShieldCheck } from "lucide-react";

export default function Footer() {
  const { siteData, activeEditionYear, palette } = useTheme();

  const whatsappNumber = siteData?.settings?.contactWhatsapp || "5511999999999";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Olá! Gostaria de saber mais informações sobre o Chá das Princesas (${activeEditionYear}).`,
  )}`;

  return (
    <footer className="bg-[#f7f3ed] border-t border-[var(--color-primary-border)]/60 pt-16 pb-12 mt-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-stone-300/60">
          {/* Col 1: Identity & Calling */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              {/* Logo with dynamic theme background */}
              <div
                className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[var(--color-accent-gold)] shadow-sm flex items-center justify-center p-2 transition-colors duration-500"
                style={{ backgroundColor: palette.primary }}
              >
                <Image
                  src="/assets/logo-princesas-generico.png"
                  alt="Chá das Princesas Logo"
                  width={48}
                  height={48}
                  className="object-contain brightness-0 invert"
                />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-[var(--color-primary-deep)] tracking-tight">
                  Chá das Princesas
                </h3>
                <p className="text-xs text-[var(--color-accent-gold-dark)] font-serif italic tracking-wide">
                  {siteData?.settings?.motto || "Cada detalhe importa!"}
                </p>
              </div>
            </div>

            <p className="text-sm text-stone-600 leading-relaxed max-w-md font-sans">
              Ministério nascido no coração de Deus através de{" "}
              <strong>Edinea Gomes Barbalho</strong>, criado para acolher, curar
              e lembrar a cada mulher que ela é filha amada do Rei Jesus,
              herdeira da graça e preciosa aos olhos do Pai.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white shadow-sm transition-all"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Contato via WhatsApp</span>
              </a>

              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Painel da Coordenação</span>
              </Link>
            </div>
          </div>

          {/* Col 2: Scripture Anchor */}
          <div className="md:col-span-6 space-y-3 bg-white/70 p-6 rounded-3xl border border-[var(--color-primary-border)]/50">
            <div className="flex items-center gap-2 text-[var(--color-accent-gold-dark)]">
              <Crown className="w-4 h-4" />
              <span className="font-serif text-xs uppercase tracking-widest font-semibold">
                Fundamento de Fé
              </span>
            </div>

            <blockquote className="font-serif italic text-stone-800 text-sm sm:text-base leading-relaxed border-l-2 border-[var(--color-accent-gold)] pl-3">
              &ldquo;Vinde a mim, todos os que estais cansados e
              sobrecarregados, e eu vos aliviarei. Tomai sobre vós o meu jugo e
              aprendei de mim, porque sou manso e humilde de coração; e achareis
              descanso para a vossa alma.&rdquo;
            </blockquote>
            <p className="text-xs font-semibold text-[var(--color-primary-deep)] text-right font-serif">
              — Mateus 11:28-29
            </p>
          </div>
        </div>

        {/* Bottom credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-sans">
          <p>
            © {activeEditionYear} Chá das Princesas. Todos os direitos
            reservados. Idealizado com amor e fé por Edinea Gomes Barbalho.
          </p>
          <div className="flex items-center gap-1.5 text-stone-600">
            <span>Feito com</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>para as Filhas do Rei Jesus</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
