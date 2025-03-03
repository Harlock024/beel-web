import useListStore from "../list/store/listStore";
import { Sidebar } from "../sidebar/sidebar";
import { StickerWall } from "../stickyWall/StickerWall";
import { Toaster } from "../ui/toaster";
import { useTaskStore } from "./store/TaskStore";
import { TaskDetails } from "./TaskDetails";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";
import { TodayTask } from "./todayTask";
import { UpcomingTask } from "./UpcommingTask";
import { useState, useEffect } from "react";

export function TaskApp() {
  const { task } = useTaskStore();
  const { listId, lists } = useListStore();
  const [activeView, setActiveView] = useState<string>("today");

  useEffect(() => {
    if (listId) {
      setActiveView("all task");
    } else {
      setActiveView("today");
    }
  }, [listId]);

  useEffect(() => {
    if (listId) {
    }
  }, [task]);

  const renderContent = () => {
    switch (activeView) {
      case "all task":
        return <TaskList />;
      case "today":
        return (
          <>
            <TaskForm className="w-full " />
            <TodayTask className="flex-1 overflow-y-auto" />
          </>
        );
      case "upcoming":
        return (
          <>
            <TaskForm className="w-full" />
            <UpcomingTask />
          </>
        );
      case "calendar":
        return <div>Calendar View</div>;
      case "sticky-wall":
        return <StickerWall />;
      default:
        return <TaskList />;
    }
  };

  return (
    <div className="flex h-screen w-screen min-h-[600px] min-w-[1024px] overflow-auto bg-gray-100">
      <Sidebar
        className="w-60 min-w-[260px] overflow-y-auto flex-shrink-0"
        onMenuClick={setActiveView}
      />
      <div className="flex flex-1 overflow-hidden">
        <div
          className={`flex flex-col ${
            task ? "w-[100%]" : "w-full"
          } transition-all duration-300 ease-out`}
        >
          {renderContent()}
        </div>
        {task && (
          <div className="w-full overflow-y-auto transition-all duration-300 ease-in-out">
            <TaskDetails className="p-4" />
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
}
