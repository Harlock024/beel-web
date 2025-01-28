import React, { FormEvent, useEffect, useState } from "react";
import { Task } from "@/types/task";
import useTask from "./hook/useTask";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Ban, Pen, Target } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { TaskProvider } from "./context/TasksProvider";
import { Toast } from "../ui/toast";
import { useToast } from "@/hooks/use-toast";

export function TaskDetails() {
  const { task } = useTask();

  return <>{task ? <TaskData /> : null}</>;
}
function TaskData() {
  const { task, editTask, removeTask } = useTask();
  const { toast } = useToast();
  console.log("task details ", task);
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);

  function handleEditTask(e: FormEvent) {
    e.preventDefault();
    if (!currentTask) return;

    const updateTask = {
      ...currentTask,
      name: currentTask.name,
      description: currentTask.description || "",
    };
    editTask(updateTask);
    return toast({
      variant: "default",
      description: "Task updated",
    });
    setCurrentTask(updateTask);
  }
  useEffect(() => {
    setCurrentTask(task);
  }, [task]);

  function handleRemoveTask(e: FormEvent) {
    e.preventDefault();
    if (!task?.id) return;
    removeTask(task.id);
    setCurrentTask(undefined);
  }
  return (
    <div className="flex gap-10 ">
      <form className="flex flex-col" onSubmit={handleEditTask}>
        <input
          type="text"
          className="border-none shadow-inner h-20 w-60 ring-0 focus:ring-0 focus:outline-none"
          value={currentTask?.name}
          onChange={(e) =>
            setCurrentTask({ ...currentTask!, name: e.target.value })
          }
          placeholder={task?.name.toString() || ""}
        />
        <textarea
          className="border-none shadow-inner p-0  h-60  text-left   ring-0 focus:ring-0 focus:outline-none"
          value={currentTask?.description || ""}
          onChange={(e) =>
            setCurrentTask({
              ...currentTask!,
              description: e.target.value,
            })
          }
          placeholder={task?.description?.toString() || ""}
        />
        <Button type="submit" className="px-5 py-4">
          Save changes
        </Button>
        <Button type="button" onClick={handleRemoveTask}>
          Delete
        </Button>
      </form>
    </div>
  );
}
