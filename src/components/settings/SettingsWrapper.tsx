"use client";

import { type FC, useState } from "react";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import DashboardLayout from "../dashboard/DashboardLayout";

const SettingsWrapper: FC = () => {
	const [notifications, setNotifications] = useState(true);
	const [autoSave, setAutoSave] = useState(true);
	const [userName, setUserName] = useState("John Developer");
	const [userEmail, setUserEmail] = useState("john@example.com");
	const [userBio, setUserBio] = useState(
		"Full-stack developer passionate about clean code and great UX.",
	);

	return (
		<DashboardLayout>
            <div className="container mx-auto animate-fade-in-up space-y-6 p-6">
			<div className="mb-8">
				<h1 className="mb-2 font-bold text-3xl text-slate-900 dark:text-slate-100">
					Settings
				</h1>
				<p className="text-slate-600 dark:text-slate-400">
					Manage your application preferences and profile settings.
				</p>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				{/* Preferences */}
				<Card className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<div className="h-2 w-2 rounded-full bg-blue-500"></div>
							Preferences
						</CardTitle>
						<CardDescription>
							Configure your workflow preferences
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Notifications</Label>
								<p className="text-slate-600 text-sm dark:text-slate-400">
									Receive notifications for updates
								</p>
							</div>
							<Switch
								checked={notifications}
								onCheckedChange={setNotifications}
							/>
						</div>
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Auto-save</Label>
								<p className="text-slate-600 text-sm dark:text-slate-400">
									Automatically save your work
								</p>
							</div>
							<Switch checked={autoSave} onCheckedChange={setAutoSave} />
						</div>
					</CardContent>
				</Card>

				{/* Profile Settings */}
				<Card
					className="animate-fade-in-up md:col-span-2"
					style={{ animationDelay: "0.3s" }}
				>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<div className="h-2 w-2 rounded-full bg-purple-500"></div>
							Profile
						</CardTitle>
						<CardDescription>Update your profile information</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid gap-4 md:grid-cols-2">
							<div className="space-y-2">
								<Label htmlFor="name">Name</Label>
								<Input
									id="name"
									value={userName}
									onChange={(e) => setUserName(e.target.value)}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									value={userEmail}
									onChange={(e) => setUserEmail(e.target.value)}
								/>
							</div>
						</div>
						<div className="space-y-2">
							<Label htmlFor="bio">Bio</Label>
							<Textarea
								id="bio"
								value={userBio}
								onChange={(e) => setUserBio(e.target.value)}
								rows={3}
							/>
						</div>
						<Button className="bg-emerald-600 hover:bg-emerald-700">
							Save Changes
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
        </DashboardLayout>
	);
};

export default SettingsWrapper;
