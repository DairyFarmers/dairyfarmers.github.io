import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Package, 
  TrendingUp, 
  ShoppingCart, 
  Users, 
  FileText, 
  Settings, 
  Menu,
  Milk,
  Truck,
  BarChart3
} from "lucide-react";
import { PermissionGuard } from "@/components/common/PermissionGuard";

const navigation = [
  { 
    name: "Dashboard", 
    href: "/", 
    icon: LayoutDashboard, 
    current: true,
    permission: "can_view_analytics" 
  },
  { 
    name: "Inventory", 
    href: "/inventory", 
    icon: Package, 
    current: false,
    permission: "can_view_inventory"
  },
  { 
    name: "Sales", 
    href: "/sales", 
    icon: TrendingUp, 
    current: false,
    permission: "can_view_sales"
  },
  { 
    name: "Orders", 
    href: "/orders", 
    icon: ShoppingCart, 
    current: false,
    permission: "can_view_orders"
  },
  { 
    name: "Suppliers", 
    href: "/suppliers", 
    icon: Truck, 
    current: false,
    permission: "can_view_suppliers"
  },
  { 
    name: "Users", 
    href: "/users", 
    icon: Users, 
    current: false,
    permission: "can_manage_users"
  },
  { 
    name: "Reports", 
    href: "/reports", 
    icon: FileText, 
    current: false,
    permission: "can_view_reports"
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}
      
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        className="lg:hidden fixed top-4 left-4 z-50 bg-background border border-border"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <Menu className="h-4 w-4" />
      </Button>
      
      <div className={cn(
        "fixed left-0 top-0 z-50 h-full border-r border-sidebar-border transition-all duration-300 ease-in-out",
        // Solid background for mobile, sidebar background for desktop
        "bg-white dark:bg-black lg:bg-sidebar-background",
        // Desktop behavior
        "hidden lg:block",
        collapsed ? "lg:w-16" : "lg:w-64",
        // Mobile behavior
        mobileOpen ? "block w-64 shadow-xl" : "hidden"
      )}>
        {/* Logo and brand */}
        <div className="flex items-center gap-3 p-6 border-b border-sidebar-border">
          <div className="flex items-center justify-center w-10 h-10 bg-sidebar-primary rounded-lg">
            <Milk className="h-6 w-6 text-sidebar-primary-foreground" />
          </div>
          {(!collapsed || mobileOpen) && (
            <div>
              <h1 className="text-lg font-bold text-sidebar-foreground">Dairy Manager</h1>
              <p className="text-sm text-sidebar-foreground/60">Inventory Service</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <PermissionGuard 
                key={item.name}
                permissions={item.permission}
                fallback={null}
              >
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 h-10 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    item.current && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground",
                    collapsed && !mobileOpen && "justify-center px-2"
                  )}
                  asChild
                  onClick={() => setMobileOpen(false)}
                >
                  <a href={item.href}>
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {(!collapsed || mobileOpen) && <span>{item.name}</span>}
                  </a>
                </Button>
              </PermissionGuard>
            );
          })}
        </nav>

        {/* Collapse toggle - only on desktop */}
        <div className="hidden lg:block absolute bottom-4 left-4 right-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="w-full justify-center text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main content spacer - only on desktop */}
      <div className={cn("hidden lg:block transition-all duration-300", collapsed ? "lg:ml-16" : "lg:ml-64")} />
    </>
  );
} 