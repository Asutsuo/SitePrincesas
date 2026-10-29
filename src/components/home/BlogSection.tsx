"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import RoyalDivider from "@/components/common/RoyalDivider";
import {
  BookOpen,
  Calendar,
  Clock,
  Sparkles,
  X,
  User,
  ChevronRight,
} from "lucide-react";
import { BlogPost } from "@/lib/types";

export default function BlogSection() {
  const { siteData } = useTheme();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const posts = siteData?.posts || [];

  return (
    <section
      id="blog"
      className="py-24 sm:py-32 bg-[#faf8f5] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-[var(--color-primary-deep)] text-xs font-serif uppercase tracking-widest font-semibold mb-3 border border-[var(--color-primary-border)] shadow-xs">
            <BookOpen className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
            Cartas do Castelo
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--color-primary-deep)] tracking-tight">
            Reflexões & Devocionais
          </h2>
          <p className="mt-3 text-stone-600 font-serif italic text-lg">
            Mensagens inspiradas no coração de Deus para edificar sua caminhada
          </p>
          <RoyalDivider variant="crown" className="my-6" />
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {posts.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-stone-200/90 hover:border-[var(--color-primary-border)] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Cover Image */}
                {post.coverImage && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-100">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[11px] font-serif uppercase tracking-wider font-bold text-[var(--color-primary-deep)] shadow-xs">
                      {post.category}
                    </div>
                  </div>
                )}

                <div className="p-6 sm:p-7">
                  <div className="flex items-center gap-3 text-xs text-stone-500 mb-3 font-sans">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
                      {post.publishedAt}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[var(--color-primary-deep)] group-hover:text-[var(--color-primary)] transition-colors leading-snug mb-2">
                    {post.title}
                  </h3>

                  {post.subtitle && (
                    <p className="font-serif italic text-xs text-[var(--color-accent-gold-dark)] mb-3">
                      {post.subtitle}
                    </p>
                  )}

                  <p className="text-sm text-stone-600 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Author & Read More */}
              <div className="px-6 sm:px-7 pb-6 pt-2 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-stone-600">
                  <User className="w-3.5 h-3.5 text-[var(--color-accent-gold)]" />
                  <span className="font-medium">{post.author}</span>
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-primary)] group-hover:translate-x-1 transition-transform">
                  Ler Texto Completo
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Reading Modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl border border-[var(--color-primary-border)] animate-in zoom-in-95 duration-200 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 z-10"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-serif uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary-deep)]">
                {selectedPost.category}
              </span>
              <span className="text-xs text-stone-500">
                {selectedPost.publishedAt} • {selectedPost.readTime}
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--color-primary-deep)] leading-tight mb-2">
              {selectedPost.title}
            </h2>

            {selectedPost.subtitle && (
              <p className="font-serif italic text-base text-[var(--color-accent-gold-dark)] mb-6">
                {selectedPost.subtitle}
              </p>
            )}

            {selectedPost.coverImage && (
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8 shadow-md">
                <Image
                  src={selectedPost.coverImage}
                  alt={selectedPost.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="prose prose-stone max-w-none font-serif text-base sm:text-lg leading-relaxed text-stone-800 space-y-4 whitespace-pre-line">
              {selectedPost.content}
            </div>

            <div className="mt-8 pt-6 border-t border-stone-200 flex items-center justify-between">
              <div>
                <p className="font-serif font-bold text-sm text-[var(--color-primary-deep)]">
                  {selectedPost.author}
                </p>
                <p className="text-xs text-stone-500">
                  {selectedPost.authorRole}
                </p>
              </div>

              <button
                onClick={() => setSelectedPost(null)}
                className="px-5 py-2 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors"
              >
                Fechar Leitura
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
