import { Task } from "@/types/task";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import useTask from "./hook/useTask";
import { FormEvent, useState } from "react";
import { ChevronRight, Trash, CalendarX } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "@/components/ui/label";
import { TaskDetails } from "./TaskDetails";
import { format } from "date-fns";

export function TaskCard({ task }: { task: Task }) {
  const [doneTask, setDoneTask] = useState(false);
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);

  const { getTask } = useTask();

  function handleDoneTask() {
    setDoneTask(!doneTask);
  }

  function handleShowDetails() {
    if (!task.id) return;
    getTask(task.id);
  }

  return (
    <div
      key={task.id}
      className="flex px-4  py-2 gap-2 justify-center items-center "
    >
      <button className="flex   w-full" onClick={handleShowDetails}>
        <div className="flex flex-col w-full">
          <div className="flex gap-2 py-2 ">
            <input onChange={handleDoneTask} type="checkbox" />
            <Label
              className={
                doneTask ? `line-through text-gray-300 ` : `font-semibold `
              }
            >
              {task?.name}
            </Label>
          </div>
          <div className="flex gap-2 items-center font-semibold text-gray-600 ml-5 ">
            {task?.dueDate && (
              <>
                <CalendarX className="h-5 w-5" />
                <p className="flex space-x-10 ">
                  {format(task!.dueDate!, "dd/MM/yyyy")}
                </p>
              </>
            )}
          </div>
        </div>
        <ChevronRight />
      </button>
    </div>
  );
}
