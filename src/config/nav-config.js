import { 
    LayoutDashboard, 
    Package, 
    TrendingUp, 
    ShoppingCart, 
    Users, 
    FileText, 
    Milk,
    Truck,
    BarChart3,
    Settings,
    CalendarDays
  } from "lucide-react";
  
export const navigationConfig = {
    admin: [
      { 
        name: "Dashboard", 
        href: "/", 
        icon: LayoutDashboard,
        permission: "can_view_analytics"
      },
      { 
        name: "Inventory", 
        href: "/inventory", 
        icon: Package, 
        permission: "can_view_inventory"
      },
      { 
        name: "Sales", 
        href: "/sales", 
        icon: TrendingUp, 
        permission: "can_view_sales"
      },
      { 
        name: "Orders", 
        href: "/orders", 
        icon: ShoppingCart, 
        permission: "can_view_orders"
      },
      { 
        name: "Suppliers", 
        href: "/suppliers", 
        icon: Truck, 
        permission: "can_view_suppliers"
      },
      { 
        name: "Users", 
        href: "/users", 
        icon: Users, 
        permission: "can_manage_users"
      },
      { 
        name: "Reports", 
        href: "/reports", 
        icon: FileText, 
        permission: "can_view_reports"
      },
    ],
    inventory_manager: [
      { 
        name: "Dashboard", 
        href: "/", 
        icon: LayoutDashboard,
        permission: "can_view_analytics"
      },
      { 
        name: "Inventory", 
        href: "/inventory", 
        icon: Package, 
        permission: "can_view_inventory"
      },
      { 
        name: "Sales", 
        href: "/sales", 
        icon: TrendingUp, 
        permission: "can_view_sales"
      },
      { 
        name: "Orders", 
        href: "/orders", 
        icon: ShoppingCart, 
        permission: "can_view_orders"
      },
      { 
        name: "Suppliers", 
        href: "/suppliers", 
        icon: Truck, 
        permission: "can_view_suppliers"
      },
      { 
        name: "Reports", 
        href: "/reports", 
        icon: FileText, 
        permission: "can_view_reports"
      },
    ],
   sales_representative: [
      { 
        name: "Dashboard", 
        href: "/", 
        icon: LayoutDashboard,
        permission: "can_view_analytics"
      },
      { 
        name: "Inventory", 
        href: "/inventory", 
        icon: Package, 
        permission: "can_view_inventory"
      },
      { 
        name: "Sales", 
        href: "/sales", 
        icon: TrendingUp, 
        permission: "can_view_sales"
      },
      { 
        name: "Orders", 
        href: "/orders", 
        icon: ShoppingCart, 
        permission: "can_view_orders"
      },
      { 
        name: "Suppliers", 
        href: "/suppliers", 
        icon: ShoppingCart, 
        permission: "can_view_suppliers"
      },
    ],
    farmer: [
      { 
        name: "Dashboard", 
        href: "/", 
        icon: LayoutDashboard, 
        permission: "can_view_analytics"
      },
      { 
        name: "Inventory", 
        href: "/inventory", 
        icon: Package, 
        permission: "can_view_inventory"
      },
    ]
};