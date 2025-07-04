"use client"

import { useState } from "react";
import { Send, MoreVertical, Smile, Paperclip} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Message {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
  type: 'text' | 'file' | 'code';
}

interface TeamChatProps {
  workspaceId: string;
  currentUserId: string;
}

const TeamChat = ({ workspaceId, currentUserId }: TeamChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      userId: "user1",
      userName: "Alice Johnson",
      userAvatar: "",
      content: "Hey team! I just finished the authentication module. Ready for review! 🚀",
      timestamp: "10:30 AM",
      type: "text"
    },
    {
      id: "2",
      userId: "user2",
      userName: "Bob Smith",
      userAvatar: "",
      content: "Great work Alice! I'll review it after lunch. Also, I've updated the UML diagrams for the new feature.",
      timestamp: "10:35 AM",
      type: "text"
    },
    {
      id: "3",
      userId: currentUserId,
      userName: "You",
      userAvatar: "",
      content: "Thanks for the updates! Let me know if you need any help with the API integration.",
      timestamp: "10:40 AM",
      type: "text"
    }
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      userId: currentUserId,
      userName: "You",
      userAvatar: "",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: "text"
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-[400px] sm:h-[600px] flex flex-col animate-fade-in-up">
      <CardHeader className="border-b border-slate-200 dark:border-slate-700 p-3 sm:p-6">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="truncate">Team Chat</span>
            <Badge variant="outline" className="ml-2 text-xs">3 online</Badge>
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <DropdownMenuItem>View Members</DropdownMenuItem>
              <DropdownMenuItem>Chat Settings</DropdownMenuItem>
              <DropdownMenuItem>Clear History</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0 min-h-0">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 min-h-0">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex gap-2 sm:gap-3 animate-fade-in-up ${
                message.userId === currentUserId ? 'flex-row-reverse' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Avatar className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0">
                <AvatarImage src={message.userAvatar} />
                <AvatarFallback className="bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 text-xs">
                  {message.userName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className={`flex flex-col ${message.userId === currentUserId ? 'items-end' : 'items-start'} max-w-[80%] sm:max-w-[70%] min-w-0`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
                    {message.userName}
                  </span>
                  <span className="text-xs text-slate-500 flex-shrink-0">
                    {message.timestamp}
                  </span>
                </div>
                
                <div
                  className={`px-3 py-2 rounded-lg text-sm break-words ${
                    message.userId === currentUserId
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Message Input */}
        <div className="border-t border-slate-200 dark:border-slate-700 p-3 sm:p-4">
          <div className="flex items-end gap-2">
            <div className="flex-1 relative min-w-0">
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="pr-16 sm:pr-20 min-h-[44px] max-h-32 resize-none text-sm"
                rows={1}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <Button variant="ghost" size="sm" className="h-6 w-6 sm:h-8 sm:w-8 p-0">
                  <Smile className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-6 w-6 sm:h-8 sm:w-8 p-0">
                  <Paperclip className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-emerald-600 hover:bg-emerald-700 h-11 px-3 sm:px-4 flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamChat;