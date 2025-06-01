import React from "react";
import { Bell, AlertCircle, CheckCircle, Info } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "success",
    title: "Order Delivered",
    message: "Your order #ORD-123456 has been successfully delivered.",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "warning",
    title: "Payment Pending",
    message: "Order #ORD-123457 is still awaiting payment.",
    time: "4 hours ago",
  },
  {
    id: 3,
    type: "info",
    title: "New Feature Released",
    message: "Try out the new order analytics dashboard now.",
    time: "1 day ago",
  },
  {
    id: 4,
    type: "error",
    title: "Server Error",
    message: "Failed to sync with the inventory system.",
    time: "2 days ago",
  },
];

const typeStyles = {
  success: "bg-green-100 text-green-700",
  warning: "bg-yellow-100 text-yellow-700",
  error: "bg-red-100 text-red-700",
  info: "bg-blue-100 text-blue-700",
};

const typeIcons = {
  success: <CheckCircle className="h-5 w-5" />,
  warning: <AlertCircle className="h-5 w-5" />,
  error: <AlertCircle className="h-5 w-5" />,
  info: <Info className="h-5 w-5" />,
};

export default function Notification () {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold flex items-center gap-2 mb-6">
          <Bell className="w-6 h-6 text-primary" />
          Notifications
        </h2>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start p-4 rounded-xl shadow-sm ${typeStyles[notification.type]}`}
            >
              <div className="mr-4 mt-1">{typeIcons[notification.type]}</div>
              <div className="flex-1">
                <h3 className="font-semibold">{notification.title}</h3>
                <p className="text-sm">{notification.message}</p>
                <span className="text-xs text-muted-foreground">{notification.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
