import React, { FormEvent, useRef, useState } from "react";
import { Task } from "@/types/task";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import useTask from "../task/hook/useTask";
import { useToast } from "@/hooks/use-toast";
import { Title } from "node_modules/@radix-ui/react-toast/dist";

export function TaskForm() {
  const { addTask, tasks } = useTask();
  const [task, setTask] = useState<Task | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  function handleAddTask(e: FormEvent) {
    e.preventDefault();
    if (!nameRef.current?.value) {
      return toast({
        variant: "default",
        description: "Name is required",
      });
    }
    if (nameRef.current && descriptionRef.current) {
      const newTask: Task = {
        id: tasks.length + 1,
        name: nameRef.current.value,
        description: descriptionRef.current.value,
      };
      addTask(newTask);
    }
  }

  return (
    <div>
      <form onSubmit={handleAddTask} className="flex flex-col gap-4 ">
        <div className="flex gap-2 space-x-10 ">
          <Label htmlFor="name">Name:</Label>
          <Input className="" type="text" id="name" ref={nameRef} />
        </div>
        <div className="flex gap-2 ">
          <Label htmlFor="description">Description:</Label>
          <Input id="description" type="text" ref={descriptionRef} />
        </div>
        <Button type="submit">Add Task</Button>
      </form>
    </div>
  );
}
