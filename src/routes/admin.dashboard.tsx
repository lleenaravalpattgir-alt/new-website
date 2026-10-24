import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { useAdminAuth } from "@/lib/admin-auth";
import {
  getStoredArticles,
  getStoredCategories,
  saveArticle,
  deleteArticle,
  toggleArticleStatus,
} from "@/lib/blog-storage";
import {
  INSIGHTS_CATEGORIES,
  type InsightsArticle,
  type ContentBlock,
} from "@/data/insightsArticles";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  FolderTree,
  Image as ImageIcon,
  Search as SearchIcon,
  Globe,
  UserCheck,
  LogOut,
  Sparkles,
  ExternalLink,
  Edit3,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  Plus,
  X,
  Save,
  Send,
  Calendar,
  Layers,
  HelpCircle,
  Table as TableIcon,
  List,
  Check,
  ChevronDown,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard | Ryze Advisory Blog Management" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminDashboardPage,
});

type TabType =
  | "dashboard"
  | "blogs"
  | "editor"
  | "categories"
  | "media"
  | "seo"
  | "account";

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading, logout } = useAdminAuth();

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");

  // Articles state
  const [articles, setArticles] = useState<InsightsArticle[]>([]);
  const [categories, setCategories] = useState(getStoredCategories());

  // Filter states for All Blogs table
  const [searchFilter, setSearchFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft" | "scheduled">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 8;

  // Article deletion dialog state
  const [deleteTarget, setDeleteTarget] = useState<InsightsArticle | null>(null);

  // Editor State
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [editorTitle, setEditorTitle] = useState("");
  const [editorSlug, setEditorSlug] = useState("");
  const [editorExcerpt, setEditorExcerpt] = useState("");
  const [editorCategory, setEditorCategory] = useState("Finance & CFO Services");
  const [editorAuthor, setEditorAuthor] = useState("Leena Raval");
  const [editorAuthorRole, setEditorAuthorRole] = useState(
    "Founder & Strategic Growth Advisor, Rise Advisory"
  );
  const [editorImageUrl, setEditorImageUrl] = useState("/logo.png");
  const [editorImageAlt, setEditorImageAlt] = useState("");
  const [editorTags, setEditorTags] = useState<string>("");
  const [editorReadTime, setEditorReadTime] = useState("6 min read");
  const [editorStatus, setEditorStatus] = useState<"draft" | "published" | "scheduled">("draft");
  const [editorFeatured, setEditorFeatured] = useState(false);

  // SEO Fields
  const [editorSeoTitle, setEditorSeoTitle] = useState("");
  const [editorMetaDesc, setEditorMetaDesc] = useState("");
  const [editorPrimaryKeyword, setEditorPrimaryKeyword] = useState("");
  const [editorSecondaryKeywords, setEditorSecondaryKeywords] = useState("");
  const [editorCanonicalUrl, setEditorCanonicalUrl] = useState("");

  // Content Blocks in Editor
  const [editorBlocks, setEditorBlocks] = useState<ContentBlock[]>([]);
  const [editorFaqs, setEditorFaqs] = useState<{ q: string; a: string }[]>([]);

  // Editor Preview mode toggle
  const [previewMode, setPreviewMode] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  const [editorError, setEditorError] = useState<string | null>(null);

  // IndexNow Instant Indexing State
  const [indexNowUrl, setIndexNowUrl] = useState("https://ryzeadvisory.co/blog/the-llm-brand-sentiment-index-we-use-for-quarterly-reviews");
  const [indexNowSubmitting, setIndexNowSubmitting] = useState(false);
  const [indexNowStatus, setIndexNowStatus] = useState<{
    type: "success" | "error" | "info";
    message: string;
    details?: string;
  } | null>(null);

  const handleIndexNowSubmit = async (submitAll = false) => {
    setIndexNowSubmitting(true);
    setIndexNowStatus(null);
    try {
      const payload = submitAll ? { submitAll: true } : { url: indexNowUrl.trim() };
      const res = await fetch("/api/public/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIndexNowStatus({
          type: "success",
          message: `HTTP ${data.statusCode}: ${data.message} (${data.submittedCount} URL(s) notified to IndexNow)`,
          details: "Submission signals search engines to crawl these URLs. Indexing is subject to search engine validation and crawl scheduling.",
        });
      } else {
        setIndexNowStatus({
          type: "error",
          message: data.error || data.message || `Error submitting (HTTP ${res.status})`,
          details: data.rejected ? `Rejected: ${JSON.stringify(data.rejected)}` : undefined,
        });
      }
    } catch (err) {
      setIndexNowStatus({
        type: "error",
        message: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setIndexNowSubmitting(false);
    }
  };

  // Load articles on mount and listen for external updates
  const reloadArticles = () => {
    const list = getStoredArticles();
    setArticles([...list]);
    setCategories(getStoredCategories());
  };

  useEffect(() => {
    reloadArticles();
    const handleUpdate = () => reloadArticles();
    window.addEventListener("ryze-articles-updated", handleUpdate);
    return () => window.removeEventListener("ryze-articles-updated", handleUpdate);
  }, []);

  // Route protection
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate({ to: "/admin/login" });
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Handle logout
  const handleLogout = async () => {
    await logout();
    navigate({ to: "/admin/login" });
  };

  // KPI Metrics
  const metrics = useMemo(() => {
    const total = articles.length;
    const published = articles.filter((a) => a.status === "published").length;
    const drafts = articles.filter((a) => a.status === "draft").length;
    const scheduled = articles.filter((a) => (a.status as string) === "scheduled").length;
    return { total, published, drafts, scheduled };
  }, [articles]);

  // Filtered articles list
  const filteredArticles = useMemo(() => {
    const q = searchFilter.trim().toLowerCase();
    return articles.filter((a) => {
      if (statusFilter !== "all" && a.status !== statusFilter) return false;
      if (categoryFilter !== "all" && a.categorySlug !== categoryFilter) return false;
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.slug.toLowerCase().includes(q) ||
        a.primaryKeyword.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
      );
    });
  }, [articles, searchFilter, statusFilter, categoryFilter]);

  const totalPages = Math.ceil(filteredArticles.length / PAGE_SIZE) || 1;
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    setEditorTitle(val);
    if (!editingSlug) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setEditorSlug(generated);
      if (!editorSeoTitle) {
        setEditorSeoTitle(val);
      }
    }
  };

  // Open editor for New Blog
  const handleOpenNewBlog = () => {
    setEditingSlug(null);
    setEditorTitle("");
    setEditorSlug("");
    setEditorExcerpt("");
    setEditorCategory("Finance & CFO Services");
    setEditorAuthor(user?.email ? user.email.split("@")[0] : "Leena Raval");
    setEditorAuthorRole("Strategic Growth Advisor, Rise Advisory");
    setEditorImageUrl("/logo.png");
    setEditorImageAlt("");
    setEditorTags("");
    setEditorReadTime("6 min read");
    setEditorStatus("draft");
    setEditorFeatured(false);
    setEditorSeoTitle("");
    setEditorMetaDesc("");
    setEditorPrimaryKeyword("");
    setEditorSecondaryKeywords("");
    setEditorCanonicalUrl("");
    setEditorBlocks([
      { type: "h2", text: "Introduction" },
      { type: "p", text: "Write your opening section explaining the core topic in simple English..." },
      { type: "h2", text: "Key Strategic Takeaways" },
      { type: "list", items: ["First actionable principle", "Second actionable principle"] },
    ]);
    setEditorFaqs([
      { q: "Who is this guide intended for?", a: "Business owners, founders, and CXO teams looking for practical guidance." }
    ]);
    setEditorError(null);
    setSaveSuccessMsg(null);
    setActiveTab("editor");
  };

  // Open editor for Existing Blog
  const handleEditBlog = (article: InsightsArticle) => {
    setEditingSlug(article.slug);
    setEditorTitle(article.title);
    setEditorSlug(article.slug);
    setEditorExcerpt(article.excerpt);
    setEditorCategory(article.category);
    setEditorAuthor(article.author);
    setEditorAuthorRole(article.authorRole);
    setEditorImageUrl(article.imageUrl || "/logo.png");
    setEditorImageAlt(article.imageAlt || article.title);
    setEditorTags(article.secondaryKeywords?.join(", ") || "");
    setEditorReadTime(article.readTime);
    setEditorStatus(article.status);
    setEditorFeatured(Boolean(article.featured));
    setEditorSeoTitle(article.seoTitle || article.title);
    setEditorMetaDesc(article.metaDescription || article.excerpt);
    setEditorPrimaryKeyword(article.primaryKeyword);
    setEditorSecondaryKeywords(article.secondaryKeywords?.join(", ") || "");
    setEditorCanonicalUrl(`https://ryzeadvisory.co/insights/${article.slug}`);
    setEditorBlocks(article.content && article.content.length > 0 ? [...article.content] : [
      { type: "h2", text: "Overview" },
      { type: "p", text: article.excerpt },
    ]);
    setEditorFaqs(article.faqs && article.faqs.length > 0 ? [...article.faqs] : []);
    setEditorError(null);
    setSaveSuccessMsg(null);
    setActiveTab("editor");
  };

  // Save Blog (Draft or Published)
  const handleSaveBlog = async (targetStatus?: "draft" | "published") => {
    setEditorError(null);
    setSaveSuccessMsg(null);

    const finalStatus = targetStatus || editorStatus;

    if (!editorTitle.trim()) {
      setEditorError("Please enter an article title.");
      return;
    }
    if (!editorSlug.trim()) {
      setEditorError("Please enter a valid URL slug.");
      return;
    }

    const categoryObj = INSIGHTS_CATEGORIES.find((c) => c.name === editorCategory);
    const categorySlug = categoryObj
      ? categoryObj.slug
      : editorCategory.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const secondaryArray = editorSecondaryKeywords
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);

    // Build Table of Contents from H2 headings
    const toc = editorBlocks
      .filter((b) => b.type === "h2" && b.text)
      .map((b) => ({
        id: b.text!.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        label: b.text!,
      }));

    try {
      const saved = await saveArticle({
        slug: editorSlug,
        title: editorTitle,
        seoTitle: editorSeoTitle || editorTitle,
        metaDescription: editorMetaDesc || editorExcerpt,
        excerpt: editorExcerpt || editorTitle,
        category: editorCategory,
        categorySlug: categorySlug,
        author: editorAuthor,
        authorRole: editorAuthorRole,
        readTime: editorReadTime,
        status: finalStatus,
        featured: editorFeatured,
        primaryKeyword: editorPrimaryKeyword || editorTitle,
        secondaryKeywords: secondaryArray,
        imageUrl: editorImageUrl,
        imageAlt: editorImageAlt || editorTitle,
        content: editorBlocks,
        faqs: editorFaqs,
        toc: toc,
      });

      setEditorStatus(saved.status);
      setEditingSlug(saved.slug);
      reloadArticles();

      setSaveSuccessMsg(
        finalStatus === "published"
          ? `Article successfully published! It is now live on /insights/${saved.slug}`
          : "Draft saved successfully. It is safely stored in your backlog."
      );

      setTimeout(() => setSaveSuccessMsg(null), 4000);
    } catch (err: any) {
      setEditorError(err?.message || "Failed to save article.");
    }
  };

  // Delete article confirmation
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    await deleteArticle(deleteTarget.slug);
    setDeleteTarget(null);
    reloadArticles();
  };

  // Toggle quick publish/unpublish from table
  const handleToggleStatus = async (slug: string) => {
    await toggleArticleStatus(slug);
    reloadArticles();
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#F8FBFF] flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#D4A238] border-t-transparent mx-auto mb-3" />
          <p className="text-xs font-semibold text-[#53637C]">Authenticating Administrator Session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FBFF] flex flex-col lg:flex-row">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full lg:w-64 bg-[#0B1F3B] text-white flex flex-col justify-between shrink-0 shadow-xl">
        <div>
          {/* Brand Logo & Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <Link to="/insights" className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white">Ryze</span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4A238] bg-[#0E2A4D] px-2 py-0.5 rounded border border-[#D4A238]/30">
                Admin CMS
              </span>
            </Link>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1 text-xs">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition cursor-pointer ${
                activeTab === "dashboard"
                  ? "bg-[#D4A238] text-[#0B1F3B] font-bold shadow-gold"
                  : "text-[#EEF4FA]/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <LayoutDashboard className="h-4 w-4 shrink-0" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab("blogs")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg font-medium transition cursor-pointer ${
                activeTab === "blogs"
                  ? "bg-[#D4A238] text-[#0B1F3B] font-bold shadow-gold"
                  : "text-[#EEF4FA]/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 shrink-0" />
                <span>All Blogs</span>
              </div>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">
                {articles.length}
              </span>
            </button>

            <button
              onClick={handleOpenNewBlog}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition cursor-pointer ${
                activeTab === "editor" && !editingSlug
                  ? "bg-[#D4A238] text-[#0B1F3B] font-bold shadow-gold"
                  : "text-[#EEF4FA]/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <PlusCircle className="h-4 w-4 shrink-0" />
              <span>Add New Blog</span>
            </button>

            <button
              onClick={() => setActiveTab("categories")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition cursor-pointer ${
                activeTab === "categories"
                  ? "bg-[#D4A238] text-[#0B1F3B] font-bold shadow-gold"
                  : "text-[#EEF4FA]/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <FolderTree className="h-4 w-4 shrink-0" />
              <span>Categories (9)</span>
            </button>

            <button
              onClick={() => setActiveTab("media")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition cursor-pointer ${
                activeTab === "media"
                  ? "bg-[#D4A238] text-[#0B1F3B] font-bold shadow-gold"
                  : "text-[#EEF4FA]/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <ImageIcon className="h-4 w-4 shrink-0" />
              <span>Media Library</span>
            </button>

            <button
              onClick={() => setActiveTab("seo")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition cursor-pointer ${
                activeTab === "seo"
                  ? "bg-[#D4A238] text-[#0B1F3B] font-bold shadow-gold"
                  : "text-[#EEF4FA]/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Globe className="h-4 w-4 shrink-0" />
              <span>SEO Settings</span>
            </button>

            <button
              onClick={() => setActiveTab("account")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition cursor-pointer ${
                activeTab === "account"
                  ? "bg-[#D4A238] text-[#0B1F3B] font-bold shadow-gold"
                  : "text-[#EEF4FA]/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <UserCheck className="h-4 w-4 shrink-0" />
              <span>Admin Account</span>
            </button>
          </nav>
        </div>

        {/* User Session & Logout Footer */}
        <div className="p-4 border-t border-white/10 bg-[#08172D]">
          <div className="flex items-center justify-between mb-3">
            <div className="overflow-hidden">
              <div className="text-[11px] font-bold text-white truncate">
                {user?.email || "admin@riseadvisory.co"}
              </div>
              <div className="text-[10px] text-[#D4A238]">Super Administrator</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-white hover:bg-red-500/20 hover:text-red-300 transition cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        {/* Top Bar with Live Site Link */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-4">
          <div>
            <div className="text-xs uppercase tracking-wider font-bold text-[#B8860B]">
              Ryze Advisory CMS
            </div>
            <h1 className="text-2xl font-extrabold text-[#0F1E2F]">
              {activeTab === "dashboard" && "Dashboard Overview"}
              {activeTab === "blogs" && "All Articles & Insights"}
              {activeTab === "editor" && (editingSlug ? `Edit Article: ${editorTitle}` : "Create New Blog Article")}
              {activeTab === "categories" && "Topic Categories"}
              {activeTab === "media" && "Media Library"}
              {activeTab === "seo" && "SEO & Structured Data Settings"}
              {activeTab === "account" && "Administrator Account Settings"}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/insights"
              target="_blank"
              className="rounded-lg border border-[#CBD5E1] bg-white px-3.5 py-2 text-xs font-bold text-[#0B1F3B] hover:bg-[#EEF4FA] inline-flex items-center gap-1.5 transition shadow-2xs"
            >
              <ExternalLink className="h-3.5 w-3.5 text-[#B8860B]" />
              <span>View Public /insights</span>
            </Link>
            <button
              onClick={handleOpenNewBlog}
              className="btn-gold px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider shadow-gold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Write Article</span>
            </button>
          </div>
        </div>

        {/* ================= TAB 1: DASHBOARD OVERVIEW ================= */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-5 bg-white border-[#E2E8F0]">
                <div className="text-xs font-bold text-[#53637C] uppercase tracking-wider">
                  Total Articles
                </div>
                <div className="mt-2 text-3xl font-extrabold text-[#0F1E2F]">
                  {metrics.total}
                </div>
                <p className="mt-1 text-[11px] text-[#53637C]">Across 9 categories</p>
              </Card>

              <Card className="p-5 bg-white border-emerald-200 bg-emerald-50/15">
                <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  Live Published
                </div>
                <div className="mt-2 text-3xl font-extrabold text-emerald-900">
                  {metrics.published}
                </div>
                <p className="mt-1 text-[11px] text-emerald-700">Indexed on public /insights</p>
              </Card>

              <Card className="p-5 bg-white border-amber-200 bg-amber-50/15">
                <div className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                  Draft Backlog
                </div>
                <div className="mt-2 text-3xl font-extrabold text-amber-900">
                  {metrics.drafts}
                </div>
                <p className="mt-1 text-[11px] text-amber-700">Hidden from public view</p>
              </Card>

              <Card className="p-5 bg-white border-[#D4A238]/30 bg-[#F8FBFF]">
                <div className="text-xs font-bold text-[#B8860B] uppercase tracking-wider">
                  Scheduled / In-Review
                </div>
                <div className="mt-2 text-3xl font-extrabold text-[#0B1F3B]">
                  {metrics.scheduled}
                </div>
                <p className="mt-1 text-[11px] text-[#53637C]">Ready for publication</p>
              </Card>
            </div>

            {/* Recently Edited Articles */}
            <Card className="p-6 bg-white border-[#E2E8F0]">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-[#0F1E2F]">Recently Updated Articles</h2>
                  <p className="text-xs text-[#53637C]">Quickly edit, preview, or publish recent content.</p>
                </div>
                <button
                  onClick={() => setActiveTab("blogs")}
                  className="text-xs font-bold text-[#B8860B] hover:text-[#0B1F3B] inline-flex items-center gap-1"
                >
                  <span>View All ({articles.length})</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#EEF4FA] text-[#0F1E2F] font-bold">
                    <tr>
                      <th className="p-3">Status</th>
                      <th className="p-3">Article Title</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Target Keyword</th>
                      <th className="p-3">Read Time</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {articles.slice(0, 6).map((art) => (
                      <tr key={art.slug} className="hover:bg-[#F8FBFF]">
                        <td className="p-3">
                          {art.status === "published" ? (
                            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                              Published
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
                              Draft
                            </Badge>
                          )}
                        </td>
                        <td className="p-3 font-semibold text-[#0F1E2F]">
                          <button
                            onClick={() => handleEditBlog(art)}
                            className="hover:text-[#B8860B] text-left transition"
                          >
                            {art.title}
                          </button>
                          <div className="text-[10px] font-mono text-[#53637C]">/insights/{art.slug}</div>
                        </td>
                        <td className="p-3 text-[#53637C]">{art.category}</td>
                        <td className="p-3 font-mono text-[#0B1F3B] bg-[#EEF4FA]/50 rounded px-1.5 py-0.5 w-fit">
                          {art.primaryKeyword}
                        </td>
                        <td className="p-3 text-[#53637C]">{art.readTime}</td>
                        <td className="p-3 text-right space-x-1">
                          <button
                            onClick={() => handleEditBlog(art)}
                            className="p-1 rounded text-[#53637C] hover:text-[#0F1E2F] hover:bg-[#EEF4FA]"
                            title="Edit"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </button>
                          <Link
                            to="/insights/$slug"
                            params={{ slug: art.slug }}
                            target="_blank"
                            className="p-1 inline-block rounded text-[#53637C] hover:text-[#B8860B] hover:bg-[#EEF4FA]"
                            title="Preview on live site"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Quick Tips */}
            <div className="rounded-xl border border-[#D4A238]/30 bg-[#F8FBFF] p-5 flex items-start gap-4">
              <Sparkles className="h-5 w-5 text-[#B8860B] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F1E2F]">
                  SEO &amp; Content Publishing Workflow
                </h3>
                <p className="mt-1 text-xs text-[#53637C] leading-relaxed">
                  Articles published through this admin panel automatically sync with Google Schema microdata (<code className="text-[11px] bg-white px-1 py-0.5 rounded border">BlogPosting</code> and <code className="text-[11px] bg-white px-1 py-0.5 rounded border">FAQPage</code>). Drafts are preserved securely and hidden from search crawlers until you toggle them to Published.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: ALL BLOGS ================= */}
        {activeTab === "blogs" && (
          <div className="space-y-4">
            {/* Filter Bar */}
            <Card className="p-4 bg-white border-[#E2E8F0] grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="md:col-span-2 relative">
                <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#53637C]" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => {
                    setSearchFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search by title, slug, or target keyword..."
                  className="w-full rounded-lg border border-[#CBD5E1] py-2 pl-9 pr-3 text-xs text-[#0F1E2F] placeholder:text-[#94A3B8] focus:border-[#D4A238] focus:outline-hidden"
                />
              </div>

              <div>
                <select
                  value={categoryFilter}
                  onChange={(e) => {
                    setCategoryFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full rounded-lg border border-[#CBD5E1] py-2 px-3 text-xs text-[#0F1E2F] focus:border-[#D4A238] focus:outline-hidden bg-white"
                >
                  <option value="all">All Categories ({articles.length})</option>
                  {INSIGHTS_CATEGORIES.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={statusFilter}
                  onChange={(e: any) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full rounded-lg border border-[#CBD5E1] py-2 px-3 text-xs text-[#0F1E2F] focus:border-[#D4A238] focus:outline-hidden bg-white"
                >
                  <option value="all">All Statuses ({articles.length})</option>
                  <option value="published">Published ({metrics.published})</option>
                  <option value="draft">Drafts ({metrics.drafts})</option>
                </select>
              </div>
            </Card>

            {/* Articles Table */}
            <Card className="bg-white border-[#E2E8F0] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#EEF4FA] text-[#0F1E2F] font-bold border-b border-[#E2E8F0]">
                    <tr>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Article Title</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Author</th>
                      <th className="p-3.5">Primary Keyword</th>
                      <th className="p-3.5">Updated</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {paginatedArticles.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-10 text-[#53637C]">
                          No articles found matching your criteria.
                        </td>
                      </tr>
                    ) : (
                      paginatedArticles.map((art) => (
                        <tr key={art.slug} className="hover:bg-[#F8FBFF]">
                          <td className="p-3.5">
                            <button
                              onClick={() => handleToggleStatus(art.slug)}
                              title="Click to toggle publish status"
                              className="cursor-pointer"
                            >
                              {art.status === "published" ? (
                                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200">
                                  ● Live Published
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100">
                                  ○ Draft
                                </Badge>
                              )}
                            </button>
                            {art.featured && (
                              <span className="block text-[9px] font-bold text-[#B8860B] uppercase mt-0.5">
                                ★ Featured
                              </span>
                            )}
                          </td>
                          <td className="p-3.5 max-w-xs">
                            <button
                              onClick={() => handleEditBlog(art)}
                              className="font-bold text-[#0F1E2F] hover:text-[#B8860B] text-left transition line-clamp-1 cursor-pointer"
                            >
                              {art.title}
                            </button>
                            <div className="text-[10px] font-mono text-[#53637C] truncate">
                              /insights/{art.slug}
                            </div>
                          </td>
                          <td className="p-3.5 text-[#53637C] whitespace-nowrap">{art.category}</td>
                          <td className="p-3.5 text-[#53637C] whitespace-nowrap">{art.author}</td>
                          <td className="p-3.5">
                            <span className="bg-[#EEF4FA] text-[#0B1F3B] font-mono px-2 py-0.5 rounded text-[11px]">
                              {art.primaryKeyword}
                            </span>
                          </td>
                          <td className="p-3.5 text-[#53637C] whitespace-nowrap">
                            {art.updatedDate || art.publishedDate}
                          </td>
                          <td className="p-3.5 text-right whitespace-nowrap space-x-1">
                            <button
                              onClick={() => handleEditBlog(art)}
                              className="p-1.5 rounded text-[#53637C] hover:text-[#0B1F3B] hover:bg-[#EEF4FA] cursor-pointer"
                              title="Edit Article"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <Link
                              to="/insights/$slug"
                              params={{ slug: art.slug }}
                              target="_blank"
                              className="p-1.5 inline-block rounded text-[#53637C] hover:text-[#B8860B] hover:bg-[#EEF4FA]"
                              title="Live Preview"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                            <button
                              onClick={() => setDeleteTarget(art)}
                              className="p-1.5 rounded text-red-400 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                              title="Delete Article"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="p-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#53637C]">
                  <div>
                    Page {currentPage} of {totalPages} ({filteredArticles.length} total)
                  </div>
                  <div className="flex gap-1">
                    <button
                      disabled={currentPage <= 1}
                      onClick={() => setCurrentPage((p) => p - 1)}
                      className="px-3 py-1 rounded border border-[#CBD5E1] disabled:opacity-50 hover:bg-[#EEF4FA] cursor-pointer"
                    >
                      Previous
                    </button>
                    <button
                      disabled={currentPage >= totalPages}
                      onClick={() => setCurrentPage((p) => p + 1)}
                      className="px-3 py-1 rounded border border-[#CBD5E1] disabled:opacity-50 hover:bg-[#EEF4FA] cursor-pointer"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* ================= TAB 3: BLOG EDITOR ================= */}
        {activeTab === "editor" && (
          <div className="space-y-6">
            {/* Editor Action Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#53637C]">Status:</span>
                <Badge
                  className={
                    editorStatus === "published"
                      ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                      : "bg-amber-50 text-amber-800 border-amber-200"
                  }
                >
                  {editorStatus === "published" ? "● Ready to Publish / Live" : "○ Draft Mode"}
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewMode(!previewMode)}
                  className="rounded-lg border border-[#CBD5E1] bg-white px-3.5 py-2 text-xs font-semibold text-[#0F1E2F] hover:bg-[#EEF4FA] inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye className="h-3.5 w-3.5 text-[#B8860B]" />
                  <span>{previewMode ? "Back to Editor" : "Live Preview"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSaveBlog("draft")}
                  className="rounded-lg border border-[#0B1F3B] bg-white px-3.5 py-2 text-xs font-bold text-[#0B1F3B] hover:bg-[#EEF4FA] inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="h-3.5 w-3.5" />
                  <span>Save Draft</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSaveBlog("published")}
                  className="btn-gold px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider shadow-gold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Publish Article</span>
                </button>
              </div>
            </div>

            {/* Alerts */}
            {saveSuccessMsg && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>{saveSuccessMsg}</span>
              </div>
            )}

            {editorError && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2 animate-in fade-in">
                <AlertTriangle className="h-4 w-4 text-red-600 shrink-0" />
                <span>{editorError}</span>
              </div>
            )}

            {previewMode ? (
              /* LIVE PREVIEW COMPONENT */
              <Card className="p-8 bg-white border-[#E2E8F0] shadow-sm max-w-4xl mx-auto">
                <div className="text-xs font-bold uppercase tracking-wider text-[#B8860B] mb-2">
                  {editorCategory} &bull; {editorReadTime}
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F1E2F] leading-tight mb-4">
                  {editorTitle || "Untitled Article"}
                </h1>
                <p className="text-sm text-[#53637C] leading-relaxed mb-6 font-medium">
                  {editorExcerpt || "Article excerpt will appear here..."}
                </p>
                <div className="border-t border-b border-[#E2E8F0] py-3 text-xs text-[#53637C] flex items-center gap-4 mb-8">
                  <span>Author: {editorAuthor}</span>
                  <span>&bull;</span>
                  <span>Primary Keyword: {editorPrimaryKeyword || "Not specified"}</span>
                </div>

                <div className="space-y-6">
                  {editorBlocks.map((b, i) => (
                    <div key={i}>
                      {b.type === "h2" && (
                        <h2 className="text-2xl font-bold text-[#0F1E2F] mt-8 mb-3">{b.text}</h2>
                      )}
                      {b.type === "h3" && (
                        <h3 className="text-xl font-bold text-[#0F1E2F] mt-6 mb-2">{b.text}</h3>
                      )}
                      {b.type === "p" && (
                        <p className="text-base text-[#2C3E55] leading-relaxed">{b.text}</p>
                      )}
                      {b.type === "list" && (
                        <ul className="space-y-2 pl-4 list-disc text-sm text-[#2C3E55]">
                          {(b.items || []).map((it, idx) => (
                            <li key={idx}>{it}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>

                {editorFaqs.length > 0 && (
                  <div className="mt-10 pt-6 border-t border-[#E2E8F0]">
                    <h3 className="text-lg font-bold text-[#0F1E2F] mb-4">Frequently Asked Questions</h3>
                    <div className="space-y-3">
                      {editorFaqs.map((faq, idx) => (
                        <div key={idx} className="p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FBFF]">
                          <div className="font-bold text-xs text-[#0F1E2F]">{faq.q}</div>
                          <div className="text-xs text-[#53637C] mt-1">{faq.a}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            ) : (
              /* ACTIVE EDITOR FORM */
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left 2 Cols: Main Content Editor */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Basic Content Card */}
                  <Card className="p-6 bg-white border-[#E2E8F0] space-y-4">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F1E2F]">
                      Basic Content
                    </h2>

                    <div>
                      <label className="block text-xs font-bold text-[#0F1E2F]">Blog Article Title *</label>
                      <input
                        type="text"
                        value={editorTitle}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="e.g. When Should an SME Hire a Fractional CFO?"
                        className="mt-1.5 w-full rounded-lg border border-[#CBD5E1] p-3 text-sm font-semibold text-[#0F1E2F] focus:border-[#D4A238] focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0F1E2F]">URL Slug *</label>
                      <div className="mt-1.5 flex items-center rounded-lg border border-[#CBD5E1] bg-[#F8FBFF] px-3">
                        <span className="text-xs text-[#53637C] font-mono">/insights/</span>
                        <input
                          type="text"
                          value={editorSlug}
                          onChange={(e) => setEditorSlug(e.target.value)}
                          placeholder="when-to-hire-fractional-cfo"
                          className="w-full bg-transparent p-2 text-xs font-mono text-[#0F1E2F] focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0F1E2F]">
                        Short Description / Excerpt *
                      </label>
                      <textarea
                        rows={3}
                        value={editorExcerpt}
                        onChange={(e) => setEditorExcerpt(e.target.value)}
                        placeholder="Brief summary explaining what founders and business owners will learn..."
                        className="mt-1.5 w-full rounded-lg border border-[#CBD5E1] p-3 text-xs text-[#0F1E2F] focus:border-[#D4A238] focus:outline-hidden"
                      />
                    </div>
                  </Card>

                  {/* Structured Content Blocks Card */}
                  <Card className="p-6 bg-white border-[#E2E8F0] space-y-4">
                    <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                      <div>
                        <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F1E2F]">
                          Article Content Blocks
                        </h2>
                        <p className="text-xs text-[#53637C]">Add structured headings, paragraphs, lists, and tables.</p>
                      </div>

                      {/* Block Inserter Controls */}
                      <div className="flex flex-wrap gap-1">
                        <button
                          type="button"
                          onClick={() => setEditorBlocks([...editorBlocks, { type: "h2", text: "New Section" }])}
                          className="px-2.5 py-1 rounded bg-[#EEF4FA] text-xs font-semibold text-[#0B1F3B] hover:bg-[#D4A238] hover:text-[#0B1F3B] transition cursor-pointer"
                        >
                          + H2
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditorBlocks([...editorBlocks, { type: "h3", text: "Sub-topic" }])}
                          className="px-2.5 py-1 rounded bg-[#EEF4FA] text-xs font-semibold text-[#0B1F3B] hover:bg-[#D4A238] hover:text-[#0B1F3B] transition cursor-pointer"
                        >
                          + H3
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditorBlocks([...editorBlocks, { type: "p", text: "" }])}
                          className="px-2.5 py-1 rounded bg-[#EEF4FA] text-xs font-semibold text-[#0B1F3B] hover:bg-[#D4A238] hover:text-[#0B1F3B] transition cursor-pointer"
                        >
                          + Paragraph
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditorBlocks([...editorBlocks, { type: "list", items: ["Point 1", "Point 2"] }])}
                          className="px-2.5 py-1 rounded bg-[#EEF4FA] text-xs font-semibold text-[#0B1F3B] hover:bg-[#D4A238] hover:text-[#0B1F3B] transition cursor-pointer"
                        >
                          + Bullet List
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setEditorBlocks([
                              ...editorBlocks,
                              {
                                type: "table",
                                headers: ["Factor", "Fractional Leader", "Full-Time Executive"],
                                rows: [
                                  ["Cost Model", "Agreed Retainer", "Full Payroll & Benefits"],
                                  ["Commitment", "Flexible / Part-Time", "40+ Hours / Week"],
                                ],
                              },
                            ])
                          }
                          className="px-2.5 py-1 rounded bg-[#EEF4FA] text-xs font-semibold text-[#0B1F3B] hover:bg-[#D4A238] hover:text-[#0B1F3B] transition cursor-pointer"
                        >
                          + Table
                        </button>
                      </div>
                    </div>

                    {/* Block Renderers */}
                    <div className="space-y-4">
                      {editorBlocks.map((block, idx) => (
                        <div
                          key={idx}
                          className="rounded-xl border border-[#CBD5E1] bg-[#F8FBFF] p-4 relative group"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#B8860B] bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">
                              Block #{idx + 1}: {block.type.toUpperCase()}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const next = [...editorBlocks];
                                next.splice(idx, 1);
                                setEditorBlocks(next);
                              }}
                              className="text-red-400 hover:text-red-600 p-1 cursor-pointer"
                              title="Delete block"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          {block.type === "h2" && (
                            <input
                              type="text"
                              value={block.text || ""}
                              onChange={(e) => {
                                const next = [...editorBlocks];
                                next[idx] = { ...block, text: e.target.value };
                                setEditorBlocks(next);
                              }}
                              placeholder="H2 Heading Text..."
                              className="w-full font-bold text-sm text-[#0F1E2F] p-2 bg-white rounded border border-[#CBD5E1]"
                            />
                          )}

                          {block.type === "h3" && (
                            <input
                              type="text"
                              value={block.text || ""}
                              onChange={(e) => {
                                const next = [...editorBlocks];
                                next[idx] = { ...block, text: e.target.value };
                                setEditorBlocks(next);
                              }}
                              placeholder="H3 Sub-heading Text..."
                              className="w-full font-semibold text-xs text-[#0F1E2F] p-2 bg-white rounded border border-[#CBD5E1]"
                            />
                          )}

                          {block.type === "p" && (
                            <textarea
                              rows={3}
                              value={block.text || ""}
                              onChange={(e) => {
                                const next = [...editorBlocks];
                                next[idx] = { ...block, text: e.target.value };
                                setEditorBlocks(next);
                              }}
                              placeholder="Paragraph text written in simple English..."
                              className="w-full text-xs text-[#2C3E55] p-2.5 bg-white rounded border border-[#CBD5E1] leading-relaxed"
                            />
                          )}

                          {block.type === "list" && (
                            <div>
                              <textarea
                                rows={3}
                                value={(block.items || []).join("\n")}
                                onChange={(e) => {
                                  const next = [...editorBlocks];
                                  next[idx] = { ...block, items: e.target.value.split("\n") };
                                  setEditorBlocks(next);
                                }}
                                placeholder="Enter each bullet point on a new line..."
                                className="w-full text-xs text-[#2C3E55] p-2 bg-white rounded border border-[#CBD5E1]"
                              />
                              <span className="text-[10px] text-[#53637C]">One bullet point per line</span>
                            </div>
                          )}

                          {block.type === "table" && (
                            <div className="space-y-2 text-xs">
                              <div className="font-semibold text-[11px] text-[#0F1E2F]">Headers (comma separated):</div>
                              <input
                                type="text"
                                value={(block.headers || []).join(", ")}
                                onChange={(e) => {
                                  const next = [...editorBlocks];
                                  next[idx] = {
                                    ...block,
                                    headers: e.target.value.split(",").map((s) => s.trim()),
                                  };
                                  setEditorBlocks(next);
                                }}
                                className="w-full p-2 bg-white rounded border border-[#CBD5E1]"
                              />
                              <div className="font-semibold text-[11px] text-[#0F1E2F]">Rows (one row per line, cells comma-separated):</div>
                              <textarea
                                rows={3}
                                value={(block.rows || []).map((r) => r.join(", ")).join("\n")}
                                onChange={(e) => {
                                  const next = [...editorBlocks];
                                  const parsedRows = e.target.value
                                    .split("\n")
                                    .map((line) => line.split(",").map((s) => s.trim()));
                                  next[idx] = { ...block, rows: parsedRows };
                                  setEditorBlocks(next);
                                }}
                                className="w-full p-2 bg-white rounded border border-[#CBD5E1] font-mono text-[11px]"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* FAQ Builder Card */}
                  <Card className="p-6 bg-white border-[#E2E8F0] space-y-4">
                    <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                      <div>
                        <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F1E2F]">
                          Frequently Asked Questions (FAQ)
                        </h2>
                        <p className="text-xs text-[#53637C]">Generates Google FAQPage Schema automatically.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setEditorFaqs([
                            ...editorFaqs,
                            { q: "New Question?", a: "Clear explanation answer in plain English." },
                          ])
                        }
                        className="btn-gold px-3 py-1 rounded text-xs font-bold"
                      >
                        + Add FAQ
                      </button>
                    </div>

                    <div className="space-y-3">
                      {editorFaqs.map((faq, idx) => (
                        <div key={idx} className="p-3 rounded-lg border border-[#CBD5E1] bg-[#F8FBFF] space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-[11px] font-bold text-[#0F1E2F]">FAQ #{idx + 1}</span>
                            <button
                              type="button"
                              onClick={() => {
                                const next = [...editorFaqs];
                                next.splice(idx, 1);
                                setEditorFaqs(next);
                              }}
                              className="text-red-400 hover:text-red-600 p-1"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <input
                            type="text"
                            value={faq.q}
                            onChange={(e) => {
                              const next = [...editorFaqs];
                              next[idx].q = e.target.value;
                              setEditorFaqs(next);
                            }}
                            placeholder="Question..."
                            className="w-full text-xs font-bold p-2 rounded bg-white border border-[#CBD5E1]"
                          />
                          <textarea
                            rows={2}
                            value={faq.a}
                            onChange={(e) => {
                              const next = [...editorFaqs];
                              next[idx].a = e.target.value;
                              setEditorFaqs(next);
                            }}
                            placeholder="Answer..."
                            className="w-full text-xs p-2 rounded bg-white border border-[#CBD5E1]"
                          />
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Right Col: Categorization, Media & SEO Settings */}
                <div className="space-y-6">
                  {/* Category & Author Settings */}
                  <Card className="p-5 bg-white border-[#E2E8F0] space-y-3.5 text-xs">
                    <h3 className="font-bold text-[#0F1E2F] uppercase tracking-wider text-[11px] border-b pb-2">
                      Categorization &amp; Meta
                    </h3>

                    <div>
                      <label className="font-bold text-[#0F1E2F]">Category *</label>
                      <select
                        value={editorCategory}
                        onChange={(e) => setEditorCategory(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-[#CBD5E1] p-2 text-xs bg-white"
                      >
                        {INSIGHTS_CATEGORIES.map((c) => (
                          <option key={c.slug} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-[#0F1E2F]">Estimated Read Time</label>
                      <input
                        type="text"
                        value={editorReadTime}
                        onChange={(e) => setEditorReadTime(e.target.value)}
                        placeholder="e.g. 7 min read"
                        className="mt-1 w-full rounded-lg border border-[#CBD5E1] p-2"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-[#0F1E2F]">Author Name</label>
                      <input
                        type="text"
                        value={editorAuthor}
                        onChange={(e) => setEditorAuthor(e.target.value)}
                        placeholder="Leena Raval"
                        className="mt-1 w-full rounded-lg border border-[#CBD5E1] p-2"
                      />
                    </div>

                    <div className="pt-2">
                      <label className="flex items-center gap-2 cursor-pointer font-bold text-[#0F1E2F]">
                        <input
                          type="checkbox"
                          checked={editorFeatured}
                          onChange={(e) => setEditorFeatured(e.target.checked)}
                          className="rounded text-[#D4A238]"
                        />
                        <span>Feature on /insights Hero (Top 3)</span>
                      </label>
                    </div>
                  </Card>

                  {/* Featured Image */}
                  <Card className="p-5 bg-white border-[#E2E8F0] space-y-3 text-xs">
                    <h3 className="font-bold text-[#0F1E2F] uppercase tracking-wider text-[11px] border-b pb-2">
                      Featured Image
                    </h3>

                    <div>
                      <label className="font-bold text-[#0F1E2F]">Image URL / Path</label>
                      <input
                        type="text"
                        value={editorImageUrl}
                        onChange={(e) => setEditorImageUrl(e.target.value)}
                        placeholder="/logo.png"
                        className="mt-1 w-full rounded-lg border border-[#CBD5E1] p-2 font-mono text-[11px]"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-[#0F1E2F]">Descriptive Alt Text *</label>
                      <input
                        type="text"
                        value={editorImageAlt}
                        onChange={(e) => setEditorImageAlt(e.target.value)}
                        placeholder="Visual diagram comparing CFO services"
                        className="mt-1 w-full rounded-lg border border-[#CBD5E1] p-2"
                      />
                    </div>

                    {/* Image Preview */}
                    <div className="rounded-lg border border-[#E2E8F0] p-3 bg-[#F8FBFF] flex items-center justify-center min-h-[90px]">
                      <img
                        src={editorImageUrl || "/logo.png"}
                        alt="Preview"
                        className="max-h-16 object-contain"
                        onError={(e) => {
                          (e.target as any).src = "/logo.png";
                        }}
                      />
                    </div>
                  </Card>

                  {/* SEO Settings Card */}
                  <Card className="p-5 bg-white border-[#E2E8F0] space-y-3 text-xs">
                    <h3 className="font-bold text-[#0F1E2F] uppercase tracking-wider text-[11px] border-b pb-2 flex items-center justify-between">
                      <span>SEO &amp; Metadata</span>
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        Google Ready
                      </span>
                    </h3>

                    <div>
                      <div className="flex justify-between">
                        <label className="font-bold text-[#0F1E2F]">Primary Keyword</label>
                      </div>
                      <input
                        type="text"
                        value={editorPrimaryKeyword}
                        onChange={(e) => setEditorPrimaryKeyword(e.target.value)}
                        placeholder="e.g. fractional CFO vs full-time CFO"
                        className="mt-1 w-full rounded-lg border border-[#CBD5E1] p-2 font-mono"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-[#0F1E2F]">Secondary Keywords</label>
                      <input
                        type="text"
                        value={editorSecondaryKeywords}
                        onChange={(e) => setEditorSecondaryKeywords(e.target.value)}
                        placeholder="fractional CFO India, CFO Ahmedabad"
                        className="mt-1 w-full rounded-lg border border-[#CBD5E1] p-2"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between">
                        <label className="font-bold text-[#0F1E2F]">SEO Page Title</label>
                        <span className="text-[10px] text-[#53637C]">{editorSeoTitle.length}/60</span>
                      </div>
                      <input
                        type="text"
                        value={editorSeoTitle}
                        onChange={(e) => setEditorSeoTitle(e.target.value)}
                        placeholder="Title for Google search results"
                        className="mt-1 w-full rounded-lg border border-[#CBD5E1] p-2"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between">
                        <label className="font-bold text-[#0F1E2F]">Meta Description</label>
                        <span className="text-[10px] text-[#53637C]">{editorMetaDesc.length}/160</span>
                      </div>
                      <textarea
                        rows={2}
                        value={editorMetaDesc}
                        onChange={(e) => setEditorMetaDesc(e.target.value)}
                        placeholder="Compelling description under 160 characters..."
                        className="mt-1 w-full rounded-lg border border-[#CBD5E1] p-2"
                      />
                    </div>

                    {/* Google SERP Snippet Preview */}
                    <div className="mt-2 p-3 rounded-lg bg-[#EEF4FA]/60 border border-[#CBD5E1]">
                      <div className="text-[10px] uppercase font-bold text-[#53637C] mb-1">Google Search Preview</div>
                      <div className="text-[12px] font-semibold text-blue-700 truncate">
                        {editorSeoTitle || editorTitle || "Untitled"} | Rise Advisory
                      </div>
                      <div className="text-[10px] text-emerald-800 font-mono truncate">
                        https://ryzeadvisory.co/insights/{editorSlug || "article-slug"}
                      </div>
                      <div className="text-[11px] text-[#53637C] line-clamp-2 mt-0.5">
                        {editorMetaDesc || editorExcerpt || "Explore practical guidance and frameworks from Ryze Advisory."}
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 4: CATEGORIES ================= */}
        {activeTab === "categories" && (
          <div className="space-y-4">
            <Card className="p-6 bg-white border-[#E2E8F0]">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F1E2F] mb-1">
                Insights Categories Overview
              </h2>
              <p className="text-xs text-[#53637C] mb-6">
                All 9 official categories supported on Ryze Advisory public /insights portal.
              </p>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((cat) => (
                  <div key={cat.slug} className="p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FBFF]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0F1E2F]">{cat.name}</span>
                      <Badge variant="outline" className="text-[10px] bg-white">
                        {cat.publishedCount} Live / {cat.totalCount} Total
                      </Badge>
                    </div>
                    <div className="text-[10px] font-mono text-[#53637C] mt-1">/insights?cat={cat.slug}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* ================= TAB 5: MEDIA LIBRARY ================= */}
        {activeTab === "media" && (
          <div className="space-y-4">
            <Card className="p-6 bg-white border-[#E2E8F0]">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F1E2F] mb-1">
                Media Library &amp; Brand Assets
              </h2>
              <p className="text-xs text-[#53637C] mb-6">
                Assets available for use in blog posts, featured banners, and OpenGraph social previews.
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="p-4 rounded-xl border border-[#CBD5E1] bg-white text-center">
                  <div className="h-28 flex items-center justify-center p-2 bg-[#F8FBFF] rounded mb-3">
                    <img src="/logo.png" alt="Ryze Logo" className="max-h-20 object-contain" />
                  </div>
                  <div className="font-bold text-xs text-[#0F1E2F]">Ryze Brand Logo</div>
                  <div className="font-mono text-[10px] text-[#53637C] truncate mt-1">/logo.png</div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ================= TAB 6: SEO SETTINGS ================= */}
        {activeTab === "seo" && (
          <div className="space-y-6">
            {/* IndexNow Instant Indexing Card */}
            <Card className="p-6 bg-white border-[#E2E8F0] space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-[#B8860B]" />
                    <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F1E2F]">
                      IndexNow Instant Search Engine Indexing
                    </h2>
                  </div>
                  <p className="mt-1 text-xs text-[#53637C]">
                    Notify Microsoft Bing, Yandex, Naver, and Seznam instantly whenever pages or blog articles are added, updated, or removed.
                  </p>
                </div>
                <Badge className="bg-emerald-50 text-emerald-800 border-emerald-200">
                  Protocol Active
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[#E2E8F0]">
                <div>
                  <span className="font-bold text-[#0F1E2F] block">Verified Host</span>
                  <span className="font-mono text-[11px] text-[#53637C]">ryzeadvisory.co</span>
                </div>
                <div>
                  <span className="font-bold text-[#0F1E2F] block">Verification Key File</span>
                  <a
                    href="/6c5e23d5a4d98e2abf777b00b5660ac9.txt"
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[11px] text-[#B8860B] hover:underline inline-flex items-center gap-1"
                  >
                    <span>/6c5e23d5a4d98e2abf777b00b5660ac9.txt</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <label className="font-bold text-[#0F1E2F] block">
                  Submit Target URL to IndexNow:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={indexNowUrl}
                    onChange={(e) => setIndexNowUrl(e.target.value)}
                    placeholder="https://ryzeadvisory.co/blog/your-article-slug"
                    className="flex-1 rounded-lg border border-[#CBD5E1] p-2.5 text-xs font-mono bg-white focus:outline-none focus:ring-1 focus:ring-[#B8860B]"
                  />
                  <button
                    type="button"
                    onClick={() => handleIndexNowSubmit(false)}
                    disabled={indexNowSubmitting}
                    className="btn-gold px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-gold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>{indexNowSubmitting ? "Submitting..." : "Submit URL"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleIndexNowSubmit(true)}
                    disabled={indexNowSubmitting}
                    className="rounded-lg border border-[#0B1F3B] bg-[#0B1F3B] text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#132F55] transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <span>Submit Entire Sitemap</span>
                  </button>
                </div>

                {indexNowStatus && (
                  <div
                    className={`p-3.5 rounded-lg text-xs border ${
                      indexNowStatus.type === "success"
                        ? "bg-emerald-50 text-emerald-900 border-emerald-200"
                        : "bg-red-50 text-red-900 border-red-200"
                    }`}
                  >
                    <div className="font-bold flex items-center gap-1.5">
                      {indexNowStatus.type === "success" ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                      )}
                      <span>{indexNowStatus.message}</span>
                    </div>
                    {indexNowStatus.details && (
                      <p className="mt-1 text-[11px] opacity-90 leading-relaxed">
                        {indexNowStatus.details}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-6 bg-white border-[#E2E8F0] space-y-4 text-xs">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F1E2F]">
                Global SEO &amp; Schema Configuration
              </h2>
              <p className="text-xs text-[#53637C]">
                Review the canonical settings and schema markup attached to every published insights article.
              </p>

              <div className="space-y-3 max-w-xl">
                <div>
                  <label className="font-bold text-[#0F1E2F]">Canonical Domain</label>
                  <input
                    type="text"
                    disabled
                    value="https://ryzeadvisory.co"
                    className="mt-1 w-full rounded border border-[#CBD5E1] p-2 bg-[#F8FBFF] font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#0F1E2F]">Default Organization Name</label>
                  <input
                    type="text"
                    disabled
                    value="Rise Advisory"
                    className="mt-1 w-full rounded border border-[#CBD5E1] p-2 bg-[#F8FBFF] text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#0F1E2F]">Active Structured Data Schemas</label>
                  <div className="mt-2 space-y-1 text-xs text-[#53637C]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>schema.org/BlogPosting on all article pages</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>schema.org/FAQPage whenever FAQs are attached</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>schema.org/Person E-E-A-T microdata on author boxes</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ================= TAB 7: ADMIN ACCOUNT ================= */}
        {activeTab === "account" && (
          <div className="space-y-4">
            <Card className="p-6 bg-white border-[#E2E8F0] max-w-xl space-y-4 text-xs">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F1E2F]">
                Administrator Account
              </h2>

              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-[#53637C]">Email:</span>
                  <span className="font-bold text-[#0F1E2F]">{user?.email || "admin@riseadvisory.co"}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-[#53637C]">Role:</span>
                  <span className="font-bold text-emerald-700">Super Administrator</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-[#53637C]">Session Status:</span>
                  <span className="font-bold text-emerald-700">Authenticated (256-bit SSL)</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-[#53637C]">Last Login:</span>
                  <span className="text-[#53637C]">{user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Current session"}</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleLogout}
                  className="rounded-lg bg-red-600 text-white font-bold px-4 py-2 hover:bg-red-700 transition"
                >
                  Sign Out from Administrator Session
                </button>
              </div>
            </Card>
          </div>
        )}
      </main>

      {/* Confirmation Dialog for Permanent Article Deletion */}
      <AlertDialog open={Boolean(deleteTarget)} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent className="bg-white rounded-2xl p-6">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-bold text-[#0F1E2F]">
              Permanently Delete Article?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-[#53637C] mt-2">
              Are you sure you want to delete <span className="font-bold text-[#0F1E2F]">"{deleteTarget?.title}"</span>? This will permanently remove the article from the website catalog and insights listings.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4 gap-2">
            <AlertDialogCancel className="rounded-lg text-xs font-semibold">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="rounded-lg bg-red-600 text-xs font-bold text-white hover:bg-red-700"
            >
              Confirm Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
