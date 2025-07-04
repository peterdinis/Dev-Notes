import { Crown, MoreVertical, Plus, Search, Shield, User } from "lucide-react";
import type { FC } from "react";
import TeamChat from "../chat/TeamChat";
import DashboardLayout from "../dashboard/DashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";

const mockTeamMembers = [
	{
		id: 1,
		name: "Alice Johnson",
		email: "alice@devteam.com",
		role: "owner",
		avatar: "",
		status: "online",
		joinedAt: "2024-01-15",
		lastActive: "2 minutes ago",
		projectsCount: 12,
	},
	{
		id: 2,
		name: "Bob Smith",
		email: "bob@devteam.com",
		role: "admin",
		avatar: "",
		status: "online",
		joinedAt: "2024-02-20",
		lastActive: "5 minutes ago",
		projectsCount: 8,
	},
	{
		id: 3,
		name: "Carol White",
		email: "carol@devteam.com",
		role: "member",
		avatar: "",
		status: "away",
		joinedAt: "2024-03-10",
		lastActive: "1 hour ago",
		projectsCount: 6,
	},
	{
		id: 4,
		name: "David Brown",
		email: "david@devteam.com",
		role: "member",
		avatar: "",
		status: "offline",
		joinedAt: "2024-03-25",
		lastActive: "2 days ago",
		projectsCount: 4,
	},
];

const getRoleIcon = (role: string) => {
	switch (role) {
		case "owner":
			return <Crown className="h-4 w-4 text-yellow-500" />;
		case "admin":
			return <Shield className="h-4 w-4 text-blue-500" />;
		default:
			return <User className="h-4 w-4 text-slate-500" />;
	}
};

const getStatusColor = (status: string) => {
	switch (status) {
		case "online":
			return "bg-green-500";
		case "away":
			return "bg-yellow-500";
		default:
			return "bg-slate-400";
	}
};

const WorkspaceWrapper: FC = () => {
	return (
		<DashboardLayout>
			<div className="container mx-auto animate-fade-in-up space-y-6 p-6">
				<div className="mb-8">
					<h1 className="mb-2 font-bold text-3xl text-slate-900 dark:text-slate-100">
						Workspace
					</h1>
					<p className="text-slate-600 dark:text-slate-400">
						Collaborate with your development team
					</p>
				</div>

				<div className="mb-6 grid gap-4 md:grid-cols-4">
					<Card
						className="animate-fade-in-up"
						style={{ animationDelay: "0.1s" }}
					>
						<CardContent className="p-4">
							<div className="flex items-center justify-between">
								<div>
									<p className="font-medium text-slate-600 text-sm dark:text-slate-400">
										Total Members
									</p>
									<p className="font-bold text-2xl text-slate-900 dark:text-slate-100">
										4
									</p>
								</div>
								<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/20">
									<User className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
								</div>
							</div>
						</CardContent>
					</Card>

					<Card
						className="animate-fade-in-up"
						style={{ animationDelay: "0.2s" }}
					>
						<CardContent className="p-4">
							<div className="flex items-center justify-between">
								<div>
									<p className="font-medium text-slate-600 text-sm dark:text-slate-400">
										Online Now
									</p>
									<p className="font-bold text-2xl text-slate-900 dark:text-slate-100">
										2
									</p>
								</div>
								<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20">
									<div className="h-3 w-3 animate-pulse rounded-full bg-green-500"></div>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card
						className="animate-fade-in-up"
						style={{ animationDelay: "0.3s" }}
					>
						<CardContent className="p-4">
							<div className="flex items-center justify-between">
								<div>
									<p className="font-medium text-slate-600 text-sm dark:text-slate-400">
										Total Projects
									</p>
									<p className="font-bold text-2xl text-slate-900 dark:text-slate-100">
										30
									</p>
								</div>
								<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
									<span className="font-bold text-blue-600 text-sm dark:text-blue-400">
										P
									</span>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card
						className="animate-fade-in-up"
						style={{ animationDelay: "0.4s" }}
					>
						<CardContent className="p-4">
							<div className="flex items-center justify-between">
								<div>
									<p className="font-medium text-slate-600 text-sm dark:text-slate-400">
										This Month
									</p>
									<p className="font-bold text-2xl text-slate-900 dark:text-slate-100">
										+5
									</p>
								</div>
								<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/20">
									<Plus className="h-4 w-4 text-purple-600 dark:text-purple-400" />
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="grid gap-6 lg:grid-cols-3">
					<div className="lg:col-span-2">
						<Card
							className="animate-fade-in-up"
							style={{ animationDelay: "0.5s" }}
						>
							<CardHeader>
								<div className="flex items-center justify-between">
									<div>
										<CardTitle>Team Members</CardTitle>
										<CardDescription>
											Manage your workspace members and permissions
										</CardDescription>
									</div>
									<Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
										<Plus className="h-4 w-4" />
										Invite Member
									</Button>
								</div>
								<div className="mt-4 flex items-center space-x-2">
									<div className="relative max-w-sm flex-1">
										<Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 transform text-slate-400" />
										<Input placeholder="Search members..." className="pl-10" />
									</div>
								</div>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{mockTeamMembers.map((member, index) => (
										<div
											key={member.id}
											className="flex animate-fade-in-up items-center justify-between rounded-lg border border-slate-200 p-4 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/50"
											style={{ animationDelay: `${0.6 + index * 0.1}s` }}
										>
											<div className="flex items-center space-x-4">
												<div className="relative">
													<Avatar>
														<AvatarImage src={member.avatar} />
														<AvatarFallback className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300">
															{member.name
																.split(" ")
																.map((n) => n[0])
																.join("")}
														</AvatarFallback>
													</Avatar>
													<div
														className={`-bottom-1 -right-1 absolute h-3 w-3 ${getStatusColor(member.status)} rounded-full border-2 border-white dark:border-slate-900`}
													></div>
												</div>
												<div>
													<div className="flex items-center gap-2">
														<h3 className="font-medium text-slate-900 dark:text-slate-100">
															{member.name}
														</h3>
														{getRoleIcon(member.role)}
														<Badge
															variant={
																member.role === "owner"
																	? "default"
																	: member.role === "admin"
																		? "secondary"
																		: "outline"
															}
															className="text-xs"
														>
															{member.role}
														</Badge>
													</div>
													<p className="text-slate-600 text-sm dark:text-slate-400">
														{member.email}
													</p>
													<p className="text-slate-500 text-xs dark:text-slate-500">
														Last active: {member.lastActive} •{" "}
														{member.projectsCount} projects
													</p>
												</div>
											</div>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant="ghost" size="sm">
														<MoreVertical className="h-4 w-4" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuItem>View Profile</DropdownMenuItem>
													<DropdownMenuItem>Change Role</DropdownMenuItem>
													<DropdownMenuItem className="text-red-600">
														Remove Member
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>

					<div
						className="animate-fade-in-up"
						style={{ animationDelay: "0.6s" }}
					>
						<TeamChat currentUserId="1" workspaceId="1" />
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
};

export default WorkspaceWrapper;
