"use client";

import { useRouter } from "next/navigation";
import { type FC} from "react";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { api } from "~/trpc/react";

const ProfileDropdown: FC = () => {
	const { data: meData } = api.auth.me.useQuery();
	const logoutMutation = api.auth.logout.useMutation();
  const router = useRouter()

  console.log("MeData", meData);

	const handleLogout = async () => {
		const res = await logoutMutation.mutateAsync();
		document.cookie = res.emptySessionCookie;
		router.push("/login");
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="rounded-full p-1">
					<Avatar>
						<AvatarFallback>{meData?.email}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				className="w-48 rounded-md bg-white dark:bg-background p-2 shadow-md"
				sideOffset={5}
				align="end"
			>
				<div className="mb-2 border-b p-2">
					<p className="text-muted-foreground text-xs">{meData?.email!}</p>
				</div>

				<DropdownMenuItem
					className="cursor-pointer rounded px-2 py-1"
					onSelect={(e) => {
						e.preventDefault();
						handleLogout();
					}}
				>
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ProfileDropdown;
