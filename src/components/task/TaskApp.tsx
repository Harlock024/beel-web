import useListStore from "../list/store/listStore";
import { Sidebar } from "../sidebar/sidebar";
import { Toaster } from "../ui/toaster";
import useTask from "./store/TaskStore";
import { TaskDetails } from "./TaskDetails";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";
import { UpcomingTask } from "./UpcommingTask";
import { useState } from "react";
export function TaskApp() {
  const { task } = useTask();
  const [activeView, setActiveView] = useState<string>("today");
  const renderContent = () => {
    switch (activeView) {
      case "dailys":
        return <TaskList className="flex-1 overflow-y-auto" />;
      case "today":
        return <TaskList className="flex-1 overflow-y-auto" />;
      case "upcoming":
        return <UpcomingTask />;
      case "calendar":
        return <div>Calendar View</div>;
      case "sticky-wall":
        return <div>Sticky Wall View</div>;
      default:
        return <TaskList className="flex-1 overflow-y-auto" />;
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
          <TaskForm className="w-full border" />
          {renderContent()}{" "}
        </div>
        {task && (
          <div className="w-[50%] overflow-y-auto transition-all duration-300 ease-in-out">
            <TaskDetails className="p-4" />
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
}
