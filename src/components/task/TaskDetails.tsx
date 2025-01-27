import React, { useState } from "react";
import { Task } from "@/types/task";
import useTask from "./hook/useTask";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Ban, Pen } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function TaskDetails() {
  const { task, editTask } = useTask();
  const [edit, setEditTask] = useState(false);

  function handleEditTask() {
    setEditTask(!edit);
  }
  function handleSaveTaskEdited({ task }: { task: Task }) {
    editTask(task);
  }

  return (
    <div className="flex gap-10 ">
      <h1>Task:</h1>
      <div className="flex gap-10">
        {edit ? (
          <div className="">
            <Input />
            <Textarea />
            <Button className="px-5 py-4">Save changes</Button>
          </div>
        ) : (
          <>
            <Label>{task?.name}</Label>
            <Label>{task?.description}</Label>
          </>
        )}
        <Button onClick={handleEditTask}>
          <Pen />
        </Button>
      </div>
    </div>
  );
}
