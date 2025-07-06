"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { api } from '~/trpc/react';
import { useMemo, type FC } from 'react';

const ProfileDropdown: FC = () => {
  const { data: meData } = api.auth.me.useQuery();
  const logoutMutation = api.auth.logout.useMutation();

  const handleLogout = async () => {
    const res = await logoutMutation.mutateAsync();
    document.cookie = res.emptySessionCookie;
    window.location.href = '/login';
  };

  if (!meData || !meData.user) {
    return null;
  }


const user = meData.user;

const initials = useMemo(() => {
  return user.name
    .split(' ')
    .map((n: number[]) => n[0])
    .join('')
    .toUpperCase();
}, [user.name]);

  return (
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
  );
}


export default ProfileDropdown;