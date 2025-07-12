"use client";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import type { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

const ProfileDropdown: FC = () => {
	const { user } = useKindeBrowserClient();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="rounded-full p-1">
					<Avatar>
						<AvatarFallback>{user?.email}</AvatarFallback>
						<AvatarImage src={user?.picture!} />
					</Avatar>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				className="w-48 rounded-md bg-white p-2 shadow-md dark:bg-background"
				sideOffset={5}
				align="end"
			>
				<DropdownMenuItem className="mb-2 border-b p-2">
					<p className="text-muted-foreground">{user?.email}</p>
				</DropdownMenuItem>

				<DropdownMenuItem className="mb-2 border-b p-2">
					<Link className="text-muted-foreground" href="/dashboard">
						Dashboard
					</Link>
				</DropdownMenuItem>

				<DropdownMenuItem className="cursor-pointer rounded px-2 py-1">
					<LogoutLink postLogoutRedirectURL="/login">Logout</LogoutLink>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ProfileDropdown;
