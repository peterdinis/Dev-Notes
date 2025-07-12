"use client";

import { Calendar, FileText, Folder, Plus } from "lucide-react";
import { type FC, useState } from "react";
import { useToast } from "~/hooks/shared/use-toast";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import DashboardLayout from "./DashboardLayout";
import { api } from "~/trpc/react";

const DashboardWrapper: FC = () => {
	const { toast } = useToast();

	const [newWorkspace, setNewWorkspace] = useState({
		name: "",
	});
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const utils = api.useUtils();

	const { mutate: createWorkspace, isPending: isCreating } =
		api.workspace.create.useMutation({
			onSuccess: async (data) => {
				toast({
					title: "Workspace Created",
					description: `"${data!.name}" has been created successfully`,
					className: "bg-green-800 text-white font-bold text-xl leading-[125%]"
				});
				setNewWorkspace({ name: ""});
				setIsDialogOpen(false);
				await utils.workspace.getAll.invalidate();
			},
			onError: (error) => {
				toast({
					title: "Error",
					description: error.message,
					variant: "destructive",
				});
			},
		});

	const handleCreateWorkspace = () => {
		if (!newWorkspace.name.trim()) {
			toast({
				title: "Validation Error",
				description: "Workspace name is required",
				variant: "destructive",
			});
			return;
		}

		createWorkspace({
			name: newWorkspace.name,
		});
	};

	return (
		<DashboardLayout>
			<div className="min-h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
				<div className="mx-auto max-w-7xl space-y-8">
					<div className="flex items-center justify-between">
						<div>
							<h1 className="mb-2 font-bold text-4xl text-slate-100">
								Dashboard
							</h1>
							<p className="text-lg text-slate-400">
								Manage your coding workspaces and notes
							</p>
						</div>

						<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
							<DialogTrigger asChild>
								<Button
									disabled={isCreating}
									className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
								>
									<Plus className="mr-2 h-4 w-4" />
									New Workspace
								</Button>
							</DialogTrigger>
							<DialogContent className="border-slate-700 bg-slate-900">
								<DialogHeader>
									<DialogTitle className="text-slate-100">
										Create New Workspace
									</DialogTitle>
									<DialogDescription className="text-slate-400">
										Create a new workspace to organize your programming notes
										and documentation.
									</DialogDescription>
								</DialogHeader>
								<div className="space-y-4">
									<div>
										<Label htmlFor="name" className="text-slate-200">
											Name
										</Label>
										<Input
											id="name"
											value={newWorkspace.name}
											onChange={(e) =>
												setNewWorkspace({
													...newWorkspace,
													name: e.target.value,
												})
											}
											placeholder="Enter workspace name"
											className="border-slate-600 mt-2 bg-slate-800 text-slate-100"
										/>
									</div>
									<div className="flex justify-end space-x-2">
										<Button
											variant="outline"
											onClick={() => setIsDialogOpen(false)}
											className="border-slate-600 text-slate-300"
										>
											Cancel
										</Button>
										<Button
											disabled={isCreating}
											onClick={handleCreateWorkspace}
											className="bg-purple-600 hover:bg-purple-700"
										>
											Create Workspace
										</Button>
									</div>
								</div>
							</DialogContent>
						</Dialog>
					</div>

					<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
						<Card className="border-slate-700 bg-slate-900/50 backdrop-blur-sm">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="font-medium text-slate-400 text-sm">
									Total Workspaces
								</CardTitle>
								<Folder className="h-4 w-4 text-purple-500" />
							</CardHeader>
							<CardContent>
								<div className="font-bold text-2xl text-slate-100">
									TODO WORKSPACE LENGTH
								</div>
							</CardContent>
						</Card>

						<Card className="border-slate-700 bg-slate-900/50 backdrop-blur-sm">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="font-medium text-slate-400 text-sm">
									Total Notes
								</CardTitle>
								<FileText className="h-4 w-4 text-blue-500" />
							</CardHeader>
							<CardContent>
								<div className="font-bold text-2xl text-slate-100">
									TODO Total Notes
								</div>
							</CardContent>
						</Card>

						<Card className="border-slate-700 bg-slate-900/50 backdrop-blur-sm">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="font-medium text-slate-400 text-sm">
									Active Projects
								</CardTitle>
								<Calendar className="h-4 w-4 text-green-500" />
							</CardHeader>
							<CardContent>
								<div className="font-bold text-2xl text-slate-100">
									TODO WORKSPACE LENGTH
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
};

export default DashboardWrapper;
