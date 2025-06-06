import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

export function UserSearch({ 
  query, 
  onSelectUser 
}: { 
  query;
  onSelectUser
}) {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users", query],
    queryFn: async () => {
      if (!query) return [];
      const response = await fetch(`/api/users/search?q=${query}`);
      return response.json();
    },
    enabled: query.length > 0
  });

  if (isLoading) {
    return <div className="p-4 text-sm text-muted-foreground">Searching...</div>;
  }

  if (!users?.length) {
    return <div className="p-4 text-sm text-muted-foreground">No users found</div>;
  }

  return (
    <div className="mt-2 space-y-1">
      {users.map((user) => (
        <button
          key={user.id}
          onClick={() => onSelectUser(user)}
          className="flex w-full items-center gap-3 rounded-lg p-2 hover:bg-muted"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="text-left">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </button>
      ))}
    </div>
  );
}