import { FileText } from "lucide-react";
import type { FC } from "react";

const Footer: FC = () => {
	return (
		<footer className="bg-slate-900 px-4 py-8 sm:px-6 sm:py-12 lg:px-8 dark:bg-slate-950">
			<div className="container mx-auto">
				<div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
					<div className="flex items-center gap-2">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-600 to-blue-600">
							<FileText className="h-4 w-4 text-white" />
						</div>
						<span className="font-bold text-white text-xl">DevNotes</span>
					</div>
					<p className="text-center text-slate-400 text-sm sm:text-left">
						© 2025 DevNotes. All rights reserved. Built with ❤️ for developers.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
