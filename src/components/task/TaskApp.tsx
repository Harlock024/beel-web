import { Toaster } from "../ui/toaster";
import { TaskProvider } from "./context/TasksProvider";
import { TaskForm } from "./TaskFrom";
import { TaskList } from "./TaskList";

export function TaskApp() {
  return (
    <div>
      <TaskProvider>
        <TaskForm />
        <TaskList />
        <Toaster />
      </TaskProvider>
    </div>
  );
}
