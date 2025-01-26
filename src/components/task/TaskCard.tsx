import { Task } from "@/types/task";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import useTask from "./hook/useTask";
import { FormEvent, useState } from "react";
import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "@/components/ui/label";

export function TaskCard({ task }: { task: Task }) {
  const { removeTask, editTask } = useTask();
  const [editName, setEditName] = useState();
  const [editDescription, setEditDescription] = useState(true);
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);

  return (
    <div
      key={task.id}
      className="flex px-4  py-2 gap-2 justify-center items-center "
    >
      <div className="flex flex-col w-full  ">
        <div className="   rounded-t-sm w-full">
          <Label>{task?.name}</Label>
        </div>
        <div>
          <small className="flex  text-gray-600">{task?.description}</small>
        </div>
      </div>
      <div>
        <Button
          onClick={() => {
            removeTask(task.id);
          }}
        >
          <Trash />
        </Button>
      </div>
    </div>
  );
}
