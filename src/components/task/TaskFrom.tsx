import React, { FormEvent, useRef, useState } from "react";
import { Task } from "@/types/task";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import useTask from "../task/hook/useTask";
import { useToast } from "@/hooks/use-toast";
import { Title } from "node_modules/@radix-ui/react-toast/dist";
import { Plus } from "lucide-react";

export function TaskForm() {
  const { addTask, tasks } = useTask();
  const [task, setTask] = useState<Task | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  function handleAddTask(e: FormEvent) {
    e.preventDefault();
    if (!nameRef.current?.value) {
      return toast({
        variant: "default",
        description: "Name is required",
      });
    }
    if (nameRef.current) {
      const newTask: Task = {
        id: tasks.length + 1,
        name: nameRef.current.value,
      };
      addTask(newTask);
    }
  }

  return (
    <div className="px-2 py-4">
      <form onSubmit={handleAddTask} className="flex  flex-col gap-4 ">
        <div className="justify-center shadow-inner  rounded-md px-4 py-2 items-center  flex  space-x-2">
          <Plus className=" text-gray-400 h-5 w-5" />
          <input
            className=""
            type="text"
            id="name"
            placeholder="Add New Task"
            ref={nameRef}
          />
        </div>
        <Button type="submit">Add Task</Button>
      </form>
    </div>
  );
}
