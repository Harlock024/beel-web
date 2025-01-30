import { FormEvent, useEffect, useState } from "react";
import { Task } from "@/types/task";
import useTask from "./hook/useTask";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarDemo } from "../calendar/CalentadarDemo";
import useList from "@/components/list/store/listStore";

export function TaskDetails() {
  const { task } = useTask();

  return <>{task ? <TaskData /> : null}</>;
}

function TaskData() {
  const { task, setTask, editTask, removeTask } = useTask();
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
    setTask(undefined);
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
    <div className="flex gap-10 w-full h-full">
      <div className="flex flex-col w-full h-full">
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
        <div className="flex items-center">
          <div className="flex gap-2">
            <div>List:</div>
            <select
              value={currentTask.listId || ""}
              onChange={handleListChange}
            >
              <option value="">Select a list</option>
              {lists.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex gap-2">
            <div>Due date:</div>
            <Popover>
              <PopoverTrigger>
                <button className="flex items-center justify-center">
                  <div className="text-center">
                    {currentTask.dueDate && (
                      <p>{format(currentTask.dueDate, "dd/MM/yyyy")}</p>
                    )}
                    {!currentTask.dueDate && <p>Select a date</p>}
                  </div>
                  <ChevronDown />
                </button>
              </PopoverTrigger>
              <PopoverContent>
                <CalendarDemo
                  selectedDate={currentTask.dueDate}
                  onDataChange={handleDateChange}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="w-full border flex justify-center gap-10">
          <Button type="button" onClick={handleEditTask} className="w-56 h-12">
            Save changes
          </Button>
          <Button
            type="button"
            onClick={handleRemoveTask}
            className="w-56 h-12"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
