import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Logo } from "@/components/site/Logo";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  ShieldCheck,
  ArrowRight,
  Info,
} from "lucide-react";
import {
  loginAdmin,
  requestPasswordReset,
  provisionFirstAdmin,
  getAdminSession,
} from "@/lib/admin-auth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Login | Ryze Advisory Blog CMS" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLoginPage,
});

export function AdminLoginPage() {
  const navigate = useNavigate();

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Forgot password dialog
  const [forgotOpen, setForgotOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState<string | null>(null);
  const [resetError, setResetError] = useState<string | null>(null);

  // First time admin setup modal
  const [setupOpen, setSetupOpen] = useState(false);
  const [setupEmail, setSetupEmail] = useState("");
  const [setupPassword, setSetupPassword] = useState("");
  const [setupKey, setSetupKey] = useState("");
  const [setupLoading, setSetupLoading] = useState(false);
  const [setupSuccess, setSetupSuccess] = useState(false);
  const [setupError, setSetupError] = useState<string | null>(null);

  // Check if already authenticated
  useEffect(() => {
    const session = getAdminSession();
    if (session) {
      navigate({ to: "/admin/dashboard" });
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await loginAdmin(email, password, rememberMe);
      if (res.success) {
        navigate({ to: "/admin/dashboard" });
      } else {
        setError(res.error || "Authentication failed. Please check your credentials.");
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError(null);
    setResetMessage(null);
    setResetLoading(true);

    try {
      const res = await requestPasswordReset(resetEmail);
      if (res.success) {
        setResetMessage(res.message || "Password reset instructions sent.");
      } else {
        setResetError(res.error || "Failed to request password reset.");
      }
    } catch (err: any) {
      setResetError(err?.message || "Unable to send password reset request.");
    } finally {
      setResetLoading(false);
    }
  };

  const handleProvisionSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSetupError(null);
    setSetupLoading(true);

    try {
      const res = await provisionFirstAdmin(setupEmail, setupPassword, setupKey);
      if (res.success) {
        setSetupSuccess(true);
        setEmail(setupEmail);
        setTimeout(() => {
          setSetupOpen(false);
          setSetupSuccess(false);
        }, 2000);
      } else {
        setSetupError(res.error || "Provisioning failed.");
      }
    } catch (err: any) {
      setSetupError(err?.message || "Setup failed.");
    } finally {
      setSetupLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FBFF] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Navy Accents */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#0B1F3B]/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#D4A238]/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Logo imgClassName="h-11 object-contain" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F1E2F] tracking-tight">
          Admin Login
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[#53637C] max-w-sm mx-auto">
          Sign in to manage your website blogs, articles, and SEO content.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-xl shadow-slate-200/50">
          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50/80 p-4 text-xs text-red-800 flex items-start gap-3 animate-in fade-in">
              <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Access Denied: </span>
                {error}
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Address */}
            <div>
              <label
                htmlFor="admin-email"
                className="block text-xs font-bold uppercase tracking-wider text-[#0F1E2F]"
              >
                Email Address
              </label>
              <div className="relative mt-2">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#53637C]" />
                <input
                  id="admin-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@riseadvisory.co"
                  className="w-full rounded-xl border border-[#CBD5E1] bg-white py-2.5 pl-10 pr-4 text-sm text-[#0F1E2F] placeholder:text-[#94A3B8] focus:border-[#D4A238] focus:ring-2 focus:ring-[#D4A238]/20 focus:outline-hidden transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="admin-password"
                  className="block text-xs font-bold uppercase tracking-wider text-[#0F1E2F]"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setResetEmail(email);
                    setForgotOpen(true);
                  }}
                  className="text-xs font-semibold text-[#B8860B] hover:text-[#0B1F3B] transition"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative mt-2">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#53637C]" />
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-[#CBD5E1] bg-white py-2.5 pl-10 pr-11 text-sm text-[#0F1E2F] placeholder:text-[#94A3B8] focus:border-[#D4A238] focus:ring-2 focus:ring-[#D4A238]/20 focus:outline-hidden transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#53637C] hover:text-[#0F1E2F] p-1 cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-[#53637C] cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#CBD5E1] text-[#0B1F3B] focus:ring-[#D4A238]"
                />
                <span>Keep me signed in</span>
              </label>
              <span className="text-[11px] text-[#53637C] flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-emerald-600" />
                256-bit SSL Session
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-gold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 transition"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Admin Panel</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* First Time Setup Helper Section */}
          <div className="mt-8 pt-6 border-t border-[#E2E8F0] text-center">
            <button
              onClick={() => setSetupOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs text-[#53637C] hover:text-[#0F1E2F] transition cursor-pointer"
            >
              <KeyRound className="h-3.5 w-3.5 text-[#B8860B]" />
              <span>First-time administrator setup or account provisioning?</span>
            </button>
          </div>
        </div>

        {/* Return to website */}
        <div className="mt-6 text-center">
          <Link
            to="/insights"
            className="text-xs font-semibold text-[#53637C] hover:text-[#0B1F3B] transition"
          >
            ← Return to Public Insights Page
          </Link>
        </div>
      </div>

      {/* Forgot Password Dialog */}
      <Dialog open={forgotOpen} onOpenChange={setForgotOpen}>
        <DialogContent className="sm:max-w-md bg-white p-6 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-[#0F1E2F]">
              Reset Administrator Password
            </DialogTitle>
            <DialogDescription className="text-xs text-[#53637C] mt-1">
              Enter your registered administrator email address. We will send you secure recovery instructions via Supabase Auth.
            </DialogDescription>
          </DialogHeader>

          {resetMessage ? (
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-xs text-emerald-800 flex items-start gap-2.5 my-3">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>{resetMessage}</div>
            </div>
          ) : (
            <form onSubmit={handleForgotPassword} className="space-y-4 mt-3">
              {resetError && (
                <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-700">
                  {resetError}
                </div>
              )}
              <div>
                <label className="block text-xs font-bold text-[#0F1E2F]">Administrator Email</label>
                <input
                  type="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="admin@riseadvisory.co"
                  className="mt-1.5 w-full rounded-lg border border-[#CBD5E1] p-2.5 text-xs text-[#0F1E2F] focus:border-[#D4A238] focus:outline-hidden"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setForgotOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[#CBD5E1] text-xs font-semibold text-[#53637C] hover:bg-[#EEF4FA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={resetLoading}
                  className="btn-gold px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider"
                >
                  {resetLoading ? "Sending..." : "Send Reset Email"}
                </button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* First-Time Setup Provisioning Dialog */}
      <Dialog open={setupOpen} onOpenChange={setSetupOpen}>
        <DialogContent className="sm:max-w-lg bg-white p-6 rounded-2xl">
          <DialogHeader>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B8860B]">
              <ShieldCheck className="h-4 w-4" /> Secure Admin Provisioning
            </div>
            <DialogTitle className="text-xl font-bold text-[#0F1E2F] mt-1">
              Establish Initial Administrator Account
            </DialogTitle>
            <DialogDescription className="text-xs text-[#53637C] mt-1">
              To prevent unauthorized registration, the first administrator must enter the Supabase Project Setup Authorization Key.
            </DialogDescription>
          </DialogHeader>

          {setupSuccess ? (
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-5 text-center my-4">
              <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-emerald-900">Administrator Account Provisioned!</h3>
              <p className="text-xs text-emerald-700 mt-1">
                You can now log in using your newly established credentials.
              </p>
            </div>
          ) : (
            <form onSubmit={handleProvisionSetup} className="space-y-4 mt-3">
              {setupError && (
                <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-700">
                  {setupError}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#0F1E2F]">Admin Email Address</label>
                <input
                  type="email"
                  required
                  value={setupEmail}
                  onChange={(e) => setSetupEmail(e.target.value)}
                  placeholder="admin@riseadvisory.co"
                  className="mt-1 w-full rounded-lg border border-[#CBD5E1] p-2.5 text-xs text-[#0F1E2F] focus:border-[#D4A238] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F1E2F]">Create Secure Password</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={setupPassword}
                  onChange={(e) => setSetupPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="mt-1 w-full rounded-lg border border-[#CBD5E1] p-2.5 text-xs text-[#0F1E2F] focus:border-[#D4A238] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F1E2F]">
                  Setup Authorization Key / Project ID
                </label>
                <input
                  type="text"
                  required
                  value={setupKey}
                  onChange={(e) => setSetupKey(e.target.value)}
                  placeholder="Enter Supabase Project ID or Admin Key"
                  className="mt-1 w-full rounded-lg border border-[#CBD5E1] p-2.5 text-xs font-mono text-[#0F1E2F] focus:border-[#D4A238] focus:outline-hidden"
                />
                <p className="mt-1 text-[11px] text-[#53637C] flex items-center gap-1">
                  <Info className="h-3 w-3 text-[#B8860B]" />
                  Your connected project ID is listed in <code className="bg-[#EEF4FA] px-1 py-0.5 rounded font-mono">.env</code> (naazhbadfhiacemiyjcg).
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={() => setSetupOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[#CBD5E1] text-xs font-semibold text-[#53637C] hover:bg-[#EEF4FA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={setupLoading}
                  className="btn-gold px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider"
                >
                  {setupLoading ? "Provisioning..." : "Provision Admin Account"}
                </button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
