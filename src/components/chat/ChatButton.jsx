import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export function ChatButton({ onClick }) {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg"
      size="icon"
    >
      <MessageCircle className="h-6 w-6" />
    </Button>
  );
}