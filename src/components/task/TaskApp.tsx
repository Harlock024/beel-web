import useListStore from "../list/store/listStore";
import { Sidebar } from "../sidebar/sidebar";
import { Toaster } from "../ui/toaster";
import useTask from "./store/TaskStore";
import { TaskDetails } from "./TaskDetails";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";

export function TaskApp() {
  return (
    <div className="flex h-screen  w-screen min-h-[600px] min-w-[1024px]  overflow-auto bg-gray-100">
      <Sidebar className="w-60 min-w-[240px] overflow-y-auto flex-shrink-0" />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col w-[45%] min-w-[400px] bg-white m-4 rounded-lg shadow overflow-hidden">
          <TaskForm className="p-4" />
          <TaskList className="flex-1 overflow-y-auto" />
        </div>
        <div className="flex-1 min-w-[350px] bg-white m-4 rounded-lg shadow overflow-y-auto">
          <TaskDetails className="p-4" />
        </div>
      </div>
      <Toaster />
    </div>
  );
}
