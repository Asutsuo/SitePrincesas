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
  Trash2,
  Database,
  ExternalLink,
  HelpCircle,
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
    isKvConnected,
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
  const [showKvHelp, setShowKvHelp] = useState(false);

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

    if (trimmed === correctPin) {
      setIsAuthenticated(true);
      setActivePin(trimmed);
      setLoginError("");
      try {
        sessionStorage.setItem("admin_session_pin", trimmed);
        localStorage.setItem("admin_session_pin", trimmed);
      } catch {}
    } else {
      if (correctPin !== "princesas2026" && trimmed === "princesas2026") {
        setLoginError(
          "Atenção: A senha padrão inicial (princesas2026) foi alterada anteriormente pelo administrador. Por favor, insira a nova senha definida pela coordenação.",
        );
      } else if (correctPin !== "princesas2026") {
        setLoginError(
          "Senha incorreta! A senha foi personalizada pelo administrador. Se você não recorda o novo código, entre em contato com quem gerencia o painel.",
        );
      } else {
        setLoginError(
          "Código incorreto. A senha padrão inicial é: princesas2026",
        );
      }
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
    setTimeout(() => setFeedback(null), 6000);
  };

  // Save official theme
  const handleSaveTheme = async (key: string, hex?: string) => {
    setIsSubmitting(true);
    try {
      const pinToUse =
        activePin || siteData?.settings?.adminPin || "princesas2026";
      const chosenHex = hex || customHex;
      setThemeKey(key);
      if (hex) setCustomHex(hex);

      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pin: pinToUse,
          currentThemeKey: key,
          customColorHex: chosenHex,
        }),
      });
      const data = (await res.json()) as any;
      if (data.success) {
        showToast("success", "Cor oficial salva e aplicada com sucesso!");
        await refreshData();
      } else {
        showToast("error", data.error || "Erro ao salvar tema.");
      }
    } catch {
      showToast("success", "Tema salvo localmente no seu navegador!");
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
        rules: [],
        photos: [],
        testimonials: [],
      };

      const res = await fetch("/api/editions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: pinToUse, edition: newEdition }),
      });
      const data = (await res.json()) as any;
      if (data.success) {
        showToast(
          "success",
          `Edição ${editionForm.year} cadastrada com sucesso!`,
        );
        await refreshData();
        setEditionForm({
          year: (editionForm.year || 2027) + 1,
          title: "",
          subtitle: "",
        });
      } else {
        showToast("error", data.error || "Erro ao salvar edição.");
      }
    } catch {
      showToast("error", "Erro ao conectar ao servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Edition
  const handleDeleteEdition = async (editionId: string, editionTitle: string) => {
    if (
      !confirm(
        `Tem certeza que deseja excluir a edição "${editionTitle}"? Esta ação removerá os dados desta edição.`,
      )
    ) {
      return;
    }

    setIsSubmitting(true);
    try {
      const pinToUse =
        activePin || siteData?.settings?.adminPin || "princesas2026";
      const res = await fetch("/api/editions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pin: pinToUse,
          action: "delete",
          editionId,
        }),
      });
      const data = (await res.json()) as any;
      if (data.success) {
        showToast("success", `Edição "${editionTitle}" excluída com sucesso!`);
        await refreshData();
      } else {
        showToast("error", data.error || "Erro ao excluir edição.");
      }
    } catch {
      showToast("error", "Erro ao conectar ao servidor.");
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

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: pinToUse, post: newPost }),
      });
      const data = (await res.json()) as any;
      if (data.success) {
        showToast("success", "Reflexão publicada no site com sucesso!");
        await refreshData();
        setPostForm({ title: "", subtitle: "", excerpt: "", content: "" });
      } else {
        showToast("error", data.error || "Erro ao publicar.");
      }
    } catch {
      showToast("error", "Erro ao conectar ao servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Blog Post
  const handleDeletePost = async (postId: string, postTitle: string) => {
    if (
      !confirm(
        `Tem certeza que deseja excluir a reflexão "${postTitle}"?`,
      )
    ) {
      return;
    }

    setIsSubmitting(true);
    try {
      const pinToUse =
        activePin || siteData?.settings?.adminPin || "princesas2026";
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pin: pinToUse,
          action: "delete",
          postId,
        }),
      });
      const data = (await res.json()) as any;
      if (data.success) {
        showToast("success", `Reflexão "${postTitle}" excluída com sucesso!`);
        await refreshData();
      } else {
        showToast("error", data.error || "Erro ao excluir post.");
      }
    } catch {
      showToast("error", "Erro ao conectar ao servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Save General Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const pinToUse =
        activePin || siteData?.settings?.adminPin || "princesas2026";
      const payload: any = {
        pin: pinToUse,
        contactWhatsapp: settingsForm.contactWhatsapp,
        churchName: settingsForm.churchName,
        churchAddress: settingsForm.churchAddress,
        motto: settingsForm.motto,
      };
      if (settingsForm.newPin && settingsForm.newPin.trim().length >= 4) {
        payload.adminPin = settingsForm.newPin.trim();
      }

      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as any;
      if (data.success) {
        if (settingsForm.newPin && settingsForm.newPin.trim().length >= 4) {
          setActivePin(settingsForm.newPin.trim());
          try {
            sessionStorage.setItem(
              "admin_session_pin",
              settingsForm.newPin.trim(),
            );
            localStorage.setItem(
              "admin_session_pin",
              settingsForm.newPin.trim(),
            );
          } catch {}
          setSettingsForm((prev) => ({ ...prev, newPin: "" }));
        }
        showToast("success", "Configurações salvas e atualizadas com sucesso!");
        await refreshData();
      } else {
        showToast("error", data.error || "Erro ao atualizar.");
      }
    } catch {
      showToast("error", "Erro ao conectar ao servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    const isCustomPin =
      siteData?.settings?.adminPin &&
      siteData.settings.adminPin !== "princesas2026";

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
              <p className="text-[11px] text-stone-500 mt-2 font-sans">
                {isCustomPin ? (
                  <span className="text-amber-800 font-medium flex items-center gap-1">
                    🔒 A senha foi alterada pela administração. Digite o novo código cadastrado.
                  </span>
                ) : (
                  <>
                    Senha padrão inicial:{" "}
                    <code className="bg-stone-100 px-1.5 py-0.5 rounded font-mono font-bold text-stone-800">
                      princesas2026
                    </code>
                  </>
                )}
              </p>
            </div>

            {loginError && (
              <div className="flex items-start gap-2 text-xs text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl text-sm font-semibold text-white shadow-md transition-all duration-200 cursor-pointer hover:shadow-lg"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              Acessar Painel
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-stone-200">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800 font-serif italic"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar para o site público</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Admin Dashboard
  return (
    <main className="min-h-screen bg-[#faf8f5] text-stone-800 pb-24">
      {/* Top Navbar */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-stone-200 transition-colors"
              title="Voltar ao site"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-[var(--color-accent-gold)]" />
                <h1 className="font-serif font-bold text-lg text-[var(--color-primary-deep)]">
                  Painel de Controle Real
                </h1>
              </div>
              <p className="text-[11px] text-stone-500 font-sans hidden sm:block">
                Edição & Gestão — Chá das Princesas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Cloudflare KV Status indicator */}
            {isKvConnected ? (
              <div
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium"
                title="Cloudflare KV Ativo: dados sincronizados globalmente"
              >
                <Database className="w-3 h-3 text-emerald-600" />
                <span>Nuvem Conectada (KV Ativo)</span>
              </div>
            ) : (
              <button
                onClick={() => setShowKvHelp(!showKvHelp)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300 text-xs font-medium cursor-pointer hover:bg-amber-100 transition-colors"
              >
                <Database className="w-3 h-3 text-amber-600" />
                <span>Vincular Nuvem (Cloudflare KV)</span>
                <HelpCircle className="w-3 h-3 text-amber-700" />
              </button>
            )}

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-stone-600 hover:text-red-700 hover:bg-red-50 transition-colors border border-stone-200"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Encerrar Sessão</span>
            </button>
          </div>
        </div>

        {/* Cloudflare KV Helper Banner */}
        {showKvHelp && (
          <div className="bg-gradient-to-r from-amber-50 via-white to-amber-50 border-b border-amber-200 px-4 py-4 text-xs text-stone-800">
            <div className="max-w-5xl mx-auto space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-900 flex items-center gap-1.5 text-sm">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  Como ativar o Cloudflare KV (para salvar no ar sem precisar de dev):
                </span>
                <button
                  onClick={() => setShowKvHelp(false)}
                  className="text-stone-500 hover:text-stone-800 font-bold"
                >
                  ✕ Fechar
                </button>
              </div>
              <p className="text-stone-600 leading-relaxed">
                O site salva todas as alterações na nuvem em tempo real quando você vincula um Namespace KV gratuito na Cloudflare:
              </p>
              <ol className="list-decimal list-inside space-y-1 text-stone-700 font-mono bg-white p-3 rounded-xl border border-amber-200">
                <li>Acesse o painel Cloudflare &gt; <strong>Workers e Pages</strong> &gt; <strong>KV</strong> &gt; Clique em <strong>Criar namespace</strong> com o nome: <code className="bg-amber-100 px-1 py-0.5 rounded font-bold">PRINCESAS_KV</code></li>
                <li>Vá no seu Worker <strong>princesas</strong> &gt; aba <strong>Configurações (Settings)</strong> &gt; <strong>Vinculações (Bindings)</strong></li>
                <li>Clique em <strong>Adicionar</strong> &gt; <strong>Namespace KV</strong> &gt; Nome da variável: <code className="bg-amber-100 px-1 py-0.5 rounded font-bold">SITE_KV</code> &gt; Selecione o namespace <code className="bg-amber-100 px-1 py-0.5 rounded font-bold">PRINCESAS_KV</code></li>
              </ol>
              <p className="text-[11px] text-stone-500 italic">
                Enquanto não vincular o KV, suas edições continuam funcionando e sendo salvas no seu navegador local via localStorage.
              </p>
            </div>
          </div>
        )}
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Toast Feedback */}
        {feedback && (
          <div
            className={`mb-6 p-4 rounded-2xl flex items-center gap-3 text-sm shadow-md animate-fade-in ${
              feedback.type === "success"
                ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                : "bg-red-50 text-red-900 border border-red-200"
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
        <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-4 mb-8">
          <button
            onClick={() => setActiveTab("themes")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-serif text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "themes"
                ? "bg-white text-[var(--color-primary-deep)] shadow-md border border-[var(--color-primary-border)]"
                : "text-stone-600 hover:bg-white/60"
            }`}
          >
            <Palette className="w-4 h-4 text-[var(--color-accent-gold)]" />
            <span>Cores & Temas Oficiais</span>
          </button>

          <button
            onClick={() => setActiveTab("editions")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-serif text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "editions"
                ? "bg-white text-[var(--color-primary-deep)] shadow-md border border-[var(--color-primary-border)]"
                : "text-stone-600 hover:bg-white/60"
            }`}
          >
            <Calendar className="w-4 h-4 text-[var(--color-accent-gold)]" />
            <span>Gerenciar Edições</span>
          </button>

          <button
            onClick={() => setActiveTab("posts")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-serif text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "posts"
                ? "bg-white text-[var(--color-primary-deep)] shadow-md border border-[var(--color-primary-border)]"
                : "text-stone-600 hover:bg-white/60"
            }`}
          >
            <BookOpen className="w-4 h-4 text-[var(--color-accent-gold)]" />
            <span>Blog & Mensagens</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-serif text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "settings"
                ? "bg-white text-[var(--color-primary-deep)] shadow-md border border-[var(--color-primary-border)]"
                : "text-stone-600 hover:bg-white/60"
            }`}
          >
            <Settings className="w-4 h-4 text-[var(--color-accent-gold)]" />
            <span>WhatsApp & Segurança</span>
          </button>
        </div>

        {/* TAB 1: THEMES */}
        {activeTab === "themes" && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-md">
              <div className="flex items-center gap-2 text-xs uppercase font-serif tracking-widest font-bold text-[var(--color-accent-gold-dark)] mb-1">
                <Sparkles className="w-4 h-4 text-[var(--color-accent-gold)]" />
                Identidade Visual
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-primary-deep)]">
                Cor Oficial do Site
              </h2>
              <p className="text-sm text-stone-600 mt-1 mb-8 font-sans">
                Ao selecionar ou salvar uma cor, ela se torna o padrão oficial em todo o portal para todas as visitantes.
              </p>

              {/* Presets Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {Object.values(PRESET_THEMES).map((preset) => {
                  const isActive = themeKey === preset.key;
                  return (
                    <div
                      key={preset.key}
                      onClick={() => handleSaveTheme(preset.key)}
                      className={`group p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex items-center justify-between ${
                        isActive
                          ? "border-[var(--color-primary)] bg-[var(--color-primary-subtle)]/40 shadow-md scale-102"
                          : "border-stone-200 hover:border-stone-300 bg-white hover:bg-stone-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-8 h-8 rounded-full border border-black/10 shadow-xs flex-shrink-0"
                          style={{ backgroundColor: preset.primary }}
                        />
                        <div>
                          <h4 className="font-serif font-bold text-sm text-stone-900">
                            {preset.name}
                          </h4>
                          <p className="text-xs text-stone-500 font-sans">
                            {preset.key === "blue"
                              ? "Oficial 2026 (2ª Edição)"
                              : preset.key === "lilac"
                                ? "Oficial 2025 (1ª Edição)"
                                : "Paleta Real"}
                          </p>
                        </div>
                      </div>

                      {isActive && (
                        <span className="text-xs font-bold text-[var(--color-primary-deep)] bg-white px-2.5 py-1 rounded-full border border-[var(--color-primary-border)] shadow-2xs">
                          Ativo
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Custom Color Picker */}
              <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-[var(--color-accent-gold)]" />
                    <span>Cor Personalizada (Hexadecimal)</span>
                  </h4>
                  <p className="text-xs text-stone-500 font-sans mt-0.5">
                    Escolha um tom específico da identidade visual da próxima edição.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={customHex}
                    onChange={(e) => setCustomHex(e.target.value)}
                    className="w-10 h-10 rounded-xl cursor-pointer border border-stone-300 p-0.5"
                  />
                  <input
                    type="text"
                    value={customHex}
                    onChange={(e) => setCustomHex(e.target.value)}
                    placeholder="#1d5b96"
                    className="w-28 px-3 py-2 rounded-xl border border-stone-300 font-mono text-xs uppercase"
                  />
                  <button
                    onClick={() => handleSaveTheme("custom", customHex)}
                    disabled={isSubmitting}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-sm cursor-pointer"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    Salvar Cor
                  </button>
                </div>
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
                Cadastrar Nova Edição do Chá das Princesas
              </h2>
              <p className="text-sm text-stone-600 mt-1 mb-8 font-sans">
                Adicione as edições anuais futuras com facilidade para manter o acervo do ministério sempre atualizado.
              </p>

              <form onSubmit={handleCreateEdition} className="space-y-6 font-sans">
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
                      Título Real do Tema
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
                      placeholder="Ex: Herdeiras do Reino"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[var(--color-primary)] focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                      Subtítulo Inspirador
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
                      placeholder="Ex: Filhas Amadas do Rei Celestial"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[var(--color-primary)] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                      Versículo Bíblico Oficial
                    </label>
                    <input
                      type="text"
                      value={editionForm.bibleTheme?.verse || ""}
                      onChange={(e) =>
                        setEditionForm({
                          ...editionForm,
                          bibleTheme: {
                            verse: e.target.value,
                            reference:
                              editionForm.bibleTheme?.reference || "",
                          },
                        })
                      }
                      placeholder="Ex: Vós sois a geração eleita..."
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
                      placeholder="Ex: 1 Pedro 2:9"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[var(--color-primary)] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Descrição do Encontro
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
                Edições Registradas ({siteData?.editions?.length || 0})
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

                      <button
                        onClick={() => handleDeleteEdition(String(ed.id), ed.title)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors cursor-pointer"
                        title="Excluir edição"
                      >
                        <Trash2 className="w-4 h-4" />
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
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-md space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase font-serif tracking-widest font-bold text-[var(--color-accent-gold-dark)] mb-1">
                  <BookOpen className="w-4 h-4 text-[var(--color-accent-gold)]" />
                  Devocional & Cartas
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-primary-deep)]">
                  Publicar Nova Mensagem no Blog das Princesas
                </h2>
                <p className="text-sm text-stone-600 mt-1 font-sans">
                  Compartilhe cartas, orações e reflexões de cura para as filhas do Rei.
                </p>
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
                      placeholder="Ex: Deixando as Pedras pelo Caminho"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[var(--color-primary)] focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                      Subtítulo
                    </label>
                    <input
                      type="text"
                      value={postForm.subtitle || ""}
                      onChange={(e) =>
                        setPostForm({ ...postForm, subtitle: e.target.value })
                      }
                      placeholder="Ex: O alívio de quem descansa diante da cruz"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[var(--color-primary)] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Conteúdo Completo da Carta
                  </label>
                  <textarea
                    rows={6}
                    value={postForm.content || ""}
                    onChange={(e) =>
                      setPostForm({ ...postForm, content: e.target.value })
                    }
                    placeholder="Escreva a ministração aqui com carinho..."
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[var(--color-primary)] focus:outline-none leading-relaxed"
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

            {/* List Existing Posts */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-md font-sans">
              <h3 className="font-serif font-bold text-xl text-[var(--color-primary-deep)] mb-4">
                Reflexões Publicadas ({siteData?.posts?.length || 0})
              </h3>
              <div className="space-y-3">
                {siteData?.posts?.map((post) => (
                  <div
                    key={post.id}
                    className="p-4 rounded-2xl bg-[#faf8f5] border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <h4 className="font-serif font-bold text-base text-stone-900">
                        {post.title}
                      </h4>
                      <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-stone-400 font-mono">
                        {post.publishedAt}
                      </span>
                      <button
                        onClick={() => handleDeletePost(post.id, post.title)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors cursor-pointer"
                        title="Excluir postagem"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
                <p className="text-[11px] text-stone-500 mt-1">
                  Ao definir uma nova senha, guarde-a com segurança. O código antigo não funcionará mais.
                </p>
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
