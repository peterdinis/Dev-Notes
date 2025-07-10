"use client";

import { type FC } from "react";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";

const ProfileDropdown: FC = () => {

	const {user} = useKindeBrowserClient();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="rounded-full p-1">
					<Avatar>
						<AvatarFallback>
							{user?.email}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				className="w-48 rounded-md bg-white dark:bg-background p-2 shadow-md"
				sideOffset={5}
				align="end"
			>
				<div className="mb-2 border-b p-2">
					<p className="text-muted-foreground text-xs">{user?.email}</p>
				</div>

				<DropdownMenuItem
					className="cursor-pointer rounded px-2 py-1"
				>
					<LogoutLink href="/login">Logout</LogoutLink>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ProfileDropdown;
