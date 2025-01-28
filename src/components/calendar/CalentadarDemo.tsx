import { useState } from "react";
import useTask from "@/components/task/hook/useTask";
import { Calendar } from "@/components/ui/calendar";
import { Task } from "@/types/task";

export function CalendarDemo() {
  const { task, setTask } = useTask();

  const handleSelect = (date: Date | undefined) => {
    if (!task) return;

    setTask((prevTask) => {
      if (!prevTask) return prevTask;
      return {
        ...prevTask,
        dueDate: date,
      };
    });
  };

  return (
    <Calendar
      mode="single"
      selected={task!.dueDate}
      onSelect={handleSelect}
      className="rounded-md border shadow"
    />
  );
}
