"use client";

import {
	Bell,
	Calendar,
	FileText,
	Folder,
	Home,
	MessageSquare,
	Network,
	Settings,
	Users,
} from "lucide-react";
import Link from "next/link";
import type { FC } from "react";
import { useIsMobile } from "~/hooks/use-mobile";
import { Badge } from "../ui/badge";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarSeparator,
	useSidebar,
} from "../ui/sidebar";

const navigationItems = [
	{ title: "Dashboard", url: "/dashboard", icon: Home },
	{ title: "Notes", url: "/notes", icon: FileText },
	{ title: "AI Assistant", url: "/ai-chat", icon: MessageSquare },
	{ title: "UML Diagrams", url: "/uml", icon: Network },
	{ title: "Whiteboard", url: "/whiteboard", icon: Folder },
	{ title: "Calendar", url: "/calendar", icon: Calendar },
	{ title: "Workspace", url: "/workspace", icon: Users },
	{
		title: "Notifications",
		url: "/notifications",
		icon: Bell,
		badge: 3,
	},
	{ title: "Settings", url: "/settings", icon: Settings },
];

const DashboardSidebar: FC = () => {
	const { state } = useSidebar();
	const isMobile = useIsMobile();
	const isCollapsed = state === "collapsed";

	const getNavClasses = (path: string) => {
		return `transition-all duration-200 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50`;
	};

	return (
		<Sidebar
			className={`border-slate-200 border-r bg-white/50 dark:border-slate-800 dark:bg-slate-900 ${
				isCollapsed ? "w-16" : isMobile ? "w-64" : "w-64"
			} animate-slide-in-left overflow-hidden`}
			collapsible="offcanvas"
		>
			<SidebarContent className="flex h-full flex-col overflow-hidden">
				<div className="p-4">
					<div className="flex items-center gap-2">
						<div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-600 to-blue-600 shadow-sm">
							<Folder className="h-4 w-4 text-white" />
						</div>
						{!isCollapsed && (
							<span className="truncate font-bold text-lg text-slate-900 dark:text-slate-200">
								DevNotes
							</span>
						)}
					</div>
				</div>

				<SidebarGroup className="flex-1 overflow-hidden">
					<SidebarGroupContent className="scrollbar-none overflow-y-auto pr-1">
						<SidebarMenu>
							{navigationItems.map((item, index) => (
								<SidebarMenuItem
									key={item.title}
									className="animate-fade-in-up"
									style={{ animationDelay: `${0.2 + index * 0.1}s` }}
								>
									<SidebarMenuButton asChild>
										<Link href={item.url} className={getNavClasses(item.url)}>
											<item.icon className="h-5 w-5 flex-shrink-0" />
											{!isCollapsed && (
												<div className="ml-3 flex w-full items-center justify-between">
													<span className="truncate">{item.title}</span>
													{item.badge && (
														<Badge
															variant="secondary"
															className="ml-auto bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
														>
															{item.badge}
														</Badge>
													)}
												</div>
											)}
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarSeparator />
			</SidebarContent>
		</Sidebar>
	);
};

export default DashboardSidebar;
