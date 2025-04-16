import { FormEvent, useEffect, useState } from "react";
import { Task } from "@/types/task";
import { useTaskStore } from "@/stores/TaskStore";
import { ChevronDown, Scan, X } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { CalendarDemo } from "../calendar/CalentadarDemo";
import useList from "@/stores/listStore";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Subtask } from "../subTask/SubTask";
import { TagSelect } from "../tags/tagSelect";
import { useFilterStore } from "@/stores/FilterStore";

type TaskDetailsProps = {
  className?: string;
};

export function TaskDetails({ className }: TaskDetailsProps) {
  const { task, editTask, removeTask, closeTask } = useTaskStore();
  const { toast } = useToast();
  const { lists, countedTask } = useList();
  const [currentTask, setCurrentTask] = useState<Task | undefined>(task);
  const [isSaving, setIsSaving] = useState(false);

  // Reset current task when task prop changes
  useEffect(() => {
    setCurrentTask(task);
  }, [task]);

  const handleCloseTask = () => {
    closeTask();
    setCurrentTask(undefined);
  };

  const handleEditTask = async (e: FormEvent) => {
    e.preventDefault();

    if (!currentTask) return;

    setIsSaving(true);
    try {
      const updatedTask: Task = {
        ...currentTask,
        name: currentTask.name.trim(),
        description: currentTask.description?.trim() || undefined,
        dueDate: currentTask.dueDate || undefined,
        listId: currentTask.listId!,
      };

      editTask(updatedTask);
      countedTask(currentTask.listId!);
      countedTask(updatedTask.listId!);

      toast({
        variant: "default",
        title: "Success",
        description: "Task updated successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update task",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemoveTask = async (e: FormEvent) => {
    e.preventDefault();
    if (!task?.id) return;

    try {
      removeTask(task.id);
      if (task.listId) {
        countedTask(task.listId);
        setCurrentTask(undefined);
      }

      toast({
        variant: "default",
        title: "Success",
        description: "Task deleted successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete task",
      });
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    setCurrentTask((prev) => (prev ? { ...prev, dueDate: date } : undefined));
  };

  const handleListChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newListId = e.target.value;

    setCurrentTask((prev) => {
      if (!prev) return undefined;

      // Update counts for old and new lists
      if (prev.listId) countedTask(prev.listId);
      countedTask(newListId);

      return { ...prev, listId: newListId };
    });
  };

  const handleNameChange = (value: string) => {
    setCurrentTask((prev) => (prev ? { ...prev, name: value } : undefined));
  };

  const handleDescriptionChange = (value: string) => {
    setCurrentTask((prev) =>
      prev ? { ...prev, description: value } : undefined,
    );
  };

  // No task selected state
  if (!currentTask) {
    return (
      <div
        className={cn(
          "flex flex-col justify-center items-center h-full max-h-[100vh] overflow-y-auto text-muted-foreground",
          className,
        )}
      >
        <Scan size={48} className="mb-4 opacity-50" />
        <p className="text-lg">No task selected</p>
        <p className="text-sm">Select a task to view or edit details</p>
      </div>
    );
  }

  return (
    <div
      className={cn("w-80 border-l bg-white flex flex-col h-full", className)}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="font-semibold">Task Details</h3>
        <button
          type="button"
          onClick={handleCloseTask}
          className="rounded-full p-1 hover:bg-gray-100 transition-colors"
          aria-label="Close task details"
        >
          <X size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Task Name */}
        <div>
          <label
            htmlFor="task-name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Task Name
          </label>
          <input
            id="task-name"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            value={currentTask.name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Enter task name"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="task-description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="task-description"
            className="w-full border rounded px-3 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-primary"
            value={currentTask.description || ""}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            placeholder="Enter task description"
          />
        </div>

        {/* List Selection */}
        <div>
          <label
            htmlFor="task-list"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            List
          </label>
          <select
            id="task-list"
            value={currentTask.listId || ""}
            onChange={handleListChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {lists.map((list) => (
              <option key={list.id} value={list.id}>
                {list.name}
              </option>
            ))}
          </select>
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Due Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                {currentTask.dueDate ? (
                  format(currentTask.dueDate, "PPP")
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

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags
          </label>
          <TagSelect taskSelected={currentTask} />
        </div>

        {/* Subtasks */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subtasks
          </label>
          <Subtask />
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t space-y-2">
        <Button
          onClick={handleEditTask}
          className="w-full"
          disabled={isSaving || !currentTask.name.trim()}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
        <Button
          onClick={handleRemoveTask}
          variant="destructive"
          className="w-full"
        >
          Delete Task
        </Button>
      </div>
    </div>
  );
}
