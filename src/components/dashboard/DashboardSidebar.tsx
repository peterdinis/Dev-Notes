"use client";

import {
	Bell,
	Calendar,
	FileText,
	Folder,
	Home,
	Menu,
	MessageSquare,
	Network,
	Settings,
	Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FC } from "react";
import { useIsMobile } from "~/hooks/use-mobile";
import { Badge } from "../ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

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

	const isActive = (path: string) => {
		return path === "/app" ? pathname === "/app" : pathname.startsWith(path);
	};

	const SidebarContent = (
		<div className="w-64">
			{/* Logo / Brand */}
			<div className="flex items-center gap-2 p-4">
				<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-600 to-blue-600 shadow-sm">
					<Folder className="h-4 w-4 text-white" />
				</div>
				<span className="font-bold text-lg text-slate-900 dark:text-slate-200">
					DevNotes
				</span>
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
								className={`mx-2 flex items-center gap-3 rounded-md px-4 py-2 font-medium text-sm transition-all duration-200 ${
									active
										? "border-emerald-500 border-r-2 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300"
										: "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200"
								}`}
							>
								<item.icon className="h-5 w-5" />
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
		</div>
	);

	if (isMobile) {
		return (
			<Sheet>
				<SheetTrigger asChild>
					<button
						className="fixed top-4 left-4 z-50 rounded-md bg-white p-2 shadow-md dark:bg-slate-800 md:hidden"
						aria-label="Toggle Sidebar"
					>
						<Menu className="h-5 w-5" />
					</button>
				</SheetTrigger>
				<SheetContent side="left" className="p-0">
					{SidebarContent}
				</SheetContent>
			</Sheet>
		);
	}

	// Desktop sidebar
	return (
		<aside className="fixed top-0 left-0 z-40 h-full w-64 border-r border-slate-200 bg-white/50 dark:border-slate-800 dark:bg-slate-900">
			{SidebarContent}
		</aside>
	);
};

export default DashboardSidebar;
