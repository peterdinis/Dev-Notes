import { useState, type FC } from "react";
import { Plus, Search, Edit3, Save, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import TipTapEditor from "@/components/TipTapEditor";

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
      content: "<h1>React Hooks Best Practices</h1><h2>useState</h2><p>Always use functional updates when the new state depends on the previous state</p><ul><li>Group related state variables</li><li>Use descriptive names</li></ul><pre><code>const [count, setCount] = useState(0);\nsetCount(prev => prev + 1);</code></pre><h2>useEffect</h2><p>Always include dependencies in the dependency array</p><ul><li>Use cleanup functions for subscriptions</li><li>Separate concerns with multiple useEffect hooks</li></ul>",
      workspace: "React Project",
      tags: ["react", "hooks", "best-practices"],
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20"
    },
    {
      id: "2",
      title: "API Authentication Flow",
      content: "<h1>API Authentication Flow</h1><h2>JWT Token Implementation</h2><ol><li>User login with credentials</li><li>Server validates and returns JWT token</li><li>Client stores token securely</li><li>Include token in Authorization header</li></ol><pre><code>const headers = {\n  'Authorization': `Bearer ${token}`,\n  'Content-Type': 'application/json'\n};</code></pre>",
      workspace: "API Documentation",
      tags: ["api", "authentication", "jwt"],
      createdAt: "2024-01-10",
      updatedAt: "2024-01-18"
    }
  ]);

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWorkspace, setSelectedWorkspace] = useState("all");
  const [editContent, setEditContent] = useState("");
  const [editTitle, setEditTitle] = useState("");

  const workspaces = ["all", "React Project", "API Documentation"];

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesWorkspace = selectedWorkspace === "all" || note.workspace === selectedWorkspace;
    return matchesSearch && matchesWorkspace;
  });

  const handleCreateNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "New Note",
      content: "<h1>New Note</h1><p>Start writing your note here...</p>",
      workspace: selectedWorkspace === "all" ? "React Project" : selectedWorkspace,
      tags: [],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
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
      const updatedNotes = notes.map(note =>
        note.id === selectedNote.id
          ? {
              ...note,
              title: editTitle,
              content: editContent,
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : note
      );
      setNotes(updatedNotes);
      setSelectedNote({
        ...selectedNote,
        title: editTitle,
        content: editContent,
        updatedAt: new Date().toISOString().split('T')[0]
      });
      setIsEditing(false);
      
      toast({
        title: "Note Saved",
        description: "Your note has been saved successfully",
      });
    }
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-1/3 border-r border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/30 backdrop-blur-sm animate-slide-in-left">
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between animate-fade-in-up">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Notes</h2>
              <Button
                onClick={handleCreateNote}
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-200 hover:scale-105"
              >
                <Plus className="w-4 h-4 mr-1" />
                New
              </Button>
            </div>

            <div className="flex items-center space-x-2 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <Search className="w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Select value={selectedWorkspace} onValueChange={setSelectedWorkspace}>
                <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100">
                  <SelectValue placeholder="Select workspace" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600">
                  {workspaces.map((workspace) => (
                    <SelectItem key={workspace} value={workspace} className="text-slate-900 dark:text-slate-100">
                      {workspace === "all" ? "All Workspaces" : workspace}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="px-6 pb-6 space-y-2 overflow-y-auto">
            {filteredNotes.map((note, index) => (
              <Card
                key={note.id}
                className={`cursor-pointer transition-all duration-200 hover:scale-[1.02] animate-fade-in-up ${
                  selectedNote?.id === note.id
                    ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-500 shadow-lg"
                    : "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md"
                }`}
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                onClick={() => setSelectedNote(note)}
              >
                <CardHeader className="p-4">
                  <CardTitle className="text-sm text-slate-900 dark:text-slate-100 truncate">
                    {note.title}
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
                    {note.workspace} • {note.updatedAt}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col animate-slide-in-right">
          {selectedNote ? (
            <>
              <div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/30 backdrop-blur-sm animate-fade-in-up">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <FileText className="w-5 h-5 text-slate-400" />
                    <div>
                      <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                        {isEditing ? editTitle : selectedNote.title}
                      </h1>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {selectedNote.workspace} • Updated {selectedNote.updatedAt}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isEditing ? (
                      <Button 
                        onClick={handleSaveNote} 
                        className="bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-200 hover:scale-105"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => handleEditNote(selectedNote)} 
                        variant="outline" 
                        className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 hover:scale-105"
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex-1 p-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                {isEditing ? (
                  <div className="space-y-4 h-full">
                    <Input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 text-lg font-semibold focus:ring-emerald-500 focus:border-emerald-500"
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
                      className="text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm"
                      dangerouslySetInnerHTML={{ __html: selectedNote.content }}
                    />
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center animate-fade-in-up">
              <div className="text-center">
                <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4 animate-pulse-slow" />
                <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">No note selected</h3>
                <p className="text-slate-500 dark:text-slate-400">Select a note from the sidebar or create a new one</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesWrapper;