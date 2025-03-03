import type { Task } from "@/types/task";
import { Label } from "@/components/ui/label";
import { Calendar, Hash, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import useListStore from "../list/store/listStore";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useTaskStore } from "./store/TaskStore";

export function TaskCard({ task }: { task: Task }) {
  const [doneTask, setDoneTask] = useState(false);
  const { lists } = useListStore();
  const { getTask } = useTaskStore();

  const list = lists.find((list) => list.id === task.listId);

  function handleDoneTask(e: React.FormEvent) {
    e.preventDefault();
    setDoneTask(!doneTask);
  }

  function handleTaskClick() {
    if (!task.id) return;
    getTask(task.id);
  }

  return (
    <div className="w-full text-left group flex align-middle items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
      <Checkbox
        id={`task-${task.id}`}
        className="h-5 w-5"
        role="checkbox"
        checked={doneTask}
        onClick={handleDoneTask}
      />
      <button
        className="w-full flex align-middle items-center  p-2 hover:bg-gray-50 rounded-lg transition-colors "
        onClick={handleTaskClick}
      >
        <div className="flex-1 flex items-center gap-6">
          <Label
            htmlFor={`task-${task.id}`}
            className={`font-medium cursor-pointer ${
              doneTask ? "line-through text-gray-400" : "text-gray-900"
            }`}
          >
            {task?.name}
          </Label>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            {task?.dueDate && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{format(task.dueDate, "dd-MM-yy")}</span>
              </div>
            )}

            {task?.subTasks?.length! > 0 && (
              <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded">
                <Hash className="h-3 w-3" />
                <span>{task.subTasks!.length}</span>
                <span>Subtacks</span>
              </div>
            )}
            {list && (
              <Badge
                variant="secondary"
                className="bg-red-100 text-red-600 hover:bg-red-100"
              >
                {list.name}
              </Badge>
            )}
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
    </div>
  );
}
