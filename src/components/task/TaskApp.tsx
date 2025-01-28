import { Toaster } from "../ui/toaster";
import { TaskProvider } from "./context/TasksProvider";
import useTask from "./hook/useTask";
import { TaskDetails } from "./TaskDetails";
import { TaskForm } from "./TaskFrom";
import { TaskList } from "./TaskList";

export function TaskApp() {
  return (
    <div className="flex w-screen ">
      <TaskProvider>
        <div className="flex w-screen justify-evenly ">
          <div>
            <TaskForm />
            <TaskList />
          </div>
          <TaskDetails />
        </div>
        <Toaster />
      </TaskProvider>
    </div>
  );
}
