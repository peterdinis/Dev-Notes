import { Crown, MoreVertical, Plus, Search, Shield, User } from "lucide-react";
import {type FC} from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import DashboardLayout from "../dashboard/DashboardLayout";
import TeamChat from "../chat/TeamChat";

const mockTeamMembers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@devteam.com",
    role: "owner",
    avatar: "",
    status: "online",
    joinedAt: "2024-01-15",
    lastActive: "2 minutes ago",
    projectsCount: 12
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@devteam.com",
    role: "admin",
    avatar: "",
    status: "online",
    joinedAt: "2024-02-20",
    lastActive: "5 minutes ago",
    projectsCount: 8
  },
  {
    id: 3,
    name: "Carol White",
    email: "carol@devteam.com",
    role: "member",
    avatar: "",
    status: "away",
    joinedAt: "2024-03-10",
    lastActive: "1 hour ago",
    projectsCount: 6
  },
  {
    id: 4,
    name: "David Brown",
    email: "david@devteam.com",
    role: "member",
    avatar: "",
    status: "offline",
    joinedAt: "2024-03-25",
    lastActive: "2 days ago",
    projectsCount: 4
  }
];

const getRoleIcon = (role: string) => {
  switch (role) {
    case 'owner':
      return <Crown className="w-4 h-4 text-yellow-500" />;
    case 'admin':
      return <Shield className="w-4 h-4 text-blue-500" />;
    default:
      return <User className="w-4 h-4 text-slate-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'online':
      return 'bg-green-500';
    case 'away':
      return 'bg-yellow-500';
    default:
      return 'bg-slate-400';
  }
};

const WorkspaceWrapper: FC = () => {
  return (
    <DashboardLayout>
        <div className="container mx-auto p-6 space-y-6 animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Workspace</h1>
        <p className="text-slate-600 dark:text-slate-400">Collaborate with your development team</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Members</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">4</p>
              </div>
              <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Online Now</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">2</p>
              </div>
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Projects</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">30</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">P</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">This Month</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">+5</p>
              </div>
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <Plus className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>Manage your workspace members and permissions</CardDescription>
                </div>
                <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                  <Plus className="w-4 h-4" />
                  Invite Member
                </Button>
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input placeholder="Search members..." className="pl-10" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTeamMembers.map((member, index) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors animate-fade-in-up" style={{ animationDelay: `${0.6 + index * 0.1}s` }}>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(member.status)} rounded-full border-2 border-white dark:border-slate-900`}></div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-slate-900 dark:text-slate-100">{member.name}</h3>
                          {getRoleIcon(member.role)}
                          <Badge variant={member.role === 'owner' ? 'default' : member.role === 'admin' ? 'secondary' : 'outline'} className="text-xs">
                            {member.role}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{member.email}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-500">
                          Last active: {member.lastActive} • {member.projectsCount} projects
                        </p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Change Role</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Remove Member</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <TeamChat currentUserId="1" workspaceId="1" />
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
};

export default WorkspaceWrapper;
