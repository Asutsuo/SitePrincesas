"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import RoyalDivider from "@/components/common/RoyalDivider";
import { Crown, Heart, ScrollText, ZoomIn } from "lucide-react";

const RULES = [
  {
    num: 1,
    title: "Postura Real",
    text: "Coluna reta, não deitar na cabeceira da cadeira.",
  },
  {
    num: 2,
    title: "Mesa Harmoniosa",
    text: "Não colocar os cotovelos sobre a mesa.",
  },
  {
    num: 3,
    title: "O Guardanapo de Pano",
    text: "Use o guardanapo de forma correta: assim que for fazer a refeição colocar o guardanapo dobrado sobre o colo.",
  },
  {
    num: 4,
    title: "A Xícara de Chá",
    text: "Coloque a xícara sempre posicionada no lado direito.",
  },
  {
    num: 5,
    title: "Comunhão até o Fim",
    text: "Não se levantar antes que termine o momento do chá.",
  },
  {
    num: 6,
    title: "Silêncio Reverente",
    text: "Não conversar durante o chá para que todas possam prestar atenção na ministração.",
  },
  {
    num: 7,
    title: "Apoio das Mordomas",
    text: "Se for muito necessário ir ao banheiro, peça à Dama de Companhia para chamar a mordoma palestrante.",
  },
  {
    num: 8,
    title: "Água Fresca",
    text: "Se der sede, solicitar à Dama de Companhia que ela irá procurar a água.",
  },
  {
    num: 9,
    title: "Alimentação Tranquila",
    text: "O que estiver à mesa pode comer durante o chá de forma silenciosa sem conversar para não atrapalhar na palestra.",
  },
  {
    num: 10,
    title: "A Regra de Ouro",
    text: "Se sentir vontade de chorar, fique à vontade!",
    isHighlight: true,
  },
];

export default function PrincessManual() {
  const { openLightbox, activeEditionYear } = useTheme();
  const [selectedRule, setSelectedRule] = useState<number>(10);

  // Manual das Princesas pertence estritamente à 1ª Edição (2025)
  if (Number(activeEditionYear) !== 2025) {
    return null;
  }

  return (
    <section
      id="manual"
      className="py-20 sm:py-28 bg-[#faf7f2] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-[var(--color-primary-deep)] text-xs font-serif uppercase tracking-widest font-semibold mb-3 border border-[var(--color-primary-border)] shadow-xs">
            <ScrollText className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
            Documento Histórico Original
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--color-primary-deep)] tracking-tight">
            O Manual das Princesas
          </h2>
          <p className="mt-3 text-stone-600 font-serif italic text-lg">
            As 10 regras de comportamento à mesa entregues em pergaminho na
            entrada do Salão Real
          </p>
          <RoyalDivider variant="crown" className="my-6" />
        </div>

        {/* Highlight Banner on Rule 10 */}
        <div className="max-w-4xl mx-auto mb-14 bg-gradient-to-r from-[#fff9eb] via-white to-[#fff9eb] p-6 sm:p-8 rounded-3xl border-2 border-[var(--color-accent-gold)] shadow-lg">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[var(--color-accent-gold-light)] flex items-center justify-center text-[var(--color-accent-gold-dark)] flex-shrink-0 shadow-inner">
              <Heart className="w-9 h-9 fill-[var(--color-accent-gold)] text-[var(--color-accent-gold)]" />
            </div>
            <div className="text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-serif font-bold uppercase tracking-widest text-[var(--color-accent-gold-dark)] mb-1">
                <Crown className="w-3 h-3" /> Regra nº 10 do Manual
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-primary-deep)] leading-tight">
                &ldquo;Se sentir vontade de chorar, fique à vontade!&rdquo;
              </h3>
              <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                Entre normas régias de compostura e honra, o Rei Jesus deixou
                claro que a Sua mesa é um lugar seguro de cura. Lágrimas não são
                fraqueza, mas sim o alívio que antecede a restauração.
              </p>
            </div>
          </div>
        </div>

        {/* Content Layout: Photo of printed manual + 10 Rules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Original Manual Photo (Clickable to Expand) */}
          <div className="lg:col-span-5 space-y-3">
            <div
              onClick={() =>
                openLightbox(
                  "/assets/edicoes/2025/manual-impresso.jpg",
                  "O Manual das Princesas original impresso em papel nobre entregue no evento",
                )
              }
              className="group cursor-pointer bg-white p-3 rounded-3xl shadow-md border border-stone-200 hover:shadow-xl transition-all duration-300"
              title="Clique para ampliar o Manual original"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
                <Image
                  src="/assets/edicoes/2025/manual-impresso.jpg"
                  alt="Manual das Princesas original impresso"
                  width={500}
                  height={650}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="pt-3 flex items-center justify-between text-stone-600 px-2">
                <p className="font-serif italic text-xs">
                  Registro fotográfico do Manual impresso original.
                </p>
                <span className="text-xs text-[var(--color-primary)] font-semibold flex items-center gap-1">
                  <ZoomIn className="w-3.5 h-3.5" /> Ampliar
                </span>
              </div>
            </div>
          </div>

          {/* Right: The 10 rules interactive list */}
          <div className="lg:col-span-7 space-y-2.5">
            {RULES.map((rule) => {
              const isSelected = selectedRule === rule.num;
              return (
                <div
                  key={rule.num}
                  onClick={() => setSelectedRule(rule.num)}
                  className={`rounded-2xl p-3.5 sm:p-4 transition-all duration-200 border cursor-pointer ${
                    rule.isHighlight
                      ? "bg-gradient-to-r from-[var(--color-accent-gold-light)]/40 to-white border-[var(--color-accent-gold)] shadow-sm"
                      : isSelected
                        ? "bg-white border-[var(--color-primary)] shadow-sm"
                        : "bg-white/80 hover:bg-white border-stone-200/80"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-serif font-bold text-xs flex-shrink-0 ${
                        rule.isHighlight
                          ? "bg-[var(--color-accent-gold)] text-white"
                          : isSelected
                            ? "bg-[var(--color-primary)] text-white"
                            : "bg-stone-100 text-stone-700"
                      }`}
                    >
                      {rule.num}
                    </span>

                    <div className="flex-1 min-w-0">
                      <p className="font-serif font-bold text-sm sm:text-base text-[var(--color-primary-deep)]">
                        {rule.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
