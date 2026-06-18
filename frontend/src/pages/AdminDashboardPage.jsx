import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUsers,
  FiLink,
  FiMousePointer,
  FiActivity,
  FiSearch,
  FiShield,
  FiTrendingUp,
  FiExternalLink,
  FiCalendar,
  FiGrid,
} from "react-icons/fi";
import { adminAPI } from "../api";
import { toast } from "react-hot-toast";

/* ─── tiny helpers ───────────────────────────────────────────── */
const fmt = (n) => (n >= 1000 ? (n / 1000).toFixed(1) + "k" : n);

const Badge = ({ children, color = "indigo" }) => {
  const map = {
    indigo: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    emerald: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    amber:   "bg-amber-500/20  text-amber-300  border-amber-500/30",
    rose:    "bg-rose-500/20   text-rose-300   border-rose-500/30",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${map[color]}`}
    >
      {children}
    </span>
  );
};

/* ─── Stat Card ──────────────────────────────────────────────── */
const StatCard = ({ title, value, icon: Icon, gradient, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 group hover:bg-white/8 transition-all duration-300"
  >
    {/* glow blob */}
    <div
      className={`absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20 blur-2xl ${gradient}`}
    />
    <div className="relative z-10">
      <p className="text-sm font-medium text-slate-400 mb-3">{title}</p>
      <p className="text-4xl font-extrabold text-white tracking-tight">{fmt(value)}</p>
    </div>
    <div
      className={`absolute bottom-4 right-4 p-3 rounded-xl ${gradient} opacity-80 group-hover:opacity-100 transition-opacity`}
    >
      <Icon className="w-5 h-5 text-white" />
    </div>
  </motion.div>
);

/* ─── Tab Button ─────────────────────────────────────────────── */
const Tab = ({ label, icon: Icon, active, onClick }) => (
  <button
    onClick={onClick}
    className={`relative flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-200 ${
      active
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
        : "text-slate-400 hover:text-white hover:bg-white/10"
    }`}
  >
    <Icon className="w-4 h-4" />
    {label}
  </button>
);

/* ─── Search Bar ─────────────────────────────────────────────── */
const SearchBar = ({ value, onChange, placeholder }) => (
  <div className="relative w-full max-w-xs">
    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/10 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
    />
  </div>
);

/* ─── Users Table ────────────────────────────────────────────── */
const UsersTable = ({ users, search }) => {
  const filtered = users.filter(
    (u) =>
      u.userName?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/5">
            <th className="text-left px-5 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">User</th>
            <th className="text-left px-5 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</th>
            <th className="text-left px-5 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">URLs</th>
            <th className="text-left px-5 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Joined</th>
            <th className="text-left px-5 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-16 text-center text-slate-500">
                No users found.
              </td>
            </tr>
          ) : (
            filtered.map((user, i) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="hover:bg-white/5 transition-colors group"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {user.userName?.[0]?.toUpperCase() ?? "?"}
                    </div>
                    <span className="font-medium text-white">{user.userName}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-slate-400">{user.email}</td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center gap-1 text-indigo-400 font-medium">
                    <FiLink className="w-3.5 h-3.5" />
                    {user.urlCount ?? 0}
                  </span>
                </td>
                <td className="px-5 py-4 text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <FiCalendar className="w-3.5 h-3.5" />
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <Badge color="emerald">Active</Badge>
                </td>
              </motion.tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

/* ─── URLs Table ─────────────────────────────────────────────── */
const UrlsTable = ({ urls, search }) => {
  const filtered = urls.filter(
    (u) =>
      u.shortId?.toLowerCase().includes(search.toLowerCase()) ||
      u.originalUrl?.toLowerCase().includes(search.toLowerCase()) ||
      u.user?.userName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/5">
            <th className="text-left px-5 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Short ID</th>
            <th className="text-left px-5 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Original URL</th>
            <th className="text-left px-5 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Clicks</th>
            <th className="text-left px-5 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Creator</th>
            <th className="text-left px-5 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Created</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-16 text-center text-slate-500">
                No URLs found.
              </td>
            </tr>
          ) : (
            filtered.map((url, i) => (
              <motion.tr
                key={url.shortId}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="hover:bg-white/5 transition-colors group"
              >
                <td className="px-5 py-4">
                  <span className="font-mono font-semibold text-indigo-400">
                    {url.shortId}
                  </span>
                </td>
                <td className="px-5 py-4 max-w-xs">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-slate-400">{url.originalUrl}</span>
                    <a
                      href={url.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                    >
                      <FiExternalLink className="w-3.5 h-3.5 text-slate-500 hover:text-indigo-400" />
                    </a>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                        style={{
                          width: `${Math.min(100, (url.clicks / 20) * 100)}%`,
                        }}
                      />
                    </div>
                    <span className="text-white font-medium">{url.clicks ?? 0}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-pink-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {url.user?.userName?.[0]?.toUpperCase() ?? "?"}
                    </div>
                    <span className="text-slate-400">{url.user?.userName ?? "Unknown"}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <FiCalendar className="w-3.5 h-3.5" />
                    {new Date(url.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </td>
              </motion.tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

/* ─── Overview Panel ─────────────────────────────────────────── */
const Overview = ({ users, urls }) => {
  const totalClicks = urls.reduce((s, u) => s + (u.clicks ?? 0), 0);
  const topUrls = [...urls].sort((a, b) => (b.clicks ?? 0) - (a.clicks ?? 0)).slice(0, 5);
  const maxClicks = topUrls[0]?.clicks || 1;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Top URLs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6"
      >
        <h3 className="text-base font-semibold text-white mb-5 flex items-center gap-2">
          <FiTrendingUp className="text-indigo-400" /> Top Performing URLs
        </h3>
        <div className="space-y-4">
          {topUrls.map((url, i) => (
            <div key={url.shortId} className="flex items-center gap-4">
              <span className="text-xs font-bold text-slate-500 w-5 text-right">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-indigo-400 text-sm font-semibold">{url.shortId}</span>
                  <span className="text-white text-sm font-medium">{url.clicks} clicks</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(url.clicks / maxClicks) * 100}%` }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  />
                </div>
              </div>
            </div>
          ))}
          {topUrls.length === 0 && (
            <p className="text-slate-500 text-sm text-center py-8">No URL data available.</p>
          )}
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.08 }}
        className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6"
      >
        <h3 className="text-base font-semibold text-white mb-5 flex items-center gap-2">
          <FiActivity className="text-emerald-400" /> Platform Health
        </h3>
        <div className="space-y-5">
          {[
            { label: "Total Users", value: users.length, max: 100, color: "from-blue-500 to-cyan-500" },
            { label: "Total URLs", value: urls.length, max: 200, color: "from-indigo-500 to-purple-500" },
            { label: "Total Clicks", value: totalClicks, max: 500, color: "from-violet-500 to-pink-500" },
            { label: "Avg Clicks / URL", value: urls.length ? +(totalClicks / urls.length).toFixed(1) : 0, max: 20, color: "from-amber-500 to-orange-500" },
          ].map(({ label, value, max, color }) => (
            <div key={label}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-slate-400">{label}</span>
                <span className="text-white font-semibold">{value}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (value / max) * 100)}%` }}
                  transition={{ duration: 0.6 }}
                  className={`h-full rounded-full bg-gradient-to-r ${color}`}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-5 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <FiShield className="text-emerald-400 w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">All systems operational</p>
              <p className="text-xs text-slate-500">No issues detected</p>
            </div>
            <Badge color="emerald">Healthy</Badge>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* ─── Main Page ──────────────────────────────────────────────── */
const AdminDashboardPage = () => {
  const [users, setUsers]         = useState([]);
  const [urls, setUrls]           = useState([]);
  const [loading, setLoading]     = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [search, setSearch]       = useState("");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [usersRes, urlsRes] = await Promise.all([
          adminAPI.getUsers(),
          adminAPI.getUrls(),
        ]);
        setUsers(usersRes.data.data || []);
        setUrls(urlsRes.data.data || []);
      } catch (error) {
        toast.error("Failed to fetch admin data.");
        console.error("Admin fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  /* ── tabs config ── */
  const tabs = [
    { id: "overview", label: "Overview",   icon: FiGrid    },
    { id: "users",    label: "Users",      icon: FiUsers   },
    { id: "urls",     label: "URLs",       icon: FiLink    },
  ];

  /* ── stats config ── */
  const stats = [
    { title: "Total Users",  value: users.length,                                      icon: FiUsers,        gradient: "bg-gradient-to-br from-blue-500 to-cyan-500",    delay: 0    },
    { title: "Total URLs",   value: urls.length,                                        icon: FiLink,         gradient: "bg-gradient-to-br from-indigo-500 to-purple-500", delay: 0.08 },
    { title: "Total Clicks", value: urls.reduce((s, u) => s + (u.clicks ?? 0), 0),     icon: FiMousePointer, gradient: "bg-gradient-to-br from-violet-500 to-pink-500",   delay: 0.16 },
    { title: "System Health",value: loading ? "—" : "Optimal",                          icon: FiActivity,     gradient: "bg-gradient-to-br from-emerald-500 to-teal-500",  delay: 0.24 },
  ];

  /* ─── Loading skeleton ── */
  if (loading) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ background: "linear-gradient(135deg,#0f0c29,#302b63,#24243e)" }}
      >
        <div className="text-center space-y-4">
          <div className="relative mx-auto w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-500/30" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 animate-spin" />
          </div>
          <p className="text-slate-400 text-sm">Loading admin data…</p>
        </div>
      </div>
    );
  }

  return (
    /*
     * Full-bleed dark wrapper that escapes the Layout's light bg.
     * Negative margin + padding trick so it fills edge-to-edge behind
     * the Layout's max-w-7xl content column without overflowing horizontally.
     */
    <div
      className="-mx-4 sm:-mx-6 lg:-mx-8 -my-8 min-h-[calc(100vh-4rem)]"
      style={{ background: "linear-gradient(160deg,#0d0d1a 0%,#131130 50%,#0d1117 100%)" }}
    >
      {/* subtle star-dust overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(99,102,241,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(139,92,246,0.1) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* ── Page Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-indigo-600/20 border border-indigo-500/30">
                <FiShield className="w-5 h-5 text-indigo-400" />
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                Admin Dashboard
              </h1>
            </div>
            <p className="text-slate-400 ml-[52px]">
              Manage platform users and monitor system analytics
            </p>
          </div>

          {/* Live indicator */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 self-start sm:self-auto">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-xs text-emerald-400 font-medium">Live</span>
          </div>
        </motion.div>

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <StatCard key={s.title} {...s} />
          ))}
        </div>

        {/* ── Tab Bar ── */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-2 p-1 rounded-full bg-white/5 border border-white/10">
            {tabs.map((t) => (
              <Tab
                key={t.id}
                label={t.label}
                icon={t.icon}
                active={activeTab === t.id}
                onClick={() => { setActiveTab(t.id); setSearch(""); }}
              />
            ))}
          </div>

          {/* Search — only shown for tables */}
          {activeTab !== "overview" && (
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder={activeTab === "users" ? "Search users…" : "Search URLs…"}
            />
          )}
        </div>

        {/* ── Tab Content ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "overview" && <Overview users={users} urls={urls} />}
            {activeTab === "users"    && <UsersTable users={users} search={search} />}
            {activeTab === "urls"     && <UrlsTable  urls={urls}   search={search} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
