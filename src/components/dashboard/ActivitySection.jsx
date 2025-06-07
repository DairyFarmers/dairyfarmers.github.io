import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Bell, Clock, Activity } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from "@/components/ui/card";

export default function ActivitySection({ 
  lastLogin, 
  notifications, 
  activities 
}) {
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Invalid date';
    }
  };

  lastLogin = '2025-06-07T12:00:00Z'; // Example date, replace with actual data
  notifications = [
    { id: 2, message: 'Admin Alert: Product Expiry', created_at: '2025-06-03T08:00:00Z' },
    { id: 3, message: 'New order placed', created_at: '2025-06-04T09:30:00Z' },
    { id: 4, message: 'System maintenance scheduled', created_at: '2025-06-05T10:15:00Z' },
    { id: 5, message: 'New user registered', created_at: '2025-06-02T11:45:00Z' }
  ]; // Example notifications, replace with actual data

  return (
    <div className="space-y-6">
      {/* Last Login */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Last Login</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            {formatDate(lastLogin)}
          </p>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Recent Notifications</CardTitle>
          <Bell className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px]">
            {notifications?.length > 0 ? (
              notifications?.map((notification) => (
                <div key={notification.id} className="mb-4 last:mb-0">
                  <p className="text-sm">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">
                  {formatDate(notification.created_at)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No new notifications</p>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Recent Activities *
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Recent Activities</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px]">
            {activities?.length > 0 ? (
              activities?.map((activity) => (
                <div key={activity.id} className="mb-4 last:mb-0">
                  <p className="text-sm">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">
                  {formatDate(activity.timestamp)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No recent activities</p>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
      */}
    </div>
  );
}