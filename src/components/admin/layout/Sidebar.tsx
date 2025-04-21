import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  PieChart,
  Home,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  isMobile: boolean;
  setMobileOpen: (open: boolean) => void;
}

const Sidebar = ({
  collapsed,
  setCollapsed,
  isMobile,
  setMobileOpen,
}: SidebarProps) => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems = [
    {
      title: "Dashboard",
      icon: Home,
      path: "/admin/dashboard",
      active:
        location.pathname === "/admin" ||
        location.pathname === "/admin/dashboard",
    },
    {
      title: "Analytics",
      icon: BarChart3,
      path: "/admin/analytics",
      active: location.pathname === "/admin/analytics",
    },
    {
      title: "Users",
      icon: Users,
      path: "/admin/users",
      active: location.pathname === "/admin/users",
    },
    {
      title: "Conversations",
      icon: MessageSquare,
      path: "/admin/conversations",
      active: location.pathname === "/admin/conversations",
    },
  ];

  const bottomNavItems = [
    {
      title: "Settings",
      icon: Settings,
      path: "/admin/settings",
      active: location.pathname === "/admin/settings",
    },
    {
      title: "Logout",
      icon: LogOut,
      path: "/admin/logout",
      active: false,
    },
  ];

  const sidebarVariants = {
    expanded: { width: "240px" },
    collapsed: { width: "80px" },
  };

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleCloseMobileSidebar = () => {
    setMobileOpen(false);
  };

  return (
    <motion.div
      className={cn(
        "fixed top-0 left-0 z-30 h-full bg-background border-r flex flex-col",
        isMobile ? "w-[240px]" : "",
      )}
      variants={sidebarVariants}
      initial={false}
      animate={collapsed && !isMobile ? "collapsed" : "expanded"}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <div className="flex items-center justify-between p-4 h-16">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary text-primary-foreground">
            <PieChart className="h-5 w-5" />
          </div>
          {(!collapsed || isMobile) && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="ml-3 font-bold text-lg"
            >
              AI Admin
            </motion.span>
          )}
        </div>
        {isMobile ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCloseMobileSidebar}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleCollapse}
            className="hidden md:flex"
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-3 py-2 rounded-md transition-colors relative group",
                item.active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
              onClick={isMobile ? handleCloseMobileSidebar : undefined}
              onMouseEnter={() => setHoveredItem(item.title)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {(!collapsed || isMobile) && (
                <span className="ml-3 truncate">{item.title}</span>
              )}
              {collapsed && !isMobile && hoveredItem === item.title && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md shadow-md whitespace-nowrap z-50">
                  {item.title}
                </div>
              )}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-3">
        <Separator className="my-2" />
        <nav className="space-y-1">
          {bottomNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-3 py-2 rounded-md transition-colors relative group",
                item.active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
              onClick={isMobile ? handleCloseMobileSidebar : undefined}
              onMouseEnter={() => setHoveredItem(item.title)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {(!collapsed || isMobile) && (
                <span className="ml-3 truncate">{item.title}</span>
              )}
              {collapsed && !isMobile && hoveredItem === item.title && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md shadow-md whitespace-nowrap z-50">
                  {item.title}
                </div>
              )}
            </Link>
          ))}
        </nav>

        <div className="mt-4">
          <div
            className={cn(
              "flex items-center p-3 rounded-md bg-muted/50",
              collapsed && !isMobile ? "justify-center" : "justify-between",
            )}
          >
            <div className="flex items-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              {(!collapsed || isMobile) && (
                <div className="ml-3">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">Admin</p>
                </div>
              )}
            </div>
            {(!collapsed || isMobile) && (
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
