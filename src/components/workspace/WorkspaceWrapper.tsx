"use client";

import {
	Crown,
	MoreVertical,
	Plus,
	Search,
	Shield,
	User,
} from "lucide-react";
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
import { api } from "~/trpc/react";

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
	const { data, isLoading } = api.workspace.getAll.useQuery({
		page: 1,
		pageSize: 100,
		search: "",
	});

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

				<Card>
					<CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
						<div>
							<CardTitle>Team members</CardTitle>
							<CardDescription>
								Manage your workspace team here.
							</CardDescription>
						</div>
						<Button>
							<Plus className="mr-2 h-4 w-4" />
							Invite member
						</Button>
					</CardHeader>
					<CardContent>
						<div className="relative mb-4">
							<Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input placeholder="Search members..." className="pl-9" />
						</div>
						<div className="space-y-4">
							{[...Array(5)].map((_, i) => (
								<div
									key={i}
									className="flex items-center justify-between gap-4"
								>
									<div className="flex items-center gap-4">
										<div className="relative">
											<Avatar className="h-9 w-9">
												<AvatarImage
													src={`https://github.com/shadcn.png`}
													alt="@shadcn"
												/>
												<AvatarFallback>JP</AvatarFallback>
											</Avatar>
											<span className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-background ${getStatusColor("online")}`} />
										</div>
										<div>
											<p className="text-sm font-medium leading-none">
												John Doe
											</p>
											<p className="text-sm text-muted-foreground">
												john@example.com
											</p>
										</div>
									</div>
									<div className="flex items-center gap-2">
										<Badge variant="outline" className="text-xs">
											{getRoleIcon("owner")}
											<span className="ml-1">Owner</span>
										</Badge>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													variant="ghost"
													className="h-8 w-8 p-0"
												>
													<MoreVertical className="h-4 w-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem>Make Admin</DropdownMenuItem>
												<DropdownMenuItem>Remove</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>My Workspaces</CardTitle>
						<CardDescription>List of workspaces from database</CardDescription>
					</CardHeader>
					<CardContent>
						{isLoading ? (
							<p>Loading workspaces...</p>
						) : data?.items.length ? (
							<ul className="space-y-2">
								{data.items.map((workspace) => (
									<li
										key={workspace.id}
										className="rounded-lg border p-4 dark:border-slate-700"
									>
										<p className="text-slate-900 dark:text-slate-100 font-semibold">
											{workspace.name}
										</p>
										<p className="text-sm text-slate-600 dark:text-slate-400">
											ID: {workspace.id}
										</p>
									</li>
								))}
							</ul>
						) : (
							<p>No workspaces found.</p>
						)}
					</CardContent>
				</Card>

				<div className="mt-5">
					<TeamChat currentUserId="1" workspaceId="1" />
				</div>
			</div>
		</DashboardLayout>
	);
};

export default WorkspaceWrapper;
