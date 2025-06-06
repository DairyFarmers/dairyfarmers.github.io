import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserSearch } from "./UserSearch";
import { ChatMessages } from "./ChatMessages";

export function ChatBox({ onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div className="fixed bottom-20 right-4 w-96 rounded-lg border bg-background shadow-xl">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="font-semibold">Messages</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {!selectedUser ? (
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <UserSearch 
            query={searchQuery} 
            onSelectUser={setSelectedUser} 
          />
        </div>
      ) : (
        <ChatMessages user={selectedUser} onBack={() => setSelectedUser(null)} />
      )}
    </div>
  );
}