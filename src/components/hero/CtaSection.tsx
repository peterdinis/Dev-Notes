import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";
import { Button } from "../ui/button";

const CtaSection: FC = () => {
	return (
		<section className="bg-gradient-to-r from-emerald-600 to-blue-600 px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
			<div className="container mx-auto text-center">
				<div className="mx-auto max-w-3xl">
					<h2 className="mb-4 font-bold text-2xl text-white sm:mb-6 sm:text-3xl md:text-4xl">
						Ready to Transform Your Development Workflow?
					</h2>
					<p className="mb-6 text-emerald-100 text-lg sm:mb-8 sm:text-xl">
						Join thousands of developers who have already improved their
						productivity with DevNotes
					</p>
					<div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
						<Link href="/app">
							<Button
								size="lg"
								variant="secondary"
								className="w-full gap-2 bg-white px-6 text-base text-emerald-600 hover:bg-emerald-50 sm:w-auto sm:px-8 sm:text-lg"
							>
								Get Started Free
								<ArrowRight className="h-5 w-5" />
							</Button>
						</Link>
						<Button
							size="lg"
							variant="outline"
							className="w-full border-white px-6 text-base text-white hover:bg-white/10 sm:w-auto sm:px-8 sm:text-lg"
						>
							Schedule Demo
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CtaSection;
