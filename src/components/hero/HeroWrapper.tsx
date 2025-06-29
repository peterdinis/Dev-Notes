import type { FC } from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";

const HeroWrapper: FC = () => {
    return (
        <>
            <section className="pt-20 sm:pt-24 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto text-center">
                    <div className="max-w-4xl mx-auto">
                        <Badge variant="outline" className="mb-4 sm:mb-6 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800">
                            ✨ New AI-Powered Features Available
                        </Badge>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-4 sm:mb-6 leading-tight">
                            The Ultimate
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600"> Developer </span>
                            Workspace
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
                            Streamline your development workflow with intelligent notes, AI assistance, collaborative diagrams, and real-time team communication - all in one powerful platform.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                            <Link href="/app">
                                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 gap-2 w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8">
                                    Start Building Now
                                    <ArrowRight className="w-5 h-5" />
                                </Button>
                            </Link>
                            <Button variant="outline" size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8">
                                Watch Demo
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HeroWrapper