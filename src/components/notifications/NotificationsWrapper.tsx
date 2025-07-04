"use client"

import { Bell, Check, Clock, MessageSquare, Users, FileText, Trash2 } from "lucide-react";
import { useState, type FC } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import DashboardLayout from "../dashboard/DashboardLayout";

interface Notification {
    id: string;
    title: string;
    description: string;
    type: 'message' | 'system' | 'collaboration' | 'file';
    timestamp: string;
    isRead: boolean;
    icon: any;
}

const mockNotifications: Notification[] = [
    {
        id: '1',
        title: 'New message from Sarah',
        description: 'Hey! I just reviewed the project proposal. Can we discuss the timeline?',
        type: 'message',
        timestamp: '2 minutes ago',
        isRead: false,
        icon: MessageSquare
    },
    {
        id: '2',
        title: 'Workspace updated',
        description: 'John made changes to the "Q4 Planning" document',
        type: 'collaboration',
        timestamp: '15 minutes ago',
        isRead: false,
        icon: Users
    },
    {
        id: '3',
        title: 'File shared with you',
        description: 'Alex shared "Design System Guidelines.pdf" with your team',
        type: 'file',
        timestamp: '1 hour ago',
        isRead: false,
        icon: FileText
    },
    {
        id: '4',
        title: 'System maintenance scheduled',
        description: 'Scheduled maintenance will occur tonight from 2 AM to 4 AM EST',
        type: 'system',
        timestamp: '3 hours ago',
        isRead: true,
        icon: Bell
    },
    {
        id: '5',
        title: 'Welcome to DevNotes!',
        description: 'Thank you for joining DevNotes. Get started by creating your first note.',
        type: 'system',
        timestamp: '1 day ago',
        isRead: true,
        icon: Bell
    }
];

const NotificationsWrapper: FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

    const markAsRead = (id: string) => {
        setNotifications(prev =>
            prev.map(notif =>
                notif.id === id ? { ...notif, isRead: true } : notif
            )
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notif => ({ ...notif, isRead: true }))
        );
    };

    const deleteNotification = (id: string) => {
        setNotifications(prev => prev.filter(notif => notif.id !== id));
    };

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'message':
                return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
            case 'collaboration':
                return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300';
            case 'file':
                return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300';
            case 'system':
                return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
            default:
                return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
        }
    };

    return (
        <DashboardLayout>
            <div className="container mx-auto p-4 sm:p-6 space-y-6 animate-fade-in-up max-w-4xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                            Notifications
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            Stay updated with your team's activities and system updates
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                        {unreadCount > 0 && (
                            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 w-fit">
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
                            <Check className="w-4 h-4 mr-2" />
                            Mark all as read
                        </Button>
                    </div>
                </div>

                <div className="space-y-4">
                    {notifications.length === 0 ? (
                        <Card className="text-center py-12 animate-fade-in-up">
                            <CardContent>
                                <Bell className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
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
                                className={`animate-fade-in-up transition-all duration-200 hover:shadow-md ${!notification.isRead
                                        ? 'border-l-4 border-l-emerald-500 bg-slate-50 dark:bg-slate-800/50'
                                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/30'
                                    }`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-start gap-3 flex-1 min-w-0">
                                            <div className={`p-2 rounded-lg ${getTypeColor(notification.type)} flex-shrink-0`}>
                                                <notification.icon className="w-4 h-4" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <CardTitle className="text-base font-medium text-slate-900 dark:text-slate-100 mb-1 truncate">
                                                    {notification.title}
                                                </CardTitle>
                                                <CardDescription className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                                                    {notification.description}
                                                </CardDescription>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <Clock className="w-3 h-3 text-slate-400" />
                                                    <span className="text-xs text-slate-500 dark:text-slate-400">
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
                                        <div className="flex items-center gap-1 flex-shrink-0">
                                            {!notification.isRead && (
                                                <Button
                                                    onClick={() => markAsRead(notification.id)}
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0"
                                                >
                                                    <Check className="w-4 h-4" />
                                                </Button>
                                            )}
                                            <Button
                                                onClick={() => deleteNotification(notification.id)}
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0 text-slate-400 hover:text-red-500"
                                            >
                                                <Trash2 className="w-4 h-4" />
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
