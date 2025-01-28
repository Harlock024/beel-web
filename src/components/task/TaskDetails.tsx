import { FormEvent, useEffect, useState } from "react";
import { Task } from "@/types/task";
import useTask from "./hook/useTask";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarDemo } from "../calendar/CalentadarDemo";

export function TaskDetails() {
  const { task } = useTask();

  return <>{task ? <TaskData /> : null}</>;
}
function TaskData() {
  const { task, setTask, editTask, removeTask } = useTask();
  const { toast } = useToast();
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);
  console.log("task", task?.dueDate);
  console.log("current", currentTask?.dueDate);

  function handleEditTask(e: FormEvent) {
    e.preventDefault();
    if (!currentTask) return;

    const updateTask = {
      ...currentTask,
      name: currentTask.name,
      description: currentTask.description || "",
      dueDate: currentTask.dueDate || undefined,
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
    setTask(undefined);
  }

  return (
    <div className="flex gap-10 w-full border border-blue-400 h-screen ">
      <div className="flex flex-col w-full h-full">
        <input
          className="border-none shadow-inner py-2  text-left   ring-0 focus:ring-0 focus:outline-none"
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
        <div>List</div>
        <div className="flexitems-center">
          <div className="flex  gap-2">
            <div>due date:</div>
            <Popover>
              <PopoverTrigger>
                <button className="flex  items-center">
                  <div className="text-center  ">
                    {currentTask?.dueDate && (
                      <p className="flex space-x-10 ">
                        {format(task!.dueDate!, "dd/MM/yyyy")}
                      </p>
                    )}
                  </div>
                  <ChevronDown />
                </button>
              </PopoverTrigger>
              <PopoverContent>
                <CalendarDemo />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div>Tags</div>
        <div className="w-full border flex justify-center gap-10">
          <Button type="button" onClick={handleEditTask} className="w-56  h-12">
            Save changes
          </Button>
          <Button
            type="button"
            onClick={handleRemoveTask}
            className="w-56  h-12"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
