"use client";

import {
	Copy,
	Download,
	Edit,
	Eye,
	Grid,
	List,
	Plus,
	Trash2,
	ZoomIn,
	ZoomOut,
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

const mockDiagrams = [
	{
		id: 1,
		name: "User Authentication Flow",
		description: "Diagram illustrating the user authentication process",
		type: "Sequence",
		nodes: [
			{
				id: 101,
				name: "User",
				type: "Actor",
				description: "The user",
				x: 50,
				y: 100,
			},
			{
				id: 102,
				name: "Login Page",
				type: "UI",
				description: "Login form",
				x: 200,
				y: 100,
			},
			{
				id: 103,
				name: "Auth Service",
				type: "Service",
				description: "Authentication backend",
				x: 400,
				y: 100,
			},
		],
		createdAt: "2024-04-01",
		updatedAt: "2024-04-05",
	},
	{
		id: 2,
		name: "Order Processing System",
		description: "System diagram for order processing",
		type: "Component",
		nodes: [
			{
				id: 201,
				name: "Web App",
				type: "Component",
				description: "Frontend interface",
				x: 50,
				y: 100,
			},
			{
				id: 202,
				name: "Order Service",
				type: "Service",
				description: "Handles order creation",
				x: 200,
				y: 100,
			},
			{
				id: 203,
				name: "Payment Gateway",
				type: "External",
				description: "Processes payments",
				x: 400,
				y: 100,
			},
		],
		createdAt: "2024-04-03",
		updatedAt: "2024-04-07",
	},
];

const UmlWrapper: FC = () => {
	const [diagrams, setDiagrams] = useState(mockDiagrams);
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [zoomLevel, setZoomLevel] = useState(100);
	const [showPreview, setShowPreview] = useState(false);

	const addDiagram = (newDiagram: any) => {
		setDiagrams([...diagrams, newDiagram]);
	};

	const updateDiagram = (updatedDiagram: any) => {
		setDiagrams(
			diagrams.map((diagram) =>
				diagram.id === updatedDiagram.id ? updatedDiagram : diagram,
			),
		);
	};

	const deleteDiagram = (id: number) => {
		setDiagrams(diagrams.filter((diagram) => diagram.id !== id));
	};

	const handleZoomIn = () => {
		setZoomLevel((prev) => Math.min(prev + 25, 200));
	};

	const handleZoomOut = () => {
		setZoomLevel((prev) => Math.max(prev - 25, 50));
	};

	return (
		<DashboardLayout>
			<div className="container mx-auto max-w-full animate-fade-in-up space-y-4 p-4 sm:space-y-6 sm:p-6">
				<div className="mb-6 flex flex-col justify-between gap-4 sm:mb-8 sm:flex-row sm:items-center">
					<div className="min-w-0 flex-1">
						<h1 className="mb-2 truncate font-bold text-2xl text-slate-900 sm:text-3xl dark:text-slate-100">
							UML Diagrams
						</h1>
						<p className="text-slate-600 text-sm sm:text-base dark:text-slate-400">
							Create and manage your system diagrams
						</p>
					</div>
					<div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
						{/* View Options */}
						<div className="flex items-center gap-2">
							<Label className="whitespace-nowrap font-medium text-sm">
								View:
							</Label>
							<ToggleGroup
								type="single"
								value={viewMode}
								onValueChange={(value) =>
									value && setViewMode(value as "grid" | "list")
								}
							>
								<ToggleGroupItem value="grid" aria-label="Grid view" size="sm">
									<Grid className="h-4 w-4" />
								</ToggleGroupItem>
								<ToggleGroupItem value="list" aria-label="List view" size="sm">
									<List className="h-4 w-4" />
								</ToggleGroupItem>
							</ToggleGroup>
						</div>

						{/* Zoom Controls */}
						<div className="flex items-center gap-2">
							<Button variant="outline" size="sm" onClick={handleZoomOut}>
								<ZoomOut className="h-4 w-4" />
							</Button>
							<span className="min-w-[50px] text-center font-medium text-sm">
								{zoomLevel}%
							</span>
							<Button variant="outline" size="sm" onClick={handleZoomIn}>
								<ZoomIn className="h-4 w-4" />
							</Button>
						</div>

						<Dialog>
							<DialogTrigger asChild>
								<Button className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700 sm:w-auto">
									<Plus className="h-4 w-4" />
									<span className="sm:inline">New Diagram</span>
								</Button>
							</DialogTrigger>
							<DialogContent className="mx-auto w-[95vw] max-w-2xl">
								<DialogHeader>
									<DialogTitle>Create New Diagram</DialogTitle>
									<DialogDescription>
										Fill in the details for your new UML diagram
									</DialogDescription>
								</DialogHeader>
								<div className="grid gap-4 py-4">
									<div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-4">
										<Label htmlFor="name" className="sm:text-right">
											Name
										</Label>
										<Input
											id="name"
											defaultValue="New Diagram"
											className="sm:col-span-3"
										/>
									</div>
									<div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-4">
										<Label htmlFor="description" className="sm:text-right">
											Description
										</Label>
										<Textarea
											id="description"
											className="sm:col-span-3"
											defaultValue="Brief description of the diagram"
										/>
									</div>
									<div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-4">
										<Label htmlFor="type" className="sm:text-right">
											Type
										</Label>
										<Select>
											<SelectTrigger className="sm:col-span-3">
												<SelectValue placeholder="Select diagram type" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="sequence">
													Sequence Diagram
												</SelectItem>
												<SelectItem value="component">
													Component Diagram
												</SelectItem>
												<SelectItem value="class">Class Diagram</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
							</DialogContent>
						</Dialog>
					</div>
				</div>

				{/* Diagrams Display */}
				{viewMode === "grid" ? (
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
						{diagrams.map((diagram, index) => (
							<Card
								key={diagram.id}
								className="group animate-fade-in-up transition-all duration-300 hover:shadow-lg"
								style={{
									animationDelay: `${index * 0.1}s`,
									transform: `scale(${zoomLevel / 100})`,
									transformOrigin: "top left",
								}}
							>
								<CardHeader className="pb-3">
									<div className="flex items-start justify-between gap-2">
										<div className="min-w-0 flex-1">
											<CardTitle className="truncate text-lg">
												{diagram.name}
											</CardTitle>
											<CardDescription className="mt-1 line-clamp-2">
												{diagram.description}
											</CardDescription>
										</div>
										<Badge variant="outline" className="ml-2 flex-shrink-0">
											{diagram.type}
										</Badge>
									</div>
								</CardHeader>
								<CardContent>
									<div className="mb-4 flex min-h-[120px] items-center justify-center rounded-lg border-2 border-slate-300 border-dashed bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-800">
										<div className="text-center text-slate-500 dark:text-slate-400">
											<div className="mb-2 text-2xl">📊</div>
											<p className="text-sm">
												{diagram.nodes.length} components
											</p>
										</div>
									</div>
									<div className="flex items-center justify-between">
										<div className="flex flex-wrap gap-1 sm:gap-2">
											<Button
												variant="ghost"
												size="sm"
												onClick={() => setShowPreview(true)}
											>
												<Eye className="h-4 w-4" />
											</Button>
											<Button variant="ghost" size="sm">
												<Edit className="h-4 w-4" />
											</Button>
											<Button variant="ghost" size="sm">
												<Copy className="h-4 w-4" />
											</Button>
											<Button variant="ghost" size="sm">
												<Download className="h-4 w-4" />
											</Button>
										</div>
										<Button
											variant="ghost"
											size="sm"
											onClick={() => deleteDiagram(diagram.id)}
										>
											<Trash2 className="h-4 w-4 text-red-500" />
										</Button>
									</div>
									<div className="mt-3 text-slate-500 text-xs dark:text-slate-400">
										Updated {diagram.updatedAt}
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				) : (
					<Card>
						<CardContent className="p-0">
							<div className="space-y-0">
								{diagrams.map((diagram, index) => (
									<div
										key={diagram.id}
										className="flex animate-fade-in-up flex-col justify-between gap-3 border-slate-200 border-b p-4 transition-colors last:border-b-0 hover:bg-slate-50 sm:flex-row sm:items-center sm:gap-4 dark:border-slate-700 dark:hover:bg-slate-800/50"
										style={{ animationDelay: `${index * 0.05}s` }}
									>
										<div className="flex min-w-0 flex-1 items-center gap-4">
											<div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
												<span className="text-lg">📊</span>
											</div>
											<div className="min-w-0 flex-1">
												<h3 className="truncate font-medium text-slate-900 dark:text-slate-100">
													{diagram.name}
												</h3>
												<p className="line-clamp-2 text-slate-600 text-sm dark:text-slate-400">
													{diagram.description}
												</p>
												<div className="mt-1 flex flex-wrap items-center gap-2">
													<Badge variant="outline" className="text-xs">
														{diagram.type}
													</Badge>
													<span className="text-slate-500 text-xs">
														{diagram.nodes.length} components
													</span>
													<span className="text-slate-500 text-xs">
														Updated {diagram.updatedAt}
													</span>
												</div>
											</div>
										</div>
										<div className="flex flex-wrap items-center gap-1 sm:flex-nowrap sm:gap-2">
											<Button
												variant="ghost"
												size="sm"
												onClick={() => setShowPreview(true)}
											>
												<Eye className="h-4 w-4" />
											</Button>
											<Button variant="ghost" size="sm">
												<Edit className="h-4 w-4" />
											</Button>
											<Button variant="ghost" size="sm">
												<Copy className="h-4 w-4" />
											</Button>
											<Button variant="ghost" size="sm">
												<Download className="h-4 w-4" />
											</Button>
											<Button
												variant="ghost"
												size="sm"
												onClick={() => deleteDiagram(diagram.id)}
											>
												<Trash2 className="h-4 w-4 text-red-500" />
											</Button>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				)}

				{/* Preview Dialog */}
				<Dialog open={showPreview} onOpenChange={setShowPreview}>
					<DialogContent className="max-h-[80vh] w-[95vw] max-w-4xl">
						<DialogHeader>
							<DialogTitle>Diagram Preview</DialogTitle>
							<DialogDescription>
								Full view of your UML diagram
							</DialogDescription>
						</DialogHeader>
						<div className="flex min-h-[400px] items-center justify-center rounded-lg bg-slate-50 p-8 dark:bg-slate-800">
							<div className="text-center text-slate-500 dark:text-slate-400">
								<div className="mb-4 text-6xl">📊</div>
								<p>Diagram preview would be rendered here</p>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</div>
		</DashboardLayout>
	);
};

export default UmlWrapper;
