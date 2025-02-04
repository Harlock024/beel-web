import {
  ChevronsRight,
  ListChecks,
  Calendar,
  Clock,
  StickyNote,
} from "lucide-react";
import { useState } from "react";

export function SidebarTask({
  onMenuClick,
}: {
  onMenuClick: (view: string) => void;
}) {
  return (
    <div className="flex flex-col h-1/3">
      <h1 className="font-semibold text-lg">Tasks</h1>
      <div
        className="flex items-center gap-2 h-1/2 cursor-pointer"
        onClick={() => onMenuClick("dailys")}
      >
        <Clock className="h-5 w-5" />
        Dailys
      </div>
      <div
        className="flex items-center gap-2 h-1/2 cursor-pointer"
        onClick={() => onMenuClick("today")}
      >
        <ListChecks className="h-5 w-5" />
        Today
      </div>
      <div
        className="flex items-center gap-2 h-1/2 cursor-pointer"
        onClick={() => onMenuClick("upcoming")}
      >
        <ChevronsRight className="h-5 w-5" />
        Upcoming
      </div>
      <div
        className="flex items-center gap-2 h-1/2 cursor-pointer"
        onClick={() => onMenuClick("calendar")}
      >
        <Calendar className="h-5 w-5" />
        Calendar
      </div>
      <div
        className="flex items-center gap-2 h-1/2 cursor-pointer"
        onClick={() => onMenuClick("sticky-wall")}
      >
        <StickyNote className="h-5 w-5" />
        Sticky Wall
      </div>
    </div>
  );
}
