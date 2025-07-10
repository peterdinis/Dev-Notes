import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const HeroWrapper: FC = () => {
	return (
		<>
			<section className="px-4 pt-20 pb-12 sm:px-6 sm:pt-24 sm:pb-20 lg:px-8">
				<div className="container mx-auto text-center">
					<div className="mx-auto max-w-4xl">
						<Badge
							variant="outline"
							className="mb-4 border-emerald-200 text-emerald-700 sm:mb-6 dark:border-emerald-800 dark:text-emerald-300"
						>
							✨ New AI-Powered Features Available
						</Badge>
						<h1 className="mb-4 font-bold text-3xl text-slate-900 leading-tight sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl dark:text-slate-100">
							The Ultimate
							<span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
								{" "}
								Developer{" "}
							</span>
							Workspace
						</h1>
						<p className="mx-auto mb-6 max-w-3xl text-lg text-slate-600 leading-relaxed sm:mb-8 sm:text-xl dark:text-slate-400">
							Streamline your development workflow with intelligent notes, AI
							assistance, collaborative diagrams, and real-time team
							communication - all in one powerful platform.
						</p>
						<div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
							<Link href="/account/create">
								<Button
									size="lg"
									className="w-full gap-2 bg-emerald-600 px-6 text-base hover:bg-emerald-700 sm:w-auto sm:px-8 sm:text-lg"
								>
									Start Building Now
									<ArrowRight className="h-5 w-5" />
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default HeroWrapper;
