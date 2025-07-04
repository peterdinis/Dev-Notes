"use client"

import { useState, type FC } from "react";
import { Plus, Edit, Trash2, Copy, Download, Eye, Grid, List, ZoomIn, ZoomOut } from "lucide-react";
import { Label } from "../ui/label";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import DashboardLayout from "../dashboard/DashboardLayout";


const mockDiagrams = [
  {
    id: 1,
    name: "User Authentication Flow",
    description: "Diagram illustrating the user authentication process",
    type: "Sequence",
    nodes: [
      { id: 101, name: "User", type: "Actor", description: "The user", x: 50, y: 100 },
      { id: 102, name: "Login Page", type: "UI", description: "Login form", x: 200, y: 100 },
      { id: 103, name: "Auth Service", type: "Service", description: "Authentication backend", x: 400, y: 100 },
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
      { id: 201, name: "Web App", type: "Component", description: "Frontend interface", x: 50, y: 100 },
      { id: 202, name: "Order Service", type: "Service", description: "Handles order creation", x: 200, y: 100 },
      { id: 203, name: "Payment Gateway", type: "External", description: "Processes payments", x: 400, y: 100 },
    ],
    createdAt: "2024-04-03",
    updatedAt: "2024-04-07",
  },
];

const UmlWrapper: FC = () => {
  const [diagrams, setDiagrams] = useState(mockDiagrams);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showPreview, setShowPreview] = useState(false);

  const addDiagram = (newDiagram: any) => {
    setDiagrams([...diagrams, newDiagram]);
  };

  const updateDiagram = (updatedDiagram: any) => {
    setDiagrams(diagrams.map(diagram => diagram.id === updatedDiagram.id ? updatedDiagram : diagram));
  };

  const deleteDiagram = (id: number) => {
    setDiagrams(diagrams.filter(diagram => diagram.id !== id));
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
  };

  return (
    <DashboardLayout>
        <div className="container mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6 animate-fade-in-up max-w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2 truncate">UML Diagrams</h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">Create and manage your system diagrams</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          {/* View Options */}
          <div className="flex items-center gap-2">
            <Label className="text-sm font-medium whitespace-nowrap">View:</Label>
            <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as 'grid' | 'list')}>
              <ToggleGroupItem value="grid" aria-label="Grid view" size="sm">
                <Grid className="w-4 h-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="list" aria-label="List view" size="sm">
                <List className="w-4 h-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleZoomOut}>
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium min-w-[50px] text-center">{zoomLevel}%</span>
            <Button variant="outline" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2 w-full sm:w-auto">
                <Plus className="w-4 h-4" />
                <span className="sm:inline">New Diagram</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-2xl mx-auto">
              <DialogHeader>
                <DialogTitle>Create New Diagram</DialogTitle>
                <DialogDescription>
                  Fill in the details for your new UML diagram
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="sm:text-right">
                    Name
                  </Label>
                  <Input id="name" defaultValue="New Diagram" className="sm:col-span-3" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="sm:text-right">
                    Description
                  </Label>
                  <Textarea id="description" className="sm:col-span-3" defaultValue="Brief description of the diagram" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="sm:text-right">
                    Type
                  </Label>
                  <Select>
                    <SelectTrigger className="sm:col-span-3">
                      <SelectValue placeholder="Select diagram type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sequence">Sequence Diagram</SelectItem>
                      <SelectItem value="component">Component Diagram</SelectItem>
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
      {viewMode === 'grid' ? (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {diagrams.map((diagram, index) => (
            <Card key={diagram.id} className="group hover:shadow-lg transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s`, transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left' }}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-lg truncate">{diagram.name}</CardTitle>
                    <CardDescription className="mt-1 line-clamp-2">{diagram.description}</CardDescription>
                  </div>
                  <Badge variant="outline" className="ml-2 flex-shrink-0">
                    {diagram.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 mb-4 min-h-[120px] flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600">
                  <div className="text-center text-slate-500 dark:text-slate-400">
                    <div className="text-2xl mb-2">📊</div>
                    <p className="text-sm">{diagram.nodes.length} components</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 sm:gap-2 flex-wrap">
                    <Button variant="ghost" size="sm" onClick={() => setShowPreview(true)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => deleteDiagram(diagram.id)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
                <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
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
                <div key={diagram.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors animate-fade-in-up gap-3 sm:gap-4" style={{ animationDelay: `${index * 0.05}s` }}>
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">📊</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-slate-900 dark:text-slate-100 truncate">{diagram.name}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{diagram.description}</p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <Badge variant="outline" className="text-xs">{diagram.type}</Badge>
                        <span className="text-xs text-slate-500">{diagram.nodes.length} components</span>
                        <span className="text-xs text-slate-500">Updated {diagram.updatedAt}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 flex-wrap sm:flex-nowrap">
                    <Button variant="ghost" size="sm" onClick={() => setShowPreview(true)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => deleteDiagram(diagram.id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
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
        <DialogContent className="w-[95vw] max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Diagram Preview</DialogTitle>
            <DialogDescription>
              Full view of your UML diagram
            </DialogDescription>
          </DialogHeader>
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-8 min-h-[400px] flex items-center justify-center">
            <div className="text-center text-slate-500 dark:text-slate-400">
              <div className="text-6xl mb-4">📊</div>
              <p>Diagram preview would be rendered here</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    </DashboardLayout>
  );
};

export default UmlWrapper
