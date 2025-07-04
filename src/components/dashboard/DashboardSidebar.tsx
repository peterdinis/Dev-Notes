"use client";

import {
  Home,
  FileText,
  Users,
  MessageSquare,
  Network,
  Folder,
  Settings,
  Bell,
  Calendar,
} from "lucide-react";
import { useIsMobile } from "~/hooks/use-mobile";
import { Badge } from "../ui/badge";
import Link from "next/link";
import type { FC } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "../ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/app", icon: Home },
  { title: "Notes", url: "/app/notes", icon: FileText },
  { title: "AI Assistant", url: "/app/ai-chat", icon: MessageSquare },
  { title: "UML Diagrams", url: "/app/diagrams", icon: Network },
  { title: "Whiteboard", url: "/app/whiteboard", icon: Folder },
  { title: "Calendar", url: "/app/calendar", icon: Calendar },
  { title: "Workspace", url: "/app/workspace", icon: Users },
  {
    title: "Notifications",
    url: "/app/notifications",
    icon: Bell,
    badge: 3,
  },
  { title: "Settings", url: "/app/settings", icon: Settings },
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
      className={`border-r border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900 ${
        isCollapsed ? "w-16" : isMobile ? "w-64" : "w-64"
      } animate-slide-in-left overflow-hidden`}
      collapsible="offcanvas"
    >
      <SidebarContent className="flex flex-col h-full overflow-hidden"> 
        <div className="p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
              <Folder className="w-4 h-4 text-white" />
            </div>
            {!isCollapsed && (
              <span className="font-bold text-slate-900 dark:text-slate-200 text-lg truncate">
                DevNotes
              </span>
            )}
          </div>
        </div>

        <SidebarGroup className="overflow-hidden flex-1"> 
          <SidebarGroupContent className="overflow-y-auto scrollbar-none pr-1"> 
            <SidebarMenu>
              {navigationItems.map((item, index) => (
                <SidebarMenuItem
                  key={item.title}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className={getNavClasses(item.url)}>
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!isCollapsed && (
                        <div className="flex items-center justify-between w-full ml-3">
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
