"use client";

import { Crown, MoreVertical, Plus, Search, Shield, User } from "lucide-react";
import type { FC } from "react";
import { api } from "~/trpc/react";
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
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

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
			<div className="container mx-auto animate-fade-in-up space-y-6 px-4 py-6 sm:px-6 lg:px-8">
				<div className="mb-8">
					<h1 className="mb-2 font-bold text-2xl text-slate-900 sm:text-3xl dark:text-slate-100">
						Workspace
					</h1>
					<p className="text-slate-600 text-sm sm:text-base dark:text-slate-400">
						Collaborate with your development team
					</p>
				</div>

				<Card>
					<CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
						<div>
							<CardTitle className="text-lg sm:text-xl">Team members</CardTitle>
							<CardDescription>
								Manage your workspace team here.
							</CardDescription>
						</div>
						<Button className="w-full sm:w-auto">
							<Plus className="mr-2 h-4 w-4" />
							Invite member
						</Button>
					</CardHeader>
					<CardContent>
						<div className="relative mb-4">
							<Search className="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground" />
							<Input placeholder="Search members..." className="pl-9" />
						</div>
						<div className="space-y-4">
							{[...Array(5)].map((_, i) => (
								<div
									key={i}
									className="flex flex-wrap items-center justify-between gap-4"
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
											<span
												className={`absolute right-0 bottom-0 block h-2.5 w-2.5 rounded-full ring-2 ring-background ${getStatusColor("online")}`}
											/>
										</div>
										<div>
											<p className="font-medium text-sm leading-none">
												John Doe
											</p>
											<p className="text-muted-foreground text-sm">
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
												<Button variant="ghost" className="h-8 w-8 p-0">
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
						<CardTitle className="text-lg sm:text-xl">My Workspaces</CardTitle>
						<CardDescription>List of workspaces from database</CardDescription>
					</CardHeader>
					<CardContent>
						{isLoading ? (
							<p>Loading workspaces...</p>
						) : data?.items.length ? (
							<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
								{data.items.map((workspace) => (
									<li
										key={workspace.id}
										className="group flex items-center gap-4 rounded-xl border p-4 transition hover:bg-muted dark:border-slate-700 dark:hover:bg-slate-800"
									>
										<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary uppercase">
											{workspace.name.slice(0, 2)}
										</div>
										<div className="flex-1">
											<p className="font-medium text-slate-900 text-sm dark:text-slate-100">
												{workspace.name}
											</p>
											<p className="text-muted-foreground text-sm">
												Team workspace
											</p>
										</div>
										<DropdownMenu>
											<Tooltip>
												<TooltipTrigger asChild>
													<DropdownMenuTrigger asChild>
														<Button
															size="icon"
															variant="ghost"
															className="opacity-0 group-hover:opacity-100"
														>
															<MoreVertical className="h-4 w-4" />
														</Button>
													</DropdownMenuTrigger>
												</TooltipTrigger>
												<TooltipContent side="left" sideOffset={8}>
													View options
												</TooltipContent>
											</Tooltip>
											<DropdownMenuContent align="end">
												<DropdownMenuItem
													onClick={() => console.log("Open", workspace.id)}
												>
													Open
												</DropdownMenuItem>
												<DropdownMenuItem
													onClick={() => console.log("Rename", workspace.id)}
												>
													Rename
												</DropdownMenuItem>
												<DropdownMenuItem
													className="text-red-500"
													onClick={() => console.log("Delete", workspace.id)}
												>
													Delete
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
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
