"use client"

import { Network, FileText, MessageSquare, Users, Zap, Shield } from "lucide-react";
import type { FC, JSX } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../ui/card";

const features = [
    {
      icon: FileText,
      title: "Smart Notes",
      description: "Create and organize your notes with our advanced editor featuring syntax highlighting and rich formatting."
    },
    {
      icon: MessageSquare,
      title: "AI Assistant",
      description: "Get help with your projects using our intelligent AI assistant that understands your development workflow."
    },
    {
      icon: Network,
      title: "UML Diagrams",
      description: "Design and visualize your system architecture with our intuitive diagram creation tools."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work together with your team in real-time with integrated chat and shared workspaces."
    },
    {
      icon: Zap,
      title: "Fast & Efficient",
      description: "Built for speed with modern technologies to keep your development workflow smooth."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security and privacy controls."
    }
  ];

const FeaturesSection: FC = () => {
    return (
         <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Everything You Need to Build Better
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Powerful tools designed to enhance your development workflow and team collaboration
            </p>
          </div>
          
          <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-blue-100 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    ICON TODO
                  </div>
                  <CardTitle className="text-lg sm:text-xl text-slate-900 dark:text-slate-100">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
}

export default FeaturesSection