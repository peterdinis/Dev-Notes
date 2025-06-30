"use client";

import type { FC, ReactNode } from "react";
import { useIsMobile } from "~/hooks/use-mobile";
import DashboardSidebar from "../dashboard/DashboardSidebar";

type DashboardLayoutProps = {
	children?: ReactNode;
};

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
	const isMobile = useIsMobile();

	return (
		<div className="flex min-h-screen w-full bg-slate-50 dark:bg-slate-950">
			<DashboardSidebar />
			<div className="flex min-w-0 flex-1 flex-col">
				<header className="flex h-14 animate-fade-in-up items-center border-slate-200 border-b bg-white/50 px-4 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50">
					<div className="ml-4 min-w-0 flex-1">
						<h1
							className={`font-semibold text-slate-900 dark:text-slate-200 ${isMobile ? "text-lg" : "text-xl"} truncate`}
						>
							DevNotes
						</h1>
					</div>
				</header>
				<main className="flex-1 overflow-auto">{children}</main>
			</div>
		</div>
	);
};

export default DashboardLayout;
