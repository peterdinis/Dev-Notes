<<<<<<< HEAD
"use client"

import { Edit3, FileText, Plus, Save, Search } from "lucide-react";
import { type FC, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
=======
import { Edit3, FileText, Plus, Save, Search } from "lucide-react";
import { type FC, useState } from "react";
import { useToast } from "~/hooks/use-toast";
import { Button } from "../ui/button";
>>>>>>> main
import { useToast } from "~/hooks/shared/use-toast";
import DashboardLayout from "../dashboard/DashboardLayout";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import TipTapEditor from "./editor/TipTapEditor";

interface Note {
	id: string;
	title: string;
	content: string;
	workspace: string;
	tags: string[];
	createdAt: string;
	updatedAt: string;
}

const NotesWrapper: FC = () => {
	const { toast } = useToast();
	const [notes, setNotes] = useState<Note[]>([
		{
			id: "1",
			title: "React Hooks Best Practices",
			content:
				"<h1>React Hooks Best Practices</h1><h2>useState</h2><p>Always use functional updates when the new state depends on the previous state</p><ul><li>Group related state variables</li><li>Use descriptive names</li></ul><pre><code>const [count, setCount] = useState(0);\nsetCount(prev => prev + 1);</code></pre><h2>useEffect</h2><p>Always include dependencies in the dependency array</p><ul><li>Use cleanup functions for subscriptions</li><li>Separate concerns with multiple useEffect hooks</li></ul>",
			workspace: "React Project",
			tags: ["react", "hooks", "best-practices"],
			createdAt: "2024-01-15",
			updatedAt: "2024-01-20",
		},
		{
			id: "2",
			title: "API Authentication Flow",
			content:
				"<h1>API Authentication Flow</h1><h2>JWT Token Implementation</h2><ol><li>User login with credentials</li><li>Server validates and returns JWT token</li><li>Client stores token securely</li><li>Include token in Authorization header</li></ol><pre><code>const headers = {\n  'Authorization': `Bearer ${token}`,\n  'Content-Type': 'application/json'\n};</code></pre>",
			workspace: "API Documentation",
			tags: ["api", "authentication", "jwt"],
			createdAt: "2024-01-10",
			updatedAt: "2024-01-18",
		},
	]);

	const [selectedNote, setSelectedNote] = useState<Note | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedWorkspace, setSelectedWorkspace] = useState("all");
	const [editContent, setEditContent] = useState("");
	const [editTitle, setEditTitle] = useState("");

	const workspaces = ["all", "React Project", "API Documentation"];

	const filteredNotes = notes.filter((note) => {
		const matchesSearch =
			note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			note.content.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesWorkspace =
			selectedWorkspace === "all" || note.workspace === selectedWorkspace;
		return matchesSearch && matchesWorkspace;
	});

	const handleCreateNote = () => {
		const newNote: Note = {
			id: Date.now().toString(),
			title: "New Note",
			content: "<h1>New Note</h1><p>Start writing your note here...</p>",
			workspace:
				selectedWorkspace === "all" ? "React Project" : selectedWorkspace,
			tags: [],
			createdAt: new Date().toISOString().split("T")[0]!,
			updatedAt: new Date().toISOString().split("T")[0]!,
		};

		setNotes([newNote, ...notes]);
		setSelectedNote(newNote);
		setEditTitle(newNote.title);
		setEditContent(newNote.content);
		setIsEditing(true);
	};

	const handleEditNote = (note: Note) => {
		setSelectedNote(note);
		setEditTitle(note.title);
		setEditContent(note.content);
		setIsEditing(true);
	};

	const handleSaveNote = () => {
		if (selectedNote) {
			const updatedNotes = notes.map((note) =>
				note.id === selectedNote.id
					? {
							...note,
							title: editTitle,
							content: editContent,
							updatedAt: new Date().toISOString().split("T")[0]!,
						}
					: note,
			);
			setNotes(updatedNotes);
			setSelectedNote({
				...selectedNote,
				title: editTitle,
				content: editContent,
				updatedAt: new Date().toISOString().split("T")[0]!,
			});
			setIsEditing(false);

<<<<<<< HEAD
  return (
    <DashboardLayout>
      <div className="min-h-full bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-1/3 animate-slide-in-left border-slate-200 border-r bg-white/50 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/30">
          <div className="space-y-4 p-6">
            <div className="flex animate-fade-in-up items-center justify-between">
              <h2 className="font-bold text-2xl text-slate-900 dark:text-slate-100">Notes</h2>
              <Button
                onClick={handleCreateNote}
                size="sm"
                className="bg-emerald-600 text-white transition-all duration-200 hover:scale-105 hover:bg-emerald-700"
              >
                <Plus className="mr-1 h-4 w-4" />
                New
              </Button>
            </div>
=======
			toast({
				title: "Note Saved",
				description: "Your note has been saved successfully",
			});
		}
	};
>>>>>>> main

	return (
		<div className="min-h-full bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
			<div className="flex h-full">
				{/* Sidebar */}
				<div className="w-1/3 animate-slide-in-left border-slate-200 border-r bg-white/50 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/30">
					<div className="space-y-4 p-6">
						<div className="flex animate-fade-in-up items-center justify-between">
							<h2 className="font-bold text-2xl text-slate-900 dark:text-slate-100">
								Notes
							</h2>
							<Button
								onClick={handleCreateNote}
								size="sm"
								className="bg-emerald-600 text-white transition-all duration-200 hover:scale-105 hover:bg-emerald-700"
							>
								<Plus className="mr-1 h-4 w-4" />
								New
							</Button>
						</div>

						<div
							className="flex animate-fade-in-up items-center space-x-2"
							style={{ animationDelay: "0.1s" }}
						>
							<Search className="h-4 w-4 text-slate-400" />
							<Input
								placeholder="Search notes..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="border-slate-300 bg-white text-slate-900 focus:border-emerald-500 focus:ring-emerald-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
							/>
						</div>

						<div
							className="animate-fade-in-up"
							style={{ animationDelay: "0.2s" }}
						>
							<Select
								value={selectedWorkspace}
								onValueChange={setSelectedWorkspace}
							>
								<SelectTrigger className="border-slate-300 bg-white text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100">
									<SelectValue placeholder="Select workspace" />
								</SelectTrigger>
								<SelectContent className="border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800">
									{workspaces.map((workspace) => (
										<SelectItem
											key={workspace}
											value={workspace}
											className="text-slate-900 dark:text-slate-100"
										>
											{workspace === "all" ? "All Workspaces" : workspace}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>

					<div className="space-y-2 overflow-y-auto px-6 pb-6">
						{filteredNotes.map((note, index) => (
							<Card
								key={note.id}
								className={`animate-fade-in-up cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
									selectedNote?.id === note.id
										? "border-emerald-300 bg-emerald-50 shadow-lg dark:border-emerald-500 dark:bg-emerald-900/20"
										: "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600"
								}`}
								style={{ animationDelay: `${0.3 + index * 0.1}s` }}
								onClick={() => setSelectedNote(note)}
							>
								<CardHeader className="p-4">
									<CardTitle className="truncate text-slate-900 text-sm dark:text-slate-100">
										{note.title}
									</CardTitle>
									<CardDescription className="text-slate-500 text-xs dark:text-slate-400">
										{note.workspace} • {note.updatedAt}
									</CardDescription>
								</CardHeader>
							</Card>
						))}
					</div>
				</div>

<<<<<<< HEAD
              <div className="flex-1 p-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                {isEditing ? (
                  <div className="h-full space-y-4">
                    <Input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="border-slate-300 bg-white font-semibold text-lg text-slate-900 focus:border-emerald-500 focus:ring-emerald-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                      placeholder="Note title..."
                    />
                    <TipTapEditor
                      content={editContent}
                      onChange={setEditContent}
                      placeholder="Start writing your note here..."
                    />
                  </div>
                ) : (
                  <div className="prose prose-slate dark:prose-invert max-w-none">
                    <div 
                      className="rounded-lg border border-slate-200 bg-white p-6 text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300"
                      dangerouslySetInnerHTML={{ __html: selectedNote.content }}
                    />
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-1 animate-fade-in-up items-center justify-center">
              <div className="text-center">
                <FileText className="mx-auto mb-4 h-12 w-12 animate-pulse-slow text-slate-400" />
                <h3 className="mb-2 font-medium text-lg text-slate-700 dark:text-slate-300">No note selected</h3>
                <p className="text-slate-500 dark:text-slate-400">Select a note from the sidebar or create a new one</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
=======
				{/* Main Content */}
				<div className="flex flex-1 animate-slide-in-right flex-col">
					{selectedNote ? (
						<>
							<div className="animate-fade-in-up border-slate-200 border-b bg-white/50 p-6 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/30">
								<div className="flex items-center justify-between">
									<div className="flex items-center space-x-4">
										<FileText className="h-5 w-5 text-slate-400" />
										<div>
											<h1 className="font-semibold text-slate-900 text-xl dark:text-slate-100">
												{isEditing ? editTitle : selectedNote.title}
											</h1>
											<p className="text-slate-500 text-sm dark:text-slate-400">
												{selectedNote.workspace} • Updated{" "}
												{selectedNote.updatedAt}
											</p>
										</div>
									</div>
									<div className="flex items-center space-x-2">
										{isEditing ? (
											<Button
												onClick={handleSaveNote}
												className="bg-emerald-600 text-white transition-all duration-200 hover:scale-105 hover:bg-emerald-700"
											>
												<Save className="mr-2 h-4 w-4" />
												Save
											</Button>
										) : (
											<Button
												onClick={() => handleEditNote(selectedNote)}
												variant="outline"
												className="border-slate-300 text-slate-700 transition-all duration-200 hover:scale-105 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
											>
												<Edit3 className="mr-2 h-4 w-4" />
												Edit
											</Button>
										)}
									</div>
								</div>
							</div>

							<div
								className="flex-1 animate-fade-in-up p-6"
								style={{ animationDelay: "0.2s" }}
							>
								{isEditing ? (
									<div className="h-full space-y-4">
										<Input
											value={editTitle}
											onChange={(e) => setEditTitle(e.target.value)}
											className="border-slate-300 bg-white font-semibold text-lg text-slate-900 focus:border-emerald-500 focus:ring-emerald-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
											placeholder="Note title..."
										/>
										<TipTapEditor
											content={editContent}
											onChange={setEditContent}
											placeholder="Start writing your note here..."
										/>
									</div>
								) : (
									<div className="prose prose-slate dark:prose-invert max-w-none">
										<div
											className="rounded-lg border border-slate-200 bg-white p-6 text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300"
											dangerouslySetInnerHTML={{ __html: selectedNote.content }}
										/>
									</div>
								)}
							</div>
						</>
					) : (
						<div className="flex flex-1 animate-fade-in-up items-center justify-center">
							<div className="text-center">
								<FileText className="mx-auto mb-4 h-12 w-12 animate-pulse-slow text-slate-400" />
								<h3 className="mb-2 font-medium text-lg text-slate-700 dark:text-slate-300">
									No note selected
								</h3>
								<p className="text-slate-500 dark:text-slate-400">
									Select a note from the sidebar or create a new one
								</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
>>>>>>> main
};

export default NotesWrapper;
