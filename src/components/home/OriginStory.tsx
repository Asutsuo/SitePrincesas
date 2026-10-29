"use client";

import React from "react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import RoyalDivider from "@/components/common/RoyalDivider";
import { Crown, Sparkles, Flame, Quote, ZoomIn } from "lucide-react";

export default function OriginStory() {
  const { openLightbox } = useTheme();

  return (
    <section
      id="historia"
      className="py-20 sm:py-28 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[var(--color-primary-subtle)] text-[var(--color-primary-deep)] text-xs font-serif uppercase tracking-widest font-semibold mb-3 border border-[var(--color-primary-border)]">
            <Sparkles className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
            Nascido no Coração de Deus
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--color-primary-deep)] tracking-tight">
            A História do Chá das Princesas
          </h2>
          <p className="mt-3 text-stone-600 font-serif italic text-lg">
            Um relato de oração, obediência e cura contado por Edinea Gomes
            Barbalho
          </p>
          <RoyalDivider variant="crown" className="my-6" />
        </div>

        {/* Narrative Flow: Two columns with imagery and text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Real Photos Clickable */}
          <div className="lg:col-span-5 space-y-6">
            <div
              onClick={() =>
                openLightbox(
                  "/assets/edicoes/2025/edinea-palestrante.jpg",
                  "Edinea Gomes Barbalho ministrando a Palavra do Rei aos corações",
                )
              }
              className="group cursor-pointer relative rounded-3xl overflow-hidden shadow-xl border-4 border-white hover:shadow-2xl transition-all duration-300"
              title="Clique para ampliar a foto"
            >
              <Image
                src="/assets/edicoes/2025/edinea-palestrante.jpg"
                alt="Edinea Gomes Barbalho ministrando no Chá das Princesas"
                width={600}
                height={700}
                className="w-full object-cover aspect-[4/5] group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-serif uppercase tracking-widest text-[var(--color-accent-gold-light)] flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5" /> Idealizadora
                </span>
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-xl font-bold">
                    Edinea Gomes Barbalho
                  </h4>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full flex items-center gap-1">
                    <ZoomIn className="w-3 h-3" /> Ampliar
                  </span>
                </div>
                <p className="text-xs text-stone-200 mt-1 italic">
                  &ldquo;Primeiro os projetos de Deus, depois os meus.&rdquo;
                </p>
              </div>
            </div>

            {/* Secondary Photo: As Mordomas */}
            <div
              onClick={() =>
                openLightbox(
                  "/assets/edicoes/2025/mordomas-intercessoras.jpg",
                  "As fiéis Mordomas Intercessoras que sustentaram o Chá das Princesas em oração",
                )
              }
              className="group cursor-pointer relative rounded-2xl overflow-hidden shadow-md border-2 border-white hover:shadow-xl transition-all duration-300"
              title="Clique para ampliar a foto"
            >
              <Image
                src="/assets/edicoes/2025/mordomas-intercessoras.jpg"
                alt="As Mordomas Intercessoras do Chá das Princesas"
                width={500}
                height={320}
                className="w-full object-cover aspect-[16/10] group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-3 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
                <p className="font-serif italic text-xs text-stone-700">
                  As fiéis <strong>Mordomas Intercessoras</strong>: amor e
                  oração contínua.
                </p>
                <span className="text-[11px] text-stone-500 flex items-center gap-1">
                  <ZoomIn className="w-3 h-3" /> Ampliar
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Authentic Editorial Narrative */}
          <div className="lg:col-span-7 space-y-6 text-stone-700 leading-relaxed font-sans text-base">
            <div className="relative bg-[#fdfcf9] rounded-3xl p-6 sm:p-8 border border-[var(--color-primary-border)] shadow-xs">
              <Quote className="w-10 h-10 text-[var(--color-accent-gold)] opacity-30 absolute top-4 right-4" />

              <h3 className="font-serif text-2xl font-bold text-[var(--color-primary-deep)] mb-4 flex items-center gap-2">
                <Flame className="w-5 h-5 text-[var(--color-accent-gold)]" />A
                Oração que Deu Origem a Tudo (Final de 2024)
              </h3>

              <p className="mb-4">
                No finalzinho do ano de 2024,{" "}
                <strong>Edinea Gomes Barbalho</strong> fazia sua oração de fim
                de ano prometendo mudar algumas coisas:
                <em>
                  {" "}
                  &ldquo;Senhor, ano que vem eu vou focar nos meus projetos,
                  focar em fazer meu escritório para atender melhor meus
                  clientes, vou gastar menos...&rdquo;
                </em>
              </p>

              <p className="mb-4">
                Naquele momento de oração, ouviu com clareza a voz do Senhor
                dentro do seu ser dizendo:
                <strong className="block my-3 text-lg font-serif italic text-[var(--color-primary-dark)] bg-white p-4 rounded-xl border-l-4 border-[var(--color-primary)] shadow-xs">
                  &ldquo;Primeiro os projetos Dele, depois os teus.&rdquo;
                </strong>
                Com o coração estremecido, começou a perguntar e indagar em
                espírito qual era a vontade de Deus.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-[var(--color-primary-deep)]">
                O Propósito: Curar Dores Emocionais Silenciosas
              </h3>
              <p>
                Entre ministrações e orações veio a resposta: existem meninas e
                mulheres bem próximas que carregam dores profundas —{" "}
                <strong>
                  depressão, ansiedade, culpa, sentimento de inferioridade e
                  traumas
                </strong>
                . Eram dores e pancadas emocionais silenciosas.
              </p>
              <p>
                O Senhor colocou no coração de Edinea que o Seu plano era
                resgatar essas meninas e oferecer um ambiente diferente onde
                elas pudessem se sentir{" "}
                <strong>
                  verdadeiramente especiais, amadas e filhas do Rei
                </strong>
                , acolhidas em Seu próprio castelo.
              </p>
            </div>

            <div className="bg-[#fffefb] p-6 rounded-2xl border border-stone-200 space-y-3">
              <h4 className="font-serif font-bold text-base text-[var(--color-primary-deep)]">
                Os Dois Princípios que Deus Enfatizou:
              </h4>
              <ul className="space-y-2 text-sm text-stone-600">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-accent-gold)] font-bold text-base leading-none">
                    •
                  </span>
                  <span>
                    <strong>Cada detalhe importa:</strong> Do convite em
                    pergaminho às taças, pratos e guardanapos, tudo demonstraria
                    a excelência do Reino.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-accent-gold)] font-bold text-base leading-none">
                    •
                  </span>
                  <span>
                    <strong>Patrocinado pelo Rei:</strong> Deus orientou a não
                    pedir nada a ninguém, nem doações ou empréstimos. Teria que
                    custar da própria fé e dedicação de Edinea.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-accent-gold)] font-bold text-base leading-none">
                    •
                  </span>
                  <span>
                    <strong>A Parceria com Matheus:</strong> Edinea chamou seu
                    enteado Matheus para organizar listas e minúcias com rigor e
                    amor.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-accent-gold)] font-bold text-base leading-none">
                    •
                  </span>
                  <span>
                    <strong>O Sonho da Urgência:</strong> Um sonho profético com
                    um saco de leite furado vazando alimento revelou que o chá
                    não podia esperar — e a data foi selada para{" "}
                    <strong>15 de Fevereiro de 2025</strong>.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
