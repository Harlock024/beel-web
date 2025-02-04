import { FormEvent, useEffect, useState } from "react";
import { Task } from "@/types/task";
import useTask from "./store/TaskStore";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { CalendarDemo } from "../calendar/CalentadarDemo";
import useList from "@/components/list/store/listStore";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Subtask } from "../subTask/SubTask";

export function TaskDetails({ className }: { className?: string }) {
  const { task, editTask, removeTask } = useTask();
  const { toast } = useToast();
  const { lists, numofTasksAsigned, decrementNumofTasksAsigned } = useList();
  const [currentTask, setCurrentTask] = useState<Task | undefined>(task);

  useEffect(() => {
    setCurrentTask(task);
  }, [task]);

  const handleEditTask = (e: FormEvent) => {
    e.preventDefault();
    if (!currentTask) return;

    const updatedTask: Task = {
      ...currentTask,
      name: currentTask.name,
      description: currentTask.description || undefined,
      dueDate: currentTask.dueDate || undefined,
      listId: currentTask.listId || undefined,
    };
    editTask(updatedTask);
    toast({
      variant: "default",
      description: "Task updated",
    });
  };

  const handleRemoveTask = (e: FormEvent) => {
    e.preventDefault();
    if (!task?.id) return;

    if (task.listId) {
      decrementNumofTasksAsigned(task.listId);
    }
    removeTask(task.id);
    setCurrentTask(undefined);
  };

  const handleDateChange = (date: Date | undefined) => {
    setCurrentTask((prevTask) => ({
      ...prevTask!,
      dueDate: date,
    }));
  };

  const handleListChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newListId = parseInt(e.target.value);

    if (currentTask?.listId) {
      decrementNumofTasksAsigned(currentTask.listId);
    }
    numofTasksAsigned(newListId);
    setCurrentTask((prevTask) => ({
      ...prevTask!,
      listId: newListId,
    }));
  };
  if (!currentTask) return null;
  return (
    <div className={cn("flex flex-col w-full h-full", className)}>
      <input
        className="border-none shadow-inner py-2 text-left ring-0 focus:ring-0 focus:outline-none"
        value={currentTask.name}
        onChange={(e) =>
          setCurrentTask({ ...currentTask, name: e.target.value })
        }
        placeholder="Task name"
      />
      <textarea
        className="border-none shadow-inner p-0 h-60 text-left ring-0 focus:ring-0 focus:outline-none"
        value={currentTask.description || ""}
        onChange={(e) =>
          setCurrentTask({ ...currentTask, description: e.target.value })
        }
        placeholder="Task description"
      />
      <div className="flex items-center gap-2 my-2">
        <span>List:</span>
        <select
          value={currentTask.listId || ""}
          onChange={handleListChange}
          className="border rounded p-1"
        >
          <option value="">Select a list</option>
          {lists.map((list) => (
            <option key={list.id} value={list.id}>
              {list.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2 my-2">
        <span>Due date:</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[180px] justify-start text-left font-normal"
            >
              {currentTask.dueDate ? (
                format(currentTask.dueDate, "dd/MM/yyyy")
              ) : (
                <span>Select a date</span>
              )}
              <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <CalendarDemo
              selectedDate={currentTask.dueDate}
              onDataChange={handleDateChange}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div></div>
      <div>
        <Subtask />
      </div>
      <div className="flex justify-center h-screen items-end  gap-4 mt-4">
        <Button onClick={handleEditTask} className="w-full">
          Save changes
        </Button>
        <Button
          onClick={handleRemoveTask}
          variant="destructive"
          className="w-full"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
