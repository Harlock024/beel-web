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
      <div className="grid grid-cols-12  w-screen justify-evenly ">
        <div className="menu col-span-2 ">
          <MenuApp />
        </div>
        <div className="task col-span-7 flex flex-col ">
          <TaskForm />
          <TaskList />
        </div>
        <div className="taskDetails col-span-3">
          <TaskDetails />
        </div>
      </div>
      <Toaster />
    </TaskProvider>
  );
}
