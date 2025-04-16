import { cn } from "@/lib/utils";
import {
  ChevronsRight,
  ListChecks,
  Calendar,
  Clock,
  StickyNote,
  List,
} from "lucide-react";
import { useState } from "react";

type TaskNav = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

const taskNav: TaskNav[] = [
  {
    title: "All Tasks",
    icon: <List />,
    href: "/tasks/all",
  },
  {
    title: "Today",
    icon: <ListChecks />,
    href: "/tasks/today",
  },
  {
    title: "Upcoming",
    icon: <ChevronsRight />,
    href: "/tasks/up-comming",
  },
];

export function SidebarTask({ className }: { className: string }) {
  return (
    <div className={cn(className, "")}>
      <h2 className="font-semibold text-lg mb-3 text-gray-800">Tasks</h2>
      <div className="space-y-2">
        {taskNav.map((item) => (
          <a
            key={item.title}
            href={item.href}
            className="flex items-center gap-3 px-2 py-2 rounded-md text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <span className="text-gray-600">{item.icon}</span>
            <span>{item.title}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
