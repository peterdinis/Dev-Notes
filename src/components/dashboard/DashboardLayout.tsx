"use client";

import type { FC, ReactNode } from "react";
import { useIsMobile } from "~/hooks/shared/use-mobile";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";

type DashboardLayoutProps = {
	children?: ReactNode;
};

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
	const isMobile = useIsMobile();

	return (
		<SidebarProvider>
			<div className="flex min-h-screen w-full bg-slate-50 dark:bg-slate-950">
				<DashboardSidebar />
				<div className="flex min-w-0 flex-1 flex-col">
					<header className="flex h-14 animate-fade-in-up items-center border-slate-200 border-b bg-white/50 px-4 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50">
						<SidebarTrigger className="text-slate-600 transition-colors duration-200 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200" />
						<div className="ml-4 min-w-0 flex-1">
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
