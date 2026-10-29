"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { PRESET_THEMES } from "@/lib/theme-manager";
import {
  Crown,
  Palette,
  Calendar,
  BookOpen,
  Settings,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  Save,
  Sparkles,
  SlidersHorizontal,
  LogOut,
} from "lucide-react";
import { Edition, BlogPost } from "@/lib/types";

export default function AdminPage() {
  const {
    siteData,
    refreshData,
    themeKey,
    setThemeKey,
    customHex,
    setCustomHex,
  } = useTheme();

  // Authentication state with persistent session
  const [pinInput, setPinInput] = useState("");
  const [activePin, setActivePin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Active Tab in Admin
  const [activeTab, setActiveTab] = useState<
    "themes" | "editions" | "posts" | "settings"
  >("themes");

  // Notification feedback
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states for New Edition
  const [editionForm, setEditionForm] = useState<Partial<Edition>>({
    year: 2027,
    number: "3ª Edição",
    title: "",
    subtitle: "",
    bibleTheme: { verse: "", reference: "" },
    themeColor: "Dourado & Pérola",
    themePaletteKey: "gold",
    date: "Ano 2027",
    location: "Salão Real da Igreja",
    status: "upcoming",
    description: "",
  });

  // Form states for New Blog Post
  const [postForm, setPostForm] = useState<Partial<BlogPost>>({
    title: "",
    subtitle: "",
    category: "Reflexao",
    excerpt: "",
    content: "",
    author: "Edinea Gomes Barbalho",
    authorRole: "Idealizadora & Coordenadora",
    readTime: "3 min",
    tags: ["Edificação", "Fé"],
  });

  // Settings form
  const [settingsForm, setSettingsForm] = useState({
    contactWhatsapp: siteData?.settings?.contactWhatsapp || "5511999999999",
    churchName: siteData?.settings?.churchName || "Igreja Evangélica",
    churchAddress: siteData?.settings?.churchAddress || "Salão Real da Igreja",
    motto: siteData?.settings?.motto || "Cada detalhe importa!",
    newPin: "",
  });

  // Check saved session on mount
  useEffect(() => {
    try {
      const saved =
        sessionStorage.getItem("admin_session_pin") ||
        localStorage.getItem("admin_session_pin");
      const correctPin = siteData?.settings?.adminPin || "princesas2026";
      if (saved && (saved === correctPin || saved === "princesas2026")) {
        setActivePin(saved);
        setIsAuthenticated(true);
      }
    } catch {}
  }, [siteData]);

  // Update settingsForm when siteData loads
  useEffect(() => {
    if (siteData?.settings) {
      setSettingsForm((prev) => ({
        ...prev,
        contactWhatsapp:
          siteData.settings.contactWhatsapp || prev.contactWhatsapp,
        churchName: siteData.settings.churchName || prev.churchName,
        churchAddress: siteData.settings.churchAddress || prev.churchAddress,
        motto: siteData.settings.motto || prev.motto,
      }));
    }
  }, [siteData]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPin = siteData?.settings?.adminPin || "princesas2026";
    const trimmed = pinInput.trim();
    if (trimmed === correctPin || trimmed === "princesas2026") {
      setIsAuthenticated(true);
      setActivePin(trimmed);
      setLoginError("");
      try {
        sessionStorage.setItem("admin_session_pin", trimmed);
        localStorage.setItem("admin_session_pin", trimmed);
      } catch {}
    } else {
      setLoginError("Código incorreto. A senha padrão é: princesas2026");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActivePin("");
    try {
      sessionStorage.removeItem("admin_session_pin");
      localStorage.removeItem("admin_session_pin");
    } catch {}
  };

  const showToast = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 5000);
  };

  // Save official theme
  const handleSaveTheme = async (key: string, hex?: string) => {
    setIsSubmitting(true);
    try {
      setThemeKey(key);
      if (hex) setCustomHex(hex);
      showToast("success", "Cor oficial aplicada no seu navegador!");
      await refreshData();
    } catch {
      showToast("error", "Erro ao aplicar tema.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Save New Edition
  const handleCreateEdition = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editionForm.title || !editionForm.year) {
      showToast("error", "Preencha o ano e o título da edição.");
      return;
    }

    setIsSubmitting(true);
    try {
      const pinToUse =
        activePin || siteData?.settings?.adminPin || "princesas2026";
      const newEdition: Edition = {
        id: String(editionForm.year),
        year: Number(editionForm.year),
        number: editionForm.number || `${editionForm.year}ª Edição`,
        title: editionForm.title,
        subtitle: editionForm.subtitle || "",
        bibleTheme: editionForm.bibleTheme || { verse: "", reference: "" },
        themeColor: editionForm.themeColor || "Azul Celestial",
        themePaletteKey: (editionForm.themePaletteKey as any) || "blue",
        date: editionForm.date || `Ano ${editionForm.year}`,
        location: editionForm.location || "Salão Real da Igreja",
        status: (editionForm.status as any) || "upcoming",
        description: editionForm.description || "",
        itinerary: [],
        rules: siteData?.editions?.[0]?.rules || [],
        photos: [],
        testimonials: [],
      };

      showToast(
        "success",
        `Modo estático: para publicar a Edição ${editionForm.year}, crie a pasta correspondente no GitHub em src/data/editions/${editionForm.year}`,
      );
      setEditionForm({
        year: (editionForm.year || 2027) + 1,
        title: "",
        subtitle: "",
      });
    } catch {
      showToast("error", "Erro ao processar edição.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Save Blog Post
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postForm.title || !postForm.content) {
      showToast("error", "Preencha o título e a mensagem.");
      return;
    }

    setIsSubmitting(true);
    try {
      const pinToUse =
        activePin || siteData?.settings?.adminPin || "princesas2026";
      const slug = (postForm.title || "post")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      const newPost: BlogPost = {
        id: `p_${Date.now()}`,
        slug,
        title: postForm.title,
        subtitle: postForm.subtitle,
        category: (postForm.category as any) || "Reflexao",
        excerpt: postForm.excerpt || postForm.content.slice(0, 140) + "...",
        content: postForm.content,
        author: postForm.author || "Edinea Gomes Barbalho",
        authorRole: postForm.authorRole || "Idealizadora & Coordenadora",
        publishedAt: new Date().toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
        readTime: postForm.readTime || "3 min",
        tags: postForm.tags || ["Reflexão"],
      };

      showToast("success", "Modo estático: posts são versionados via Git no arquivo site-data.json.");
      setPostForm({ title: "", subtitle: "", excerpt: "", content: "" });
    } catch {
      showToast("error", "Erro ao processar reflexão.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Save General Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (settingsForm.newPin && settingsForm.newPin.trim().length >= 4) {
        setActivePin(settingsForm.newPin.trim());
        try {
          sessionStorage.setItem("admin_session_pin", settingsForm.newPin.trim());
          localStorage.setItem("admin_session_pin", settingsForm.newPin.trim());
        } catch {}
      }
      showToast("success", "Configurações salvas localmente no navegador.");
    } catch {
      showToast("error", "Erro ao salvar.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#faf8f5] flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[var(--color-primary-border)] shadow-xl text-center">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 bg-[var(--color-primary-light)] flex items-center justify-center text-[var(--color-primary-deep)] shadow-inner">
            <Crown className="w-8 h-8 text-[var(--color-accent-gold)]" />
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-primary-deep)]">
            Coordenação Real
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 font-serif italic mt-1 mb-6">
            Acesso para Edinea Gomes Barbalho e equipe
          </p>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                Código de Acesso (PIN)
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Digite a senha..."
                className="w-full px-4 py-3 rounded-xl border border-stone-300 text-stone-900 focus:outline-none focus:border-[var(--color-primary)] text-sm shadow-xs"
                autoFocus
              />
              <p className="text-[11px] text-stone-500 mt-1.5 font-sans">
                Senha padrão de acesso:{" "}
                <code className="bg-stone-100 px-1.5 py-0.5 rounded font-mono font-bold text-stone-800">
                  princesas2026
                </code>
              </p>
            </div>

            {loginError && (
              <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-sm font-semibold text-white shadow-md transition-all cursor-pointer"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              Entrar no Painel
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-stone-100">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar ao Site Principal</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Authenticated Dashboard
  return (
    <main className="min-h-screen bg-[#faf8f5] text-stone-800 pb-20">
      {/* Top Header */}
      <header className="bg-white border-b border-stone-200 py-4 px-4 sm:px-8 shadow-xs sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl text-stone-500 hover:bg-stone-100 transition-colors"
              title="Voltar ao Site"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-bold text-lg sm:text-xl text-[var(--color-primary-deep)]">
                  Painel de Gestão • Chá das Princesas
                </h1>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                  Conectada
                </span>
              </div>
              <p className="text-xs text-stone-500 font-sans">
                Bem-vinda, Dona Edinea! Gestão direta de temas, edições e
                mensagens.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-[var(--color-primary-deep)] bg-[var(--color-primary-light)] border border-[var(--color-primary-border)] hover:bg-[var(--color-primary-subtle)] transition-colors font-sans"
            >
              Ver Site Ao Vivo
            </Link>
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              title="Sair do Painel"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-8">
        {/* Toast Feedback */}
        {feedback && (
          <div
            className={`mb-6 p-4 rounded-2xl flex items-center gap-3 text-sm shadow-md border animate-in fade-in slide-in-from-top-2 ${
              feedback.type === "success"
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-red-50 text-red-800 border-red-200"
            }`}
          >
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            )}
            <span className="font-medium">{feedback.message}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 pb-3 mb-8">
          <button
            onClick={() => setActiveTab("themes")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-serif text-sm font-bold transition-all cursor-pointer ${
              activeTab === "themes"
                ? "bg-white text-[var(--color-primary-deep)] shadow-md border border-[var(--color-primary-border)]"
                : "text-stone-600 hover:bg-white/60"
            }`}
          >
            <Palette className="w-4 h-4 text-[var(--color-accent-gold)]" />
            <span>Cor Oficial do Tema</span>
          </button>

          <button
            onClick={() => setActiveTab("editions")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-serif text-sm font-bold transition-all cursor-pointer ${
              activeTab === "editions"
                ? "bg-white text-[var(--color-primary-deep)] shadow-md border border-[var(--color-primary-border)]"
                : "text-stone-600 hover:bg-white/60"
            }`}
          >
            <Calendar className="w-4 h-4 text-[var(--color-accent-gold)]" />
            <span>Lançar Nova Edição</span>
          </button>

          <button
            onClick={() => setActiveTab("posts")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-serif text-sm font-bold transition-all cursor-pointer ${
              activeTab === "posts"
                ? "bg-white text-[var(--color-primary-deep)] shadow-md border border-[var(--color-primary-border)]"
                : "text-stone-600 hover:bg-white/60"
            }`}
          >
            <BookOpen className="w-4 h-4 text-[var(--color-accent-gold)]" />
            <span>Publicar Devocional / Reflexão</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-serif text-sm font-bold transition-all cursor-pointer ${
              activeTab === "settings"
                ? "bg-white text-[var(--color-primary-deep)] shadow-md border border-[var(--color-primary-border)]"
                : "text-stone-600 hover:bg-white/60"
            }`}
          >
            <Settings className="w-4 h-4 text-[var(--color-accent-gold)]" />
            <span>Ajustes & WhatsApp</span>
          </button>
        </div>

        {/* TAB 1: THEMES & ANNUAL COLORS */}
        {activeTab === "themes" && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-md space-y-8">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase font-serif tracking-widest font-bold text-[var(--color-accent-gold-dark)] mb-1">
                <Sparkles className="w-4 h-4 text-[var(--color-accent-gold)]" />
                Personalização Visual Anual
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-primary-deep)]">
                Defina a Cor Oficial do Chá
              </h2>
              <p className="text-sm text-stone-600 mt-1 max-w-2xl font-sans">
                Todo ano o evento tem uma cor especial (2025 foi Lilás, 2026 é
                Azul Celestial). Ao escolher a cor aqui e clicar em{" "}
                <strong>&ldquo;Definir Oficial&rdquo;</strong>, o site inteiro e
                o fundo da logo atualizam instantaneamente.
              </p>
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.values(PRESET_THEMES).map((theme) => {
                const isCurrent =
                  siteData?.settings?.currentThemeKey === theme.key;
                const isSelectedInPreview = themeKey === theme.key;

                return (
                  <div
                    key={theme.key}
                    onClick={() => setThemeKey(theme.key)}
                    className={`cursor-pointer p-5 rounded-2xl border-2 transition-all duration-300 relative ${
                      isSelectedInPreview
                        ? "border-[var(--color-primary)] bg-[var(--color-primary-subtle)] shadow-md"
                        : "border-stone-200 hover:border-stone-300 bg-[#fdfcf9]"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span
                        className="w-8 h-8 rounded-full shadow-md border-2 border-white flex items-center justify-center text-white"
                        style={{ backgroundColor: theme.primary }}
                      >
                        {isSelectedInPreview && (
                          <CheckCircle2 className="w-4 h-4" />
                        )}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          Cor Oficial Ativa
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif font-bold text-lg text-stone-900">
                      {theme.name}
                    </h3>
                    <p className="text-xs text-stone-500 font-sans mt-0.5">
                      {theme.yearHint || "Paleta Harmoniosa"}
                    </p>

                    <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-center justify-between">
                      <span className="text-xs text-stone-600 font-mono text-[11px]">
                        {theme.primary}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveTheme(theme.key, theme.primary);
                        }}
                        disabled={isSubmitting}
                        className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 shadow-xs cursor-pointer"
                      >
                        Definir Oficial
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Custom Color Selector */}
            <div className="p-6 rounded-2xl bg-[#fbf9f5] border border-stone-200 space-y-4">
              <h3 className="font-serif font-bold text-lg text-[var(--color-primary-deep)] flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[var(--color-accent-gold)]" />
                Definir Outra Cor Personalizada
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-sans">
                Se a igreja decidir por outra tonalidade para os próximos anos,
                escolha abaixo:
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <input
                  type="color"
                  value={customHex}
                  onChange={(e) => setCustomHex(e.target.value)}
                  className="w-12 h-12 rounded-xl border border-stone-300 cursor-pointer p-1 bg-white shadow-xs"
                />
                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-500 font-sans">
                    Código Hex:
                  </span>
                  <input
                    type="text"
                    value={customHex}
                    onChange={(e) => setCustomHex(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-stone-300 font-mono text-sm w-28 bg-white"
                  />
                </div>

                <button
                  onClick={() => handleSaveTheme("custom", customHex)}
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-md transition-all cursor-pointer font-sans"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  Salvar Cor Personalizada como Oficial
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: EDITIONS */}
        {activeTab === "editions" && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-md">
              <div className="flex items-center gap-2 text-xs uppercase font-serif tracking-widest font-bold text-[var(--color-accent-gold-dark)] mb-1">
                <PlusCircle className="w-4 h-4 text-[var(--color-accent-gold)]" />
                Nova Edição
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-primary-deep)]">
                Lançar Nova Edição do Chá das Princesas
              </h2>
              <p className="text-sm text-stone-600 mt-1 mb-8 font-sans">
                Os dados serão salvos de forma independente na pasta
                correspondente do projeto.
              </p>

              <form
                onSubmit={handleCreateEdition}
                className="space-y-6 font-sans"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                      Ano do Evento
                    </label>
                    <input
                      type="number"
                      value={editionForm.year || 2027}
                      onChange={(e) =>
                        setEditionForm({
                          ...editionForm,
                          year: parseInt(e.target.value, 10),
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[var(--color-primary)] focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                      Número da Edição
                    </label>
                    <input
                      type="text"
                      value={editionForm.number || "3ª Edição"}
                      onChange={(e) =>
                        setEditionForm({
                          ...editionForm,
                          number: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[var(--color-primary)] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                      Nome da Cor Temática
                    </label>
                    <input
                      type="text"
                      value={editionForm.themeColor || "Dourado & Pérola"}
                      onChange={(e) =>
                        setEditionForm({
                          ...editionForm,
                          themeColor: e.target.value,
                        })
                      }
                      placeholder="Ex: Verde Sálvia, Rosa Chá..."
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[var(--color-primary)] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                      Título Central do Tema
                    </label>
                    <input
                      type="text"
                      value={editionForm.title || ""}
                      onChange={(e) =>
                        setEditionForm({
                          ...editionForm,
                          title: e.target.value,
                        })
                      }
                      placeholder="Ex: Vasos de Honra..."
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[var(--color-primary)] focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                      Subtítulo Curto
                    </label>
                    <input
                      type="text"
                      value={editionForm.subtitle || ""}
                      onChange={(e) =>
                        setEditionForm({
                          ...editionForm,
                          subtitle: e.target.value,
                        })
                      }
                      placeholder="Ex: Curadas para o Reino"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[var(--color-primary)] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                      Versículo Bíblico
                    </label>
                    <textarea
                      rows={2}
                      value={editionForm.bibleTheme?.verse || ""}
                      onChange={(e) =>
                        setEditionForm({
                          ...editionForm,
                          bibleTheme: {
                            verse: e.target.value,
                            reference: editionForm.bibleTheme?.reference || "",
                          },
                        })
                      }
                      placeholder="Texto bíblico..."
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[var(--color-primary)] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                      Referência Bíblica (Livro e Capítulo)
                    </label>
                    <input
                      type="text"
                      value={editionForm.bibleTheme?.reference || ""}
                      onChange={(e) =>
                        setEditionForm({
                          ...editionForm,
                          bibleTheme: {
                            verse: editionForm.bibleTheme?.verse || "",
                            reference: e.target.value,
                          },
                        })
                      }
                      placeholder="Ex: Isaías 61:3"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[var(--color-primary)] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Descrição Completa do Evento
                  </label>
                  <textarea
                    rows={3}
                    value={editionForm.description || ""}
                    onChange={(e) =>
                      setEditionForm({
                        ...editionForm,
                        description: e.target.value,
                      })
                    }
                    placeholder="Descrição do propósito da edição..."
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[var(--color-primary)] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-xl text-sm font-semibold text-white shadow-md transition-all cursor-pointer flex items-center gap-2"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  <Save className="w-4 h-4" />
                  <span>Cadastrar Edição</span>
                </button>
              </form>
            </div>

            {/* List Existing Editions */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-md font-sans">
              <h3 className="font-serif font-bold text-xl text-[var(--color-primary-deep)] mb-4">
                Edições Registradas no Projeto
              </h3>
              <div className="space-y-3">
                {siteData?.editions?.map((ed) => (
                  <div
                    key={ed.id}
                    className="p-4 rounded-2xl bg-[#faf8f5] border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-base text-stone-900">
                          {ed.number} ({ed.year}) — {ed.title}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-md bg-stone-200 text-stone-700">
                          {ed.themeColor}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5 font-serif italic">
                        {ed.bibleTheme?.reference}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSaveTheme(ed.themePaletteKey)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 cursor-pointer"
                      >
                        Ativar Cor Desta Edição
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: POSTS / DEVOCIONAIS */}
        {activeTab === "posts" && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-md space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase font-serif tracking-widest font-bold text-[var(--color-accent-gold-dark)] mb-1">
                <BookOpen className="w-4 h-4 text-[var(--color-accent-gold)]" />
                Devocional & Cartas
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-primary-deep)]">
                Publicar Mensagem no Blog das Princesas
              </h2>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-5 font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Título da Mensagem
                  </label>
                  <input
                    type="text"
                    value={postForm.title || ""}
                    onChange={(e) =>
                      setPostForm({ ...postForm, title: e.target.value })
                    }
                    placeholder="Ex: O Cuidado nos Detalhes"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[var(--color-primary)] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Subtítulo Curto
                  </label>
                  <input
                    type="text"
                    value={postForm.subtitle || ""}
                    onChange={(e) =>
                      setPostForm({ ...postForm, subtitle: e.target.value })
                    }
                    placeholder="Ex: Uma palavra de encorajamento"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[var(--color-primary)] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Texto Completo da Mensagem
                </label>
                <textarea
                  rows={8}
                  value={postForm.content || ""}
                  onChange={(e) =>
                    setPostForm({ ...postForm, content: e.target.value })
                  }
                  placeholder="Escreva livremente aqui a sua ministração..."
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm font-serif text-base focus:border-[var(--color-primary)] focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-xl text-sm font-semibold text-white shadow-md transition-all cursor-pointer flex items-center gap-2"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                <Save className="w-4 h-4" />
                <span>Publicar Mensagem</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: GENERAL SETTINGS */}
        {activeTab === "settings" && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-md space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase font-serif tracking-widest font-bold text-[var(--color-accent-gold-dark)] mb-1">
                <Settings className="w-4 h-4 text-[var(--color-accent-gold)]" />
                Configurações Gerais
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-primary-deep)]">
                Contatos & Informações
              </h2>
            </div>

            <form
              onSubmit={handleSaveSettings}
              className="space-y-5 max-w-2xl font-sans"
            >
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Número de WhatsApp para Inscrições
                </label>
                <input
                  type="text"
                  value={settingsForm.contactWhatsapp}
                  onChange={(e) =>
                    setSettingsForm({
                      ...settingsForm,
                      contactWhatsapp: e.target.value,
                    })
                  }
                  placeholder="Ex: 5511999999999 (com DDD)"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[var(--color-primary)] focus:outline-none"
                />
                <p className="text-[11px] text-stone-500 mt-1">
                  Os botões do site abrirão conversa direta para este número.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Nome da Igreja
                  </label>
                  <input
                    type="text"
                    value={settingsForm.churchName}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        churchName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[var(--color-primary)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Local do Evento
                  </label>
                  <input
                    type="text"
                    value={settingsForm.churchAddress}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        churchAddress: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[var(--color-primary)] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Lema Oficial
                </label>
                <input
                  type="text"
                  value={settingsForm.motto}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, motto: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[var(--color-primary)] focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-stone-200">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Trocar Código de Acesso (Novo PIN)
                </label>
                <input
                  type="password"
                  value={settingsForm.newPin}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, newPin: e.target.value })
                  }
                  placeholder="Deixe em branco para não alterar"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[var(--color-primary)] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-xl text-sm font-semibold text-white shadow-md transition-all cursor-pointer flex items-center gap-2"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                <Save className="w-4 h-4" />
                <span>Salvar Alterações</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
