import { Task } from "@/types/task";
import { Card, CardContent, CardHeader } from "../ui/card";
import useTask from "./store/TaskStore";
import { useState } from "react";
import { ChevronRight, CalendarX } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "@/components/ui/label";
import { TaskDetails } from "./TaskDetails";
import { format } from "date-fns";
import useListStore from "../list/store/listStore";

export function TaskCard({ task }: { task: Task }) {
  const [doneTask, setDoneTask] = useState(false);
  const { getTask } = useTask();
  const { lists } = useListStore();
  const list = lists.find((list) => list.id === task.listId);

  function handleDoneTask() {
    setDoneTask(!doneTask);
  }
  function handleTaskClick() {
    if (!task.id) return;
    getTask(task.id);
  }

  return (
    <div
      key={task.id}
      className="flex px-4  py-2 gap-2 justify-center items-center "
    >
      <button className="flex w-full" onClick={handleTaskClick}>
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
          <div className="flex  items-center justify-evenly font-semibold text-gray-600 ml-5 ">
            {task?.dueDate && (
              <div className="flex items-center gap-2">
                <CalendarX className="h-5 w-5" />
                <p className="flex space-x-10 ">
                  {format(task!.dueDate!, "dd/MM/yyyy")}
                </p>
              </div>
            )}
            {list && <div className="flex items-center">{list.name}</div>}
          </div>
        </div>
        <ChevronRight />
      </button>
    </div>
  );
}
