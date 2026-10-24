import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const API_URL = "https://nexaflow-login-page-1.onrender.com";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    const normalizedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!normalizedEmail || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!emailRegex.test(normalizedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/api/login`,
        {
          email: normalizedEmail,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 30000,
        }
      );

      if (response.data.success) {
        localStorage.setItem(
          "nexaflowUser",
          JSON.stringify(response.data.user)
        );

        setSuccess("Login successful! Welcome back to NexaFlow.");

        // Show the success message before opening the dashboard.
        setTimeout(() => {
          navigate("/dashboard");
        }, 1200);
      } else {
        setError(response.data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        setError(error.response.data?.message || "Unable to log in.");
      } else if (error.code === "ECONNABORTED") {
        setError("The server took too long to respond. Please try again.");
      } else if (error.request) {
        setError("Unable to connect to the server. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden bg-slate-100 px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl animate-[fadeIn_0.7s_ease-out] md:grid-cols-2">

        {/* Left panel */}
        <div className="hidden flex-col justify-between bg-gradient-to-br from-blue-700 via-indigo-700 to-violet-800 p-12 text-white md:flex">
          <div className="animate-[slideDown_0.8s_ease-out]">
            <div className="mb-16 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 text-2xl font-bold transition duration-300 hover:rotate-6 hover:scale-110">
                N
              </div>
              <h1 className="text-2xl font-bold">NexaFlow</h1>
            </div>

            <h2 className="text-4xl font-bold leading-tight">
              Your work.
              <br />
              Your goals.
              <br />
              One workspace.
            </h2>

            <p className="mt-6 leading-7 text-blue-100">
              Sign in to continue your journey and manage everything
              in one simple place.
            </p>
          </div>

          <p className="text-sm text-blue-200">
            © 2026 NexaFlow. Built for better work.
          </p>
        </div>

        {/* Right panel */}
        <div className="flex flex-col justify-center p-6 sm:p-10 md:p-12 animate-[slideUp_0.8s_ease-out]">
          <div className="mb-8 md:hidden">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
                N
              </div>
              <h1 className="text-2xl font-bold text-slate-900">
                NexaFlow
              </h1>
            </div>
          </div>

          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
              Welcome back
            </p>

            <h2 className="text-3xl font-bold text-slate-900">
              Sign in to your account
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Enter your details below to access your workspace.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="mb-5">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                  setSuccess("");
                }}
                autoComplete="email"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition duration-300 placeholder:text-slate-400 focus:-translate-y-0.5 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Password */}
            <div className="mb-5">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError("");
                    setSuccess("");
                  }}
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-20 outline-none transition duration-300 placeholder:text-slate-400 focus:-translate-y-0.5 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-blue-600 transition hover:text-blue-800"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <p className="mt-2 text-xs text-slate-500">
                Use the password you created during signup.
              </p>
            </div>

            {/* Error message */}
            {error && (
              <div
                role="alert"
                className="mb-5 animate-[fadeIn_0.3s_ease-out] rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            {/* Success message */}
            {success && (
              <div
                role="status"
                aria-live="polite"
                className="mb-5 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 animate-[fadeIn_0.4s_ease-out]"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-base">
                  ✓
                </span>
                <span>{success}</span>
              </div>
            )}

            {/* Login button */}
            <button
              type="submit"
              disabled={loading || Boolean(success)}
              className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Signing in..."
                : success
                  ? "Login successful ✓"
                  : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-blue-600 transition hover:text-blue-800 hover:underline"
            >
              Sign up
            </Link>
          </p>

          <p className="mt-4 text-center text-sm text-slate-500">
            Secure access to your personal workspace.
          </p>
        </div>
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Login;