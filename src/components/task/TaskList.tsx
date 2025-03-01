import { useTaskStore } from "./store/TaskStore";
import { useFilterStore } from "./store/FilterStore";
import { TaskCard } from "./TaskCard";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TaskForm } from "./TaskForm";

export function TaskList({ className }: { className?: string }) {
  const { tasks } = useTaskStore();
  const { isFiltered, filteredTasks } = useFilterStore();
  const tasksToShow = isFiltered ? filteredTasks : tasks;
  return (
    <div className={className}>
      <h1 className="text-3xl font-bold">All tasks</h1>
      <TaskForm className="w-full" />
      <ScrollArea className="w-full">
        {tasksToShow.map((task) => (
          <>
            <TaskCard task={task} key={task.id} />
            <Separator />
          </>
        ))}
      </ScrollArea>
    </div>
  );
}
