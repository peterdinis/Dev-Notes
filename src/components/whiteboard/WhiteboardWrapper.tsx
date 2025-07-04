"use client"

import { useState, useRef, useEffect, type MouseEvent, type FC } from "react";
import { 
  Pencil, 
  Square, 
  Circle, 
  Type, 
  Eraser, 
  Download, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut,
  Move
} from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import DashboardLayout from "../dashboard/DashboardLayout";

type Tool = 'pen' | 'rectangle' | 'circle' | 'text' | 'eraser' | 'move';
type DrawingElement = {
  id: string;
  type: Tool;
  x: number;
  y: number;
  width?: number;
  height?: number;
  points?: { x: number; y: number }[];
  text?: string;
  color: string;
  strokeWidth: number;
};

const WhiteboardWrapper: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedTool, setSelectedTool] = useState<Tool>('pen');
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [isDrawing, setIsDrawing] = useState(false);
  const [elements, setElements] = useState<DrawingElement[]>([]);
  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

  const colors = [
    '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
    '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#FFC0CB'
  ];

  const tools = [
    { name: 'pen', icon: Pencil, label: 'Pen' },
    { name: 'rectangle', icon: Square, label: 'Rectangle' },
    { name: 'circle', icon: Circle, label: 'Circle' },
    { name: 'text', icon: Type, label: 'Text' },
    { name: 'eraser', icon: Eraser, label: 'Eraser' },
    { name: 'move', icon: Move, label: 'Move' }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Clear and redraw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Apply zoom and pan
    ctx.save();
    ctx.scale(zoom, zoom);
    ctx.translate(panOffset.x, panOffset.y);

    // Draw elements
    elements.forEach(element => {
      ctx.strokeStyle = element.color;
      ctx.lineWidth = element.strokeWidth;
      ctx.fillStyle = element.color;

      switch (element.type) {
        case 'pen':
          if (element.points && element.points.length > 1) {
            ctx.beginPath();
            ctx.moveTo(element.points[0]!.x, element.points[0]!.y);
            element.points.forEach(point => {
              ctx.lineTo(point.x, point.y);
            });
            ctx.stroke();
          }
          break;
        case 'rectangle':
          if (element.width && element.height) {
            ctx.strokeRect(element.x, element.y, element.width, element.height);
          }
          break;
        case 'circle':
          if (element.width) {
            ctx.beginPath();
            ctx.arc(element.x + element.width/2, element.y + element.width/2, Math.abs(element.width/2), 0, 2 * Math.PI);
            ctx.stroke();
          }
          break;
        case 'text':
          if (element.text) {
            ctx.font = `${element.strokeWidth * 8}px Arial`;
            ctx.fillText(element.text, element.x, element.y);
          }
          break;
      }
    });

    ctx.restore();
  }, [elements, zoom, panOffset]);

  const getMousePos = (e: MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left - panOffset.x) / zoom,
      y: (e.clientY - rect.top - panOffset.y) / zoom
    };
  };

  const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
    const pos = getMousePos(e);
    setIsDrawing(true);

    if (selectedTool === 'text') {
      const text = prompt('Enter text:');
      if (text) {
        const newElement: DrawingElement = {
          id: Date.now().toString(),
          type: 'text',
          x: pos.x,
          y: pos.y,
          text,
          color: selectedColor,
          strokeWidth
        };
        setElements(prev => [...prev, newElement]);
      }
      return;
    }

    const newElement: DrawingElement = {
      id: Date.now().toString(),
      type: selectedTool,
      x: pos.x,
      y: pos.y,
      color: selectedColor,
      strokeWidth,
      points: selectedTool === 'pen' ? [pos] : undefined
    };

    setElements(prev => [...prev, newElement]);
  };

  const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const pos = getMousePos(e);

    setElements(prev => {
      const newElements = [...prev];
      const currentElement = newElements[newElements.length - 1]!;

      if (selectedTool === 'pen' && currentElement.points) {
        currentElement.points.push(pos);
      } else if (selectedTool === 'rectangle' || selectedTool === 'circle') {
        currentElement.width = pos.x - currentElement.x;
        currentElement.height = pos.y - currentElement.y;
      }

      return newElements;
    });
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    setElements([]);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.1));
  };

  const exportCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'whiteboard.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <DashboardLayout>
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-950 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
            Whiteboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Collaborate and brainstorm with your team
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
            Zoom: {Math.round(zoom * 100)}%
          </Badge>
          <Button onClick={handleZoomIn} variant="outline" size="sm">
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button onClick={handleZoomOut} variant="outline" size="sm">
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button onClick={exportCanvas} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={clearCanvas} variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-4 p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap gap-2">
          {tools.map((tool) => (
            <Button
              key={tool.name}
              onClick={() => setSelectedTool(tool.name as Tool)}
              variant={selectedTool === tool.name ? "default" : "outline"}
              size="sm"
              className={selectedTool === tool.name ? "bg-emerald-600 hover:bg-emerald-700" : ""}
            >
              <tool.icon className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">{tool.label}</span>
            </Button>
          ))}
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600 dark:text-slate-400 hidden sm:inline">Color:</span>
          <div className="flex gap-1">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded border-2 ${
                  selectedColor === color ? 'border-slate-400' : 'border-slate-200 dark:border-slate-700'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <Input
            type="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-12 h-8 p-0 border-0"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600 dark:text-slate-400 hidden sm:inline">Size:</span>
          <Input
            type="range"
            min="1"
            max="10"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(Number(e.target.value))}
            className="w-20"
          />
          <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[20px]">
            {strokeWidth}
          </span>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 relative overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-crosshair bg-white dark:bg-slate-100"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      </div>
    </div>
    </DashboardLayout>
  );
};

export default WhiteboardWrapper;