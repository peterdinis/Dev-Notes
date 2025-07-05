import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { useState, useEffect } from 'react';
import { api } from '~/trpc/react';

export function ProfileDropdown() {
  const { data: meData, refetch } = api.auth.me.useQuery();
  const logoutMutation = api.auth.logout.useMutation();

  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    const res = await logoutMutation.mutateAsync();
    // Nastavíme cookie na prázdnu (vymažeme session cookie)
    document.cookie = res.emptySessionCookie;
    setLoading(false);
    // Prekonať reload alebo redirect, napr. na login
    window.location.href = '/login';
  };

  if (!meData || !meData.user) {
    return null; // alebo nejaký login button
  }

  const user = meData.user;
  const initials = user.name
    .split(' ')
    .map((n: number[]) => n[0])
    .join('')
    .toUpperCase();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="ghost" className="rounded-full p-1">
          <Avatar>
            <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-48 bg-white rounded-md shadow-md p-2" align="end" sideOffset={5}>
        <div className="p-2 border-b mb-2">
          <p className="text-sm font-semibold">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>

        <DropdownMenu.Item
          className="cursor-pointer px-2 py-1 rounded hover:bg-gray-100"
          onSelect={(e) => {
            e.preventDefault();
            handleLogout();
          }}
        >
          Logout
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
