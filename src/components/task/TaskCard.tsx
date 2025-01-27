import { Task } from "@/types/task";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import useTask from "./hook/useTask";
import { FormEvent, useState } from "react";
import { ChevronRight, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "@/components/ui/label";
import { TaskDetails } from "./TaskDetails";

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
      <div className="flex flex-col w-full  ">
        <div className="rounded-t-sm flex gap-2 py-2 w-full">
          <input onChange={handleDoneTask} type="checkbox" />
          <Label className={doneTask ? `line-through text-gray-300 ` : ``}>
            {task?.name}
          </Label>
        </div>
      </div>
      <div>
        <button onClick={handleShowDetails}>
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
