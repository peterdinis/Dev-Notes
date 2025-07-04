"use client";

import {
	FileText,
	MessageSquare,
	Network,
	Shield,
	Users,
	Zap,
} from "lucide-react";
import { type FC, createElement } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";

const features = [
	{
		icon: FileText,
		title: "Smart Notes",
		description:
			"Create and organize your notes with our advanced editor featuring syntax highlighting and rich formatting.",
		color: "text-blue-600 dark:text-blue-300",
	},
	{
		icon: MessageSquare,
		title: "AI Assistant",
		description:
			"Get help with your projects using our intelligent AI assistant that understands your development workflow.",
		color: "text-purple-600 dark:text-purple-300",
	},
	{
		icon: Network,
		title: "UML Diagrams",
		description:
			"Design and visualize your system architecture with our intuitive diagram creation tools.",
		color: "text-green-600 dark:text-green-300",
	},
	{
		icon: Users,
		title: "Team Collaboration",
		description:
			"Work together with your team in real-time with integrated chat and shared workspaces.",
		color: "text-yellow-600 dark:text-yellow-300",
	},
	{
		icon: Zap,
		title: "Fast & Efficient",
		description:
			"Built for speed with modern technologies to keep your development workflow smooth.",
		color: "text-pink-600 dark:text-pink-300",
	},
	{
		icon: Shield,
		title: "Secure & Private",
		description:
			"Your data is protected with enterprise-grade security and privacy controls.",
		color: "text-red-600 dark:text-red-300",
	},
];

const FeaturesSection: FC = () => {
	return (
		<section className="bg-white/50 px-4 py-12 sm:px-6 sm:py-20 lg:px-8 dark:bg-slate-900/50">
			<div className="container mx-auto">
				<div className="mb-12 text-center sm:mb-16">
					<h2 className="mb-4 font-bold text-2xl text-slate-900 sm:text-3xl md:text-4xl dark:text-slate-100">
						Everything You Need to Build Better
					</h2>
					<p className="mx-auto max-w-3xl text-lg text-slate-600 sm:text-xl dark:text-slate-400">
						Powerful tools designed to enhance your development workflow and
						team collaboration
					</p>
				</div>

				<div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
					{features.map((feature, index) => (
						<Card
							key={index}
							className="group animate-fade-in-up border-0 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:bg-slate-800/80"
							style={{ animationDelay: `${index * 0.1}s` }}
						>
							<CardHeader className="pb-4">
								<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-100 to-blue-100 transition-transform duration-300 group-hover:scale-110 dark:from-emerald-900/20 dark:to-blue-900/20">
									{createElement(feature.icon, {
										className: `h-6 w-6 ${feature.color}`,
									})}
								</div>
								<CardTitle className="text-lg text-slate-900 sm:text-xl dark:text-slate-100">
									{feature.title}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-slate-600 text-sm leading-relaxed sm:text-base dark:text-slate-400">
									{feature.description}
								</CardDescription>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
};

export default FeaturesSection;
