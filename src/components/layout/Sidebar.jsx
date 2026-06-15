import { NavLink } from "react-router-dom";
import { Rocket, LogOut, Cloud } from "lucide-react";
import { NAV_ITEMS } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/utils";

export function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30">
        <Rocket className="h-5 w-5" />
      </div>
      <div className="leading-tight">
        <p className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
          JobPilot
        </p>
        <p className="text-[11px] text-slate-400">Application Tracker</p>
      </div>
    </div>
  );
}

export function SidebarContent({ onNavigate }) {
  const { currentUser, logOut } = useAuth();

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 shrink-0 items-center px-5">
        <NavLink to="/dashboard" onClick={onNavigate}>
          <Brand />
        </NavLink>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4 scrollbar-thin">
        <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Menu
        </p>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={cn(
                    "h-[18px] w-[18px]",
                    isActive
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                  )}
                />
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-slate-200 p-3 dark:border-slate-800">
        <div className="mb-3 flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 dark:bg-slate-800/60">
          <Cloud className="h-4 w-4 shrink-0 text-emerald-500" />
          <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
            Connected to Firebase
          </span>
        </div>
        <div className="flex items-center gap-3 rounded-lg px-2 py-1.5">
          <Avatar
            name={currentUser?.displayName || currentUser?.email?.split("@")[0] || "User"}
            src={currentUser?.photoURL}
            size="sm"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
              {currentUser?.displayName || currentUser?.email?.split("@")[0] || "User"}
            </p>
            <p className="truncate text-xs text-slate-400">
              {currentUser?.email}
            </p>
          </div>
          <button
            type="button"
            onClick={logOut}
            title="Sign out"
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-rose-600 dark:hover:bg-slate-800"
          >
            <LogOut className="h-[18px] w-[18px]" />
          </button>
        </div>
      </div>
    </div>
  );
}
