"use client";

import { MoreVertical, Paperclip, Send, Smile } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Textarea } from "../ui/textarea";

interface Message {
	id: string;
	userId: string;
	userName: string;
	userAvatar: string;
	content: string;
	timestamp: string;
	type: "text" | "file" | "code";
}

interface TeamChatProps {
	workspaceId: string;
	currentUserId: string;
}

const TeamChat = ({ workspaceId, currentUserId }: TeamChatProps) => {
	const [messages, setMessages] = useState<Message[]>([
		{
			id: "1",
			userId: "user1",
			userName: "Alice Johnson",
			userAvatar: "",
			content:
				"Hey team! I just finished the authentication module. Ready for review! 🚀",
			timestamp: "10:30 AM",
			type: "text",
		},
		{
			id: "2",
			userId: "user2",
			userName: "Bob Smith",
			userAvatar: "",
			content:
				"Great work Alice! I'll review it after lunch. Also, I've updated the UML diagrams for the new feature.",
			timestamp: "10:35 AM",
			type: "text",
		},
		{
			id: "3",
			userId: currentUserId,
			userName: "You",
			userAvatar: "",
			content:
				"Thanks for the updates! Let me know if you need any help with the API integration.",
			timestamp: "10:40 AM",
			type: "text",
		},
	]);

	const [newMessage, setNewMessage] = useState("");

	const handleSendMessage = () => {
		if (!newMessage.trim()) return;

		const message: Message = {
			id: Date.now().toString(),
			userId: currentUserId,
			userName: "You",
			userAvatar: "",
			content: newMessage,
			timestamp: new Date().toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			}),
			type: "text",
		};

		setMessages([...messages, message]);
		setNewMessage("");
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	return (
		<Card className="flex h-[400px] animate-fade-in-up flex-col sm:h-[600px]">
			<CardHeader className="border-slate-200 border-b p-3 sm:p-6 dark:border-slate-700">
				<div className="flex items-center justify-between">
					<CardTitle className="flex items-center gap-2 text-base sm:text-lg">
						<div className="h-3 w-3 animate-pulse rounded-full bg-green-500"></div>
						<span className="truncate">Team Chat</span>
						<Badge variant="outline" className="ml-2 text-xs">
							3 online
						</Badge>
					</CardTitle>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="sm">
								<MoreVertical className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="end"
							className="border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
						>
							<DropdownMenuItem>View Members</DropdownMenuItem>
							<DropdownMenuItem>Chat Settings</DropdownMenuItem>
							<DropdownMenuItem>Clear History</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</CardHeader>

			<CardContent className="flex min-h-0 flex-1 flex-col p-0">
				{/* Messages Area */}
				<div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3 sm:space-y-4 sm:p-4">
					{messages.map((message, index) => (
						<div
							key={message.id}
							className={`flex animate-fade-in-up gap-2 sm:gap-3 ${
								message.userId === currentUserId ? "flex-row-reverse" : ""
							}`}
							style={{ animationDelay: `${index * 0.1}s` }}
						>
							<Avatar className="h-7 w-7 flex-shrink-0 sm:h-8 sm:w-8">
								<AvatarImage src={message.userAvatar} />
								<AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs dark:bg-emerald-900/20 dark:text-emerald-300">
									{message.userName
										.split(" ")
										.map((n) => n[0])
										.join("")}
								</AvatarFallback>
							</Avatar>

							<div
								className={`flex flex-col ${message.userId === currentUserId ? "items-end" : "items-start"} min-w-0 max-w-[80%] sm:max-w-[70%]`}
							>
								<div className="mb-1 flex items-center gap-2">
									<span className="truncate font-medium text-slate-700 text-xs sm:text-sm dark:text-slate-300">
										{message.userName}
									</span>
									<span className="flex-shrink-0 text-slate-500 text-xs">
										{message.timestamp}
									</span>
								</div>

								<div
									className={`break-words rounded-lg px-3 py-2 text-sm ${
										message.userId === currentUserId
											? "bg-emerald-600 text-white"
											: "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
									}`}
								>
									<p className="whitespace-pre-wrap break-words">
										{message.content}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Message Input */}
				<div className="border-slate-200 border-t p-3 sm:p-4 dark:border-slate-700">
					<div className="flex items-end gap-2">
						<div className="relative min-w-0 flex-1">
							<Textarea
								value={newMessage}
								onChange={(e) => setNewMessage(e.target.value)}
								onKeyPress={handleKeyPress}
								placeholder="Type a message..."
								className="max-h-32 min-h-[44px] resize-none pr-16 text-sm sm:pr-20"
								rows={1}
							/>
							<div className="-translate-y-1/2 absolute top-1/2 right-2 flex items-center gap-1">
								<Button
									variant="ghost"
									size="sm"
									className="h-6 w-6 p-0 sm:h-8 sm:w-8"
								>
									<Smile className="h-3 w-3 sm:h-4 sm:w-4" />
								</Button>
								<Button
									variant="ghost"
									size="sm"
									className="h-6 w-6 p-0 sm:h-8 sm:w-8"
								>
									<Paperclip className="h-3 w-3 sm:h-4 sm:w-4" />
								</Button>
							</div>
						</div>
						<Button
							onClick={handleSendMessage}
							disabled={!newMessage.trim()}
							className="h-11 flex-shrink-0 bg-emerald-600 px-3 hover:bg-emerald-700 sm:px-4"
						>
							<Send className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default TeamChat;
