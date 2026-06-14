import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  Plus,
  Moon,
  Sun,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { useAddJobModal } from "@/hooks/useAddJobModal";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

function MenuItem({ icon: Icon, children, onClick, tone }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors",
        tone === "danger"
          ? "text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10"
          : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
      )}
    >
      <Icon className="h-4 w-4" />
      {children}
    </button>
  );
}

export function Topbar({ onMenuClick }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { currentUser, logOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { openAddJobModal } = useAddJobModal();
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef(null);

  const active = NAV_ITEMS.find((n) => n.to === pathname);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/80 px-4 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80 sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>
      <h1 className="text-lg font-semibold text-slate-900 dark:text-white">
        {active?.label || "JobPilot"}
      </h1>

      <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
        <Button size="sm" onClick={openAddJobModal} className="hidden sm:inline-flex">
          <Plus className="h-4 w-4" />
          Add application
        </Button>
        <button
          type="button"
          onClick={openAddJobModal}
          className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 sm:hidden"
          aria-label="Add application"
        >
          <Plus className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>

        <div className="relative" ref={ref}>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="rounded-full p-0.5 ring-2 ring-transparent transition-all hover:ring-slate-200 dark:hover:ring-slate-700"
            aria-label="Account menu"
          >
            <Avatar
              name={currentUser?.displayName || currentUser?.email?.split("@")[0] || "User"}
              src={currentUser?.photoURL}
              size="sm"
            />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl animate-scale-in dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-3 rounded-lg px-2.5 py-2">
                <Avatar
                  name={currentUser?.displayName || currentUser?.email?.split("@")[0] || "User"}
                  src={currentUser?.photoURL}
                  size="sm"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                    {currentUser?.displayName || currentUser?.email?.split("@")[0] || "User"}
                  </p>
                  <p className="truncate text-xs text-slate-400">
                    {currentUser?.email}
                  </p>
                </div>
              </div>
              <div className="my-1 h-px bg-slate-200 dark:bg-slate-800" />
              <MenuItem
                icon={User}
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/profile");
                }}
              >
                Profile
              </MenuItem>
              <MenuItem
                icon={Settings}
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/settings");
                }}
              >
                Settings
              </MenuItem>
              <div className="my-1 h-px bg-slate-200 dark:bg-slate-800" />
              <MenuItem
                icon={LogOut}
                tone="danger"
                onClick={() => {
                  setMenuOpen(false);
                  logOut();
                }}
              >
                Sign out
              </MenuItem>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
