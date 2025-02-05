import { FormEvent, useState } from "react";
import { Task } from "@/types/task";
import { useTaskStore } from "./store/TaskStore";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
export function TaskForm({ className }: { className?: string }) {
  const { addTask } = useTaskStore();
  const { toast } = useToast();
  const [taskName, setTaskName] = useState("");
  function handleAddTask(e: FormEvent) {
    e.preventDefault();
    if (!taskName) {
      return toast({
        variant: "default",
        description: "Name is required",
      });
    }
    if (taskName) {
      const newTask: Task = {
        id: Math.floor(Math.random() * 1000),
        name: taskName,
      };
      addTask(newTask);
      setTaskName("");
    }
  }

  return (
    <div className={className}>
      <form onSubmit={handleAddTask} className="flex flex-col gap-4 ">
        <div className="justify-start shadow-inner rounded-md px-4 py-2 items-center  flex  space-x-2">
          <Plus className="text-gray-400 h-5 w-5" />
          <input
            className="border-none  w-full ring-0 focus:ring-0 focus:outline-none"
            type="text"
            id="name"
            placeholder="Add New Task"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </div>
        <button className="hidden" type="submit">
          Add Task
        </button>
      </form>
    </div>
  );
}
