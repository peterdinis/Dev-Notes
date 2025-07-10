"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { FileText } from "lucide-react";
import type { FC } from "react";
import ProfileDropdown from "../auth/ProfileDropdown";
import { ModeToggle } from "./ModeToggle";

const Navigation: FC = () => {
	const { user } = useKindeBrowserClient();
	return (
		<nav className="fixed top-0 z-50 w-full border-slate-200 border-b bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex h-14 items-center justify-between sm:h-16">
					<div className="flex items-center gap-2">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-600 to-blue-600">
							<FileText className="h-4 w-4 text-white" />
						</div>
						<span className="font-bold text-slate-900 text-xl dark:text-slate-100">
							DevNotes
						</span>
					</div>
					<div className="flex items-center gap-3 sm:gap-4">
						{user && <ProfileDropdown />}
						<ModeToggle />
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
