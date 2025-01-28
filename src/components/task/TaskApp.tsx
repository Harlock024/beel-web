import { MenuApp } from "../menu/menu";
import { Toaster } from "../ui/toaster";
import { TaskProvider } from "./context/TasksProvider";
import useTask from "./hook/useTask";
import { TaskDetails } from "./TaskDetails";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";

export function TaskApp() {
  return (
    <TaskProvider>
      <div className="grid grid-cols-12 gap-2  w-screen">
        <div className="menu col-span-2 bg-white my-4 rounded-s-2xl p-1">
          <MenuApp />
        </div>
        <div className="task col-span-6 flex flex-col bg-[#ffff] my-4 ">
          <TaskForm />
          <TaskList />
        </div>
        <div className="taskDetails col-span-4 my-4 bg-white ">
          <TaskDetails />
        </div>
      </div>
      <Toaster />
    </TaskProvider>
  );
}
