import React from "react";
import { MenuList } from "./sidebarList";
import { MenuTags } from "./sidebarTags";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarTask } from "./sidebarTask";

export function Sidebar({
  className,
  onMenuClick,
}: {
  className?: string;
  onMenuClick?: (view: string) => void;
}) {
  return (
    <div
      className={cn(
        "flex flex-col h-full bg-background overflow-y-hidden overflow-x-hidden",
        className,
      )}
    >
      <div className="p-4 flex-shrink-0">
        <h1 className="text-2xl font-bold truncate">Beel</h1>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-4 overflow-y-auto">
        <SidebarTask onMenuClick={onMenuClick!} />
        <Separator className="my-2" />
        <MenuList />
        <Separator className="my-2" />
        <MenuTags />
      </nav>
      <div className="p-4 flex-shrink-0">
        <Separator className="mb-2" />
        <Button
          variant="ghost"
          className="w-full justify-start text-sm"
          asChild
        >
          <a href="/settings">
            <Settings className="mr-2 h-4 w-4" />
            <span className="truncate">Settings</span>
          </a>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-sm text-red-500 hover:text-red-600 hover:bg-red-100"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span className="truncate">Sign out</span>
        </Button>
      </div>
    </div>
  );
}
