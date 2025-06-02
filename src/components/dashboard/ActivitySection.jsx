import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Bell, Clock, Activity } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ActivitySection({ lastLogin, notifications, activities }) {
  return (
    <div className="space-y-6">
      {/* Last Login */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Last Login</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(lastLogin), { addSuffix: true })}
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
              notifications.map((notification) => (
                <div key={notification.id} className="mb-4 last:mb-0">
                  <p className="text-sm">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No new notifications</p>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Recent Activities</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px]">
            {activities?.length > 0 ? (
              activities.map((activity) => (
                <div key={activity.id} className="mb-4 last:mb-0">
                  <p className="text-sm">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No recent activities</p>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}