"use client";

import React, { useEffect, useState } from "react";
import { X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface PhotoLightboxModalProps {
  isOpen: boolean;
  src: string;
  caption?: string;
  onClose: () => void;
}

export default function PhotoLightboxModal({
  isOpen,
  src,
  caption,
  onClose,
}: PhotoLightboxModalProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Reset zoom when opening or changing image
  useEffect(() => {
    if (isOpen) {
      setZoomLevel(1);
      // Lock body scroll
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, src]);

  // Handle ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !src) return null;

  const toggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel((prev) => (prev === 1 ? 1.6 : 1));
  };

  const zoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel((prev) => Math.min(prev + 0.3, 2.5));
  };

  const zoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel((prev) => Math.max(prev - 0.3, 0.8));
  };

  const resetZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(1);
  };

  return (
    <div
      className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-2 sm:p-6 select-none animate-in fade-in duration-200"
      onClick={onClose}
      style={{ isolation: "isolate" }}
    >
      {/* Top Action Bar */}
      <div
        className="w-full max-w-5xl flex items-center justify-between px-3 py-2 text-white z-20 mb-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-serif italic text-stone-300">
            {caption || "Visualização da Foto"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-white/10 rounded-full px-2 py-1 backdrop-blur-sm border border-white/10">
            <button
              onClick={zoomOut}
              className="p-1 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Diminuir Zoom"
              aria-label="Diminuir Zoom"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={resetZoom}
              className="px-1.5 py-0.5 text-xs text-stone-300 hover:text-white transition-colors cursor-pointer"
              title="Redefinir Zoom (100%)"
            >
              {Math.round(zoomLevel * 100)}%
            </button>
            <button
              onClick={zoomIn}
              className="p-1 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Aumentar Zoom"
              aria-label="Aumentar Zoom"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/15 hover:bg-red-600/80 text-white transition-all cursor-pointer shadow-lg ml-2"
            title="Fechar (ESC)"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Image Container */}
      <div
        className="relative max-w-5xl w-full flex-1 max-h-[84vh] flex items-center justify-center overflow-auto rounded-2xl p-2"
        onClick={(e) => e.stopPropagation()}
      >
        {src.includes("logo-princesas-generico") ? (
          <div
            onClick={toggleZoom}
            className="w-72 h-72 sm:w-96 sm:h-96 rounded-full p-8 shadow-2xl border-4 border-white flex items-center justify-center transition-transform duration-200"
            style={{
              backgroundColor: "var(--color-primary, #1d5b96)",
              transform: `scale(${zoomLevel})`,
              transformOrigin: "center center",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={caption || "Emblema Oficial"}
              className="w-full h-full object-contain brightness-0 invert"
            />
          </div>
        ) : src.includes("convite-2025") ? (
          <div
            onClick={toggleZoom}
            className="bg-white/95 p-6 sm:p-8 rounded-3xl shadow-2xl border-4 border-[var(--color-primary-border, #e8c9f2)] flex items-center justify-center max-w-sm sm:max-w-md transition-transform duration-200"
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: "center center",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={caption || "A Mochila — Símbolo da 1ª Edição"}
              className="max-w-full max-h-[60vh] object-contain drop-shadow-md"
            />
          </div>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={src}
            alt={caption || "Foto em alta resolução"}
            onClick={toggleZoom}
            className={`max-w-full max-h-[80vh] w-auto h-auto object-contain block mx-auto my-auto rounded-xl shadow-2xl transition-transform duration-200 ${
              zoomLevel === 1 ? "cursor-zoom-in" : "cursor-zoom-out"
            }`}
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: "center center",
            }}
          />
        )}
      </div>

      {/* Footer Caption */}
      {caption && (
        <div
          className="w-full max-w-3xl pt-2 pb-1 text-center px-4 z-20"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="font-serif italic text-white/80 text-xs sm:text-sm leading-relaxed">
            {caption}
          </p>
          <p className="text-[10px] text-stone-400 mt-0.5 font-sans">
            Dica: clique na imagem para alternar o zoom • pressione ESC para
            fechar
          </p>
        </div>
      )}
    </div>
  );
}
