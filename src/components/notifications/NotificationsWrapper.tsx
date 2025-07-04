"use client";

import {
	Bell,
	Check,
	Clock,
	FileText,
	MessageSquare,
	Trash2,
	Users,
} from "lucide-react";
import { type FC, useState } from "react";
import DashboardLayout from "../dashboard/DashboardLayout";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";

interface Notification {
	id: string;
	title: string;
	description: string;
	type: "message" | "system" | "collaboration" | "file";
	timestamp: string;
	isRead: boolean;
	icon: any;
}

const mockNotifications: Notification[] = [
	{
		id: "1",
		title: "New message from Sarah",
		description:
			"Hey! I just reviewed the project proposal. Can we discuss the timeline?",
		type: "message",
		timestamp: "2 minutes ago",
		isRead: false,
		icon: MessageSquare,
	},
	{
		id: "2",
		title: "Workspace updated",
		description: 'John made changes to the "Q4 Planning" document',
		type: "collaboration",
		timestamp: "15 minutes ago",
		isRead: false,
		icon: Users,
	},
	{
		id: "3",
		title: "File shared with you",
		description: 'Alex shared "Design System Guidelines.pdf" with your team',
		type: "file",
		timestamp: "1 hour ago",
		isRead: false,
		icon: FileText,
	},
	{
		id: "4",
		title: "System maintenance scheduled",
		description:
			"Scheduled maintenance will occur tonight from 2 AM to 4 AM EST",
		type: "system",
		timestamp: "3 hours ago",
		isRead: true,
		icon: Bell,
	},
	{
		id: "5",
		title: "Welcome to DevNotes!",
		description:
			"Thank you for joining DevNotes. Get started by creating your first note.",
		type: "system",
		timestamp: "1 day ago",
		isRead: true,
		icon: Bell,
	},
];

const NotificationsWrapper: FC = () => {
	const [notifications, setNotifications] =
		useState<Notification[]>(mockNotifications);

	const markAsRead = (id: string) => {
		setNotifications((prev) =>
			prev.map((notif) =>
				notif.id === id ? { ...notif, isRead: true } : notif,
			),
		);
	};

	const markAllAsRead = () => {
		setNotifications((prev) =>
			prev.map((notif) => ({ ...notif, isRead: true })),
		);
	};

	const deleteNotification = (id: string) => {
		setNotifications((prev) => prev.filter((notif) => notif.id !== id));
	};

	const unreadCount = notifications.filter((n) => !n.isRead).length;

	const getTypeColor = (type: string) => {
		switch (type) {
			case "message":
				return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
			case "collaboration":
				return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300";
			case "file":
				return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300";
			case "system":
				return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
			default:
				return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
		}
	};

	return (
		<DashboardLayout>
			<div className="container mx-auto max-w-4xl animate-fade-in-up space-y-6 p-4 sm:p-6">
				<div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
					<div>
						<h1 className="mb-2 font-bold text-2xl text-slate-900 sm:text-3xl dark:text-slate-100">
							Notifications
						</h1>
						<p className="text-slate-600 dark:text-slate-400">
							Stay updated with your team's activities and system updates
						</p>
					</div>
					<div className="flex flex-col gap-2 sm:flex-row">
						{unreadCount > 0 && (
							<Badge
								variant="secondary"
								className="w-fit bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
							>
								{unreadCount} unread
							</Badge>
						)}
						<Button
							onClick={markAllAsRead}
							variant="outline"
							size="sm"
							className="w-fit"
							disabled={unreadCount === 0}
						>
							<Check className="mr-2 h-4 w-4" />
							Mark all as read
						</Button>
					</div>
				</div>

				<div className="space-y-4">
					{notifications.length === 0 ? (
						<Card className="animate-fade-in-up py-12 text-center">
							<CardContent>
								<Bell className="mx-auto mb-4 h-12 w-12 text-slate-400 dark:text-slate-600" />
								<h3 className="mb-2 font-medium text-lg text-slate-900 dark:text-slate-100">
									No notifications
								</h3>
								<p className="text-slate-600 dark:text-slate-400">
									You're all caught up! New notifications will appear here.
								</p>
							</CardContent>
						</Card>
					) : (
						notifications.map((notification, index) => (
							<Card
								key={notification.id}
								className={`animate-fade-in-up transition-all duration-200 hover:shadow-md ${
									!notification.isRead
										? "border-l-4 border-l-emerald-500 bg-slate-50 dark:bg-slate-800/50"
										: "hover:bg-slate-50 dark:hover:bg-slate-800/30"
								}`}
								style={{ animationDelay: `${index * 0.1}s` }}
							>
								<CardHeader className="pb-3">
									<div className="flex items-start justify-between gap-4">
										<div className="flex min-w-0 flex-1 items-start gap-3">
											<div
												className={`rounded-lg p-2 ${getTypeColor(notification.type)} flex-shrink-0`}
											>
												<notification.icon className="h-4 w-4" />
											</div>
											<div className="min-w-0 flex-1">
												<CardTitle className="mb-1 truncate font-medium text-base text-slate-900 dark:text-slate-100">
													{notification.title}
												</CardTitle>
												<CardDescription className="line-clamp-2 text-slate-600 text-sm dark:text-slate-400">
													{notification.description}
												</CardDescription>
												<div className="mt-2 flex items-center gap-2">
													<Clock className="h-3 w-3 text-slate-400" />
													<span className="text-slate-500 text-xs dark:text-slate-400">
														{notification.timestamp}
													</span>
													<Badge
														variant="outline"
														className={`text-xs capitalize ${getTypeColor(notification.type)} border-0`}
													>
														{notification.type}
													</Badge>
												</div>
											</div>
										</div>
										<div className="flex flex-shrink-0 items-center gap-1">
											{!notification.isRead && (
												<Button
													onClick={() => markAsRead(notification.id)}
													variant="ghost"
													size="sm"
													className="h-8 w-8 p-0"
												>
													<Check className="h-4 w-4" />
												</Button>
											)}
											<Button
												onClick={() => deleteNotification(notification.id)}
												variant="ghost"
												size="sm"
												className="h-8 w-8 p-0 text-slate-400 hover:text-red-500"
											>
												<Trash2 className="h-4 w-4" />
											</Button>
										</div>
									</div>
								</CardHeader>
							</Card>
						))
					)}
				</div>
			</div>
		</DashboardLayout>
	);
};

export default NotificationsWrapper;
