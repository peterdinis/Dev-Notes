"use client";

import type { FC, ReactNode } from "react";
import { useIsMobile } from "~/hooks/use-mobile";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";

type DashboardLayoutProps = {
  children?: ReactNode;
};

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50 dark:bg-slate-950">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm flex items-center px-4 animate-fade-in-up">
            <SidebarTrigger className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors duration-200" />
            <div className="ml-4 flex-1 min-w-0">
              <h1
                className={`font-semibold text-slate-900 dark:text-slate-200 ${
                  isMobile ? "text-lg" : "text-xl"
                } truncate`}
              >
                DevNotes
              </h1>
            </div>
          </header>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
