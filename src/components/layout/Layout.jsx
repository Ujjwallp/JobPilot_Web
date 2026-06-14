import { useState } from "react";
import { Outlet } from "react-router-dom";
import { createPortal } from "react-dom";
import { SidebarContent } from "./Sidebar";
import { Topbar } from "./Topbar";
import { AddJobModalProvider } from "@/context/AddJobModalContext";

/**
 * Mobile navigation drawer.
 *
 * IMPORTANT: this only renders when `open` is true. Previously it rendered
 * unconditionally (with only a `lg:hidden` to hide it), which left a
 * full-screen z-50 overlay permanently covering the app on any viewport
 * narrower than `lg` (1024px) — swallowing every click, including the
 * "Add application" buttons.
 */
function MobileSidebar({ open, onClose }) {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className="absolute inset-y-0 left-0 w-72 border-r border-slate-200 bg-white shadow-2xl animate-slide-in-left dark:border-slate-800 dark:bg-slate-900">
        <SidebarContent onNavigate={onClose} />
      </aside>
    </div>,
    document.body
  );
}

export function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <AddJobModalProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Desktop sidebar */}
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 lg:block">
          <SidebarContent />
        </aside>

        <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />

        <div className="lg:pl-64">
          <Topbar onMenuClick={() => setMobileOpen(true)} />
          <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <Outlet />
          </main>
        </div>
      </div>
    </AddJobModalProvider>
  );
}
