"use client";

import { useRouter } from "next/navigation";
import { type FC} from "react";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
<<<<<<< HEAD
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { api } from '~/trpc/react';
import { useMemo, type FC } from 'react';
import Link from 'next/link';

const ProfileDropdown: FC = () => {
  const { data: meData } = api.auth.me.useQuery();

  console.log("MeData", meData)
  const logoutMutation = api.auth.logout.useMutation();
=======
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
>>>>>>> main

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

<<<<<<< HEAD
  const user = meData.user;

  const initials = useMemo(() => {
    return user.name
      .split(' ')
      .map((n: number[]) => n[0])
      .join('')
      .toUpperCase();
  }, [user.name]);

  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full p-1">
              <Avatar>
                <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-48 bg-white rounded-md shadow-md p-2" sideOffset={5} align="end">
            <div className="p-2 border-b mb-2">
              <p className="text-sm font-semibold">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>

            <DropdownMenuItem
              className="cursor-pointer px-2 py-1 rounded hover:bg-gray-100"
              onSelect={(e) => {
                e.preventDefault();
                handleLogout();
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button>
          <Link href="/login">Get Started</Link>
        </Button>
      )}
    </>
  );
}


export default ProfileDropdown;
=======
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
>>>>>>> main
