import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("Dashboard");

  // Check whether the user is logged in
  const storedUser = localStorage.getItem("nexaflowUser");

  if (!storedUser) {
    return <Navigate to="/" replace />;
  }

  // Get the logged-in user's information
  let user = {};

  try {
    user = JSON.parse(storedUser);
  } catch {
    localStorage.removeItem("nexaflowUser");
    return <Navigate to="/" replace />;
  }

  // Support common user object properties
  const email = user.email || "user@example.com";
  const name =
    user.name ||
    user.fullName ||
    email.split("@")[0];

  const avatar = name.charAt(0).toUpperCase();

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("nexaflowUser");
    navigate("/", { replace: true });
  };

  const menuItems = [
    { name: "Dashboard", icon: "▦" },
    { name: "Overview", icon: "◫" },
    { name: "Activity", icon: "↗" },
    { name: "Settings", icon: "⚙" },
  ];

  const activities = [
    {
      title: "Account created",
      description: "Your NexaFlow account is ready.",
      time: "Recently",
    },
    {
      title: "Login successful",
      description: "You signed in to your account.",
      time: "Recently",
    },
    {
      title: "Dashboard opened",
      description: "You visited your dashboard.",
      time: "Recently",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 md:flex">
      {/* Sidebar */}
      <aside className="flex w-full flex-col bg-slate-950 text-white md:min-h-screen md:w-64 md:shrink-0">
        <div className="flex items-center gap-3 border-b border-white/10 px-6 py-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold">
            N
          </div>

          <div>
            <h1 className="text-lg font-bold">NexaFlow</h1>
            <p className="text-xs text-slate-400">Workspace</p>
          </div>
        </div>

        <nav className="flex gap-2 overflow-x-auto p-4 md:flex-1 md:flex-col">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActivePage(item.name)}
              className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left transition ${
                activePage === item.name
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium">{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="hidden border-t border-white/10 p-4 md:block">
          <div className="mb-4 flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 font-bold">
              {avatar}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{name}</p>
              <p className="truncate text-xs text-slate-400">{email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-red-500/10 hover:text-red-400"
          >
            ↪ Log out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="min-w-0 flex-1 p-5 sm:p-8 lg:p-10">
        {/* Header */}
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-medium text-blue-600">
              YOUR WORKSPACE
            </p>

            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {activePage === "Dashboard"
                ? `Welcome back, ${name}!`
                : activePage}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {activePage === "Dashboard"
                ? "Here's what's happening in your workspace."
                : `Manage your ${activePage.toLowerCase()} information.`}
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
              {avatar}
            </div>

            <div className="max-w-40">
              <p className="truncate text-sm font-semibold">{name}</p>
              <p className="truncate text-xs text-slate-500">{email}</p>
            </div>
          </div>
        </header>

        {/* Dashboard page */}
        {activePage === "Dashboard" && (
          <>
            <section className="mb-8 rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-600 p-6 text-white shadow-lg sm:p-8">
              <p className="mb-3 text-sm text-blue-100">
                YOUR JOURNEY STARTS HERE
              </p>

              <h3 className="mb-3 text-2xl font-bold sm:text-3xl">
                Welcome to NexaFlow
              </h3>

              <p className="max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
                Your workspace is ready. Explore your dashboard and manage
                your account from one simple place.
              </p>

              <button
                onClick={() => setActivePage("Overview")}
                className="mt-6 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
              >
                Explore workspace →
              </button>
            </section>

            {/* Overview cards */}
            <section className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl text-blue-700">
                  ◉
                </div>

                <p className="text-sm text-slate-500">Account Status</p>
                <h3 className="mt-2 text-2xl font-bold">Active</h3>
                <p className="mt-2 text-xs text-emerald-600">
                  ✓ Your account is ready
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-xl text-purple-700">
                  ▦
                </div>

                <p className="text-sm text-slate-500">Workspace</p>
                <h3 className="mt-2 text-2xl font-bold">NexaFlow</h3>
                <p className="mt-2 text-xs text-slate-500">
                  Your personal workspace
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:col-span-2 xl:col-span-1">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-xl text-amber-700">
                  ↗
                </div>

                <p className="text-sm text-slate-500">Recent Activity</p>
                <h3 className="mt-2 text-2xl font-bold">3 Events</h3>
                <p className="mt-2 text-xs text-slate-500">
                  Sample activity information
                </p>
              </div>
            </section>

            {/* Recent activity */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold">Recent Activity</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Your latest workspace events
                  </p>
                </div>

                <button
                  onClick={() => setActivePage("Activity")}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                >
                  View all →
                </button>
              </div>

              <div className="space-y-6">
                {activities.map((activity, index) => (
                  <div key={activity.title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 font-bold text-blue-600">
                      {index + 1}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap justify-between gap-2">
                        <h4 className="text-sm font-semibold">
                          {activity.title}
                        </h4>

                        <span className="text-xs text-slate-400">
                          {activity.time}
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-slate-500">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Overview page */}
        {activePage === "Overview" && (
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="text-xl font-bold">Workspace Overview</h3>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Welcome to your NexaFlow workspace, {name}. Your account is
              active, and you can explore the available dashboard sections.
            </p>

            <div className="mt-6 rounded-xl bg-blue-50 p-5">
              <p className="text-sm font-semibold text-blue-800">
                Account email
              </p>
              <p className="mt-2 break-all text-sm text-blue-700">{email}</p>
            </div>
          </section>
        )}

        {/* Activity page */}
        {activePage === "Activity" && (
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="mb-6 text-xl font-bold">Activity History</h3>

            <div className="space-y-5">
              {activities.map((activity) => (
                <div
                  key={activity.title}
                  className="rounded-xl border border-slate-100 p-4"
                >
                  <h4 className="font-semibold">{activity.title}</h4>
                  <p className="mt-1 text-sm text-slate-500">
                    {activity.description}
                  </p>
                  <p className="mt-2 text-xs text-slate-400">
                    {activity.time}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Settings page */}
        {activePage === "Settings" && (
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="text-xl font-bold">Account Settings</h3>

            <p className="mt-2 text-sm text-slate-500">
              Your account information.
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Name</p>
                <p className="mt-1 font-medium">{name}</p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Email</p>
                <p className="mt-1 break-all font-medium">{email}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="mt-6 rounded-xl bg-red-50 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
            >
              Log out
            </button>
          </section>
        )}

        {/* Footer */}
        <footer className="mt-10 border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} NexaFlow. All rights reserved.
        </footer>
      </main>
    </div>
  );
}

export default Dashboard;