"use client";

import { Bot, Code, FileText, Send, Sparkles, User } from "lucide-react";
import { type FC, useState } from "react";
import { useToast } from "~/hooks/shared/use-toast";
import DashboardLayout from "../dashboard/DashboardLayout";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";

interface Message {
	id: string;
	role: "user" | "assistant";
	content: string;
	timestamp: string;
}

const AiChatWrapper: FC = () => {
	const { toast } = useToast();
	const [messages, setMessages] = useState<Message[]>([
		{
			id: "1",
			role: "assistant",
			content:
				"Hello! I'm your AI programming assistant. I can help you with:\n\n• Code review and optimization\n• Debugging and troubleshooting\n• Architecture and design patterns\n• Documentation and explanations\n• Best practices and recommendations\n\nWhat would you like to work on today?",
			timestamp: new Date().toLocaleTimeString(),
		},
	]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	// Mock AI responses for different types of queries
	const mockResponses = {
		code: "Here's how you can improve your code:\n\n```javascript\n// Before\nfunction fetchData() {\n  fetch('/api/data')\n    .then(res => res.json())\n    .then(data => console.log(data));\n}\n\n// After - with error handling\nasync function fetchData() {\n  try {\n    const response = await fetch('/api/data');\n    if (!response.ok) {\n      throw new Error(`HTTP error! status: ${response.status}`);\n    }\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error('Fetch error:', error);\n    throw error;\n  }\n}\n```\n\nKey improvements:\n• Added proper error handling\n• Used async/await for better readability\n• Added HTTP status validation\n• Return the data for reusability",

		react:
			'Here are some React best practices:\n\n**1. Component Structure**\n```jsx\n// Good: Functional component with hooks\nconst UserProfile = ({ userId }) => {\n  const [user, setUser] = useState(null);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    fetchUser(userId).then(setUser).finally(() => setLoading(false));\n  }, [userId]);\n\n  if (loading) return <LoadingSpinner />;\n  if (!user) return <NotFound />;\n\n  return (\n    <div className="user-profile">\n      <h1>{user.name}</h1>\n      <p>{user.email}</p>\n    </div>\n  );\n};\n```\n\n**2. Performance Optimization**\n• Use React.memo for expensive components\n• Implement useMemo and useCallback for heavy computations\n• Avoid inline objects in JSX props\n\n**3. State Management**\n• Keep state as close to where it\'s used as possible\n• Use useReducer for complex state logic\n• Consider context for deeply nested prop drilling',

		debugging:
			"Here's a systematic approach to debugging:\n\n**1. Console Debugging**\n```javascript\n// Add strategic console.logs\nconsole.log('Function called with:', parameters);\nconsole.log('State before update:', currentState);\nconsole.log('API response:', response);\n```\n\n**2. Browser DevTools**\n• Use breakpoints in Sources tab\n• Inspect network requests in Network tab\n• Check React DevTools for component state\n\n**3. Error Boundaries**\n```jsx\nclass ErrorBoundary extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = { hasError: false, error: null };\n  }\n\n  static getDerivedStateFromError(error) {\n    return { hasError: true, error };\n  }\n\n  render() {\n    if (this.state.hasError) {\n      return <div>Something went wrong: {this.state.error.message}</div>;\n    }\n    return this.props.children;\n  }\n}\n```\n\n**4. Common Issues**\n• Async/await without try-catch\n• Missing dependency arrays in useEffect\n• State mutations instead of immutable updates",

		default:
			"I understand you're looking for programming help. Based on your query, here are some suggestions:\n\n• **Code Review**: Share your code and I'll analyze it for improvements\n• **Architecture**: Discuss system design and best practices\n• **Debugging**: Help identify and fix issues in your code\n• **Performance**: Optimize your application for better performance\n• **Documentation**: Create clear documentation for your projects\n\nCould you share more specific details about what you're working on? The more context you provide, the better I can assist you!",
	};

	const generateMockResponse = (userMessage: string): string => {
		const message = userMessage.toLowerCase();

		if (
			message.includes("code") ||
			message.includes("function") ||
			message.includes("error")
		) {
			return mockResponses.code;
		} else if (
			message.includes("react") ||
			message.includes("component") ||
			message.includes("hook")
		) {
			return mockResponses.react;
		} else if (
			message.includes("debug") ||
			message.includes("bug") ||
			message.includes("problem")
		) {
			return mockResponses.debugging;
		} else {
			return mockResponses.default;
		}
	};

	const handleSendMessage = async () => {
		if (!input.trim()) return;

		const userMessage: Message = {
			id: Date.now().toString(),
			role: "user",
			content: input,
			timestamp: new Date().toLocaleTimeString(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setInput("");
		setIsLoading(true);

		// Simulate AI response delay
		setTimeout(() => {
			const aiResponse: Message = {
				id: (Date.now() + 1).toString(),
				role: "assistant",
				content: generateMockResponse(input),
				timestamp: new Date().toLocaleTimeString(),
			};

			setMessages((prev) => [...prev, aiResponse]);
			setIsLoading(false);

			toast({
				title: "AI Response Generated",
				description: "Your programming assistant has responded",
			});
		}, 1500);
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	const quickPrompts = [
		{
			icon: Code,
			text: "Review my React code",
			prompt: "Can you review my React component code for best practices?",
		},
		{
			icon: FileText,
			text: "Explain this pattern",
			prompt: "Can you explain the Observer design pattern with examples?",
		},
		{
			icon: Sparkles,
			text: "Optimize performance",
			prompt: "How can I optimize the performance of my web application?",
		},
	];

	return (
		<DashboardLayout>
			<div className="flex h-full flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
				<div className="border-slate-700 border-b bg-slate-900/30 p-6 backdrop-blur-sm">
					<div className="mx-auto max-w-4xl">
						<div className="flex items-center space-x-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-600">
								<Bot className="h-5 w-5 text-white" />
							</div>
							<div>
								<h1 className="font-bold text-2xl text-slate-100">
									AI Programming Assistant
								</h1>
								<p className="text-slate-400">
									Get help with coding, debugging, and best practices
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="mx-auto flex w-full max-w-4xl flex-1 flex-col p-6">
					{/* Quick Prompts */}
					{messages.length === 1 && (
						<div className="mb-6">
							<h3 className="mb-4 font-semibold text-lg text-slate-200">
								Quick Start
							</h3>
							<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
								{quickPrompts.map((prompt, index) => (
									<Card
										key={index}
										className="cursor-pointer border-slate-700 bg-slate-800/50 transition-all duration-200 hover:border-slate-600"
										onClick={() => setInput(prompt.prompt)}
									>
										<CardHeader className="p-4">
											<CardTitle className="flex items-center text-slate-200 text-sm">
												<prompt.icon className="mr-2 h-4 w-4 text-purple-400" />
												{prompt.text}
											</CardTitle>
										</CardHeader>
									</Card>
								))}
							</div>
						</div>
					)}

					{/* Messages */}
					<ScrollArea className="mb-4 flex-1">
						<div className="space-y-4">
							{messages.map((message) => (
								<div
									key={message.id}
									className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
								>
									<div
										className={`flex max-w-[80%] ${
											message.role === "user" ? "flex-row-reverse" : "flex-row"
										}`}
									>
										<div
											className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
												message.role === "user"
													? "ml-3 bg-purple-600"
													: "mr-3 bg-gradient-to-br from-blue-600 to-purple-600"
											}`}
										>
											{message.role === "user" ? (
												<User className="h-4 w-4 text-white" />
											) : (
												<Bot className="h-4 w-4 text-white" />
											)}
										</div>
										<div
											className={`rounded-lg p-4 ${
												message.role === "user"
													? "bg-purple-600 text-white"
													: "border border-slate-700 bg-slate-800 text-slate-100"
											}`}
										>
											<pre className="whitespace-pre-wrap font-sans text-sm">
												{message.content}
											</pre>
											<div className="mt-2 text-xs opacity-70">
												{message.timestamp}
											</div>
										</div>
									</div>
								</div>
							))}

							{isLoading && (
								<div className="flex justify-start">
									<div className="flex">
										<div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600">
											<Bot className="h-4 w-4 text-white" />
										</div>
										<div className="rounded-lg border border-slate-700 bg-slate-800 p-4 text-slate-100">
											<div className="flex items-center space-x-2">
												<div className="flex space-x-1">
													<div className="h-2 w-2 animate-bounce rounded-full bg-purple-500"></div>
													<div
														className="h-2 w-2 animate-bounce rounded-full bg-purple-500"
														style={{ animationDelay: "0.1s" }}
													></div>
													<div
														className="h-2 w-2 animate-bounce rounded-full bg-purple-500"
														style={{ animationDelay: "0.2s" }}
													></div>
												</div>
												<span className="text-slate-400 text-sm">
													AI is thinking...
												</span>
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
					</ScrollArea>

					{/* Input */}
					<div className="flex items-center space-x-2">
						<Input
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onKeyPress={handleKeyPress}
							placeholder="Ask me anything about programming..."
							className="flex-1 border-slate-600 bg-slate-800 text-slate-100"
							disabled={isLoading}
						/>
						<Button
							onClick={handleSendMessage}
							disabled={!input.trim() || isLoading}
							className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
						>
							<Send className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
};

export default AiChatWrapper;
