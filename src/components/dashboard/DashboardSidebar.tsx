"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, FileText, MessageSquare, Network, Folder,
  Settings, Users, Bell, Calendar, Menu, X,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { useIsMobile } from "~/hooks/use-mobile";
import type { FC } from "react";

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Notes", url: "/notes", icon: FileText },
  { title: "AI Assistant", url: "/ai-chat", icon: MessageSquare },
  { title: "UML Diagrams", url: "/diagrams", icon: Network },
  { title: "Whiteboard", url: "/whiteboard", icon: Folder },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Workspace", url: "/workspace", icon: Users },
  { title: "Notifications", url: "/notifications", icon: Bell, badge: 3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

const DashboardSidebar: FC = () => {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(!isMobile); // auto-open on desktop, close on mobile
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false); // close sidebar on route change (mobile)
    }
  }, [pathname, isMobile]);

  const isActive = (path: string) => {
    return path === "/app"
      ? pathname === "/app"
      : pathname.startsWith(path);
  };

  return (
    <>
      {/* Hamburger button (mobile only) */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(prev => !prev)}
          className="fixed top-4 left-4 z-50 p-2 bg-white dark:bg-slate-800 rounded-md shadow-md md:hidden"
          aria-label="Toggle Sidebar"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      )}

      {/* Overlay when sidebar is open on mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-40 transition-transform duration-300 transform bg-white/50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 w-64
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo / Brand */}
        <div className="p-4 flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
            <Folder className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-slate-900 dark:text-slate-200 text-lg">DevNotes</span>
        </div>

        {/* Nav Items */}
        <div className="mt-4">
          <nav className="mt-2 space-y-1">
            {navigationItems.map((item) => {
              const active = isActive(item.url);
              return (
                <Link
                  key={item.title}
                  href={item.url}
                  className={`flex items-center gap-3 px-4 py-2 mx-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-r-2 border-emerald-500"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="flex-1 truncate">{item.title}</span>
                  {item.badge && (
                    <Badge
                      variant="secondary"
                      className="ml-auto bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
