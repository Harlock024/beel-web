import { Toaster } from "../ui/toaster";
import { TaskProvider } from "./context/TasksProvider";
import { TaskDetails } from "./TaskDetails";
import { TaskForm } from "./TaskFrom";
import { TaskList } from "./TaskList";

export function TaskApp() {
  return (
    <div>
      <TaskProvider>
        <h1>Task App</h1>
        <div className="flex ">
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
