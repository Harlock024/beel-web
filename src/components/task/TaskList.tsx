import { useTaskStore } from "./store/TaskStore";
import { useFilterStore } from "./store/FilterStore";
import { TaskCard } from "./TaskCard";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export function TaskList({ className }: { className?: string }) {
  const { tasks } = useTaskStore();
  const { isFiltered, filteredTasks } = useFilterStore();
  const tasksToShow = isFiltered ? filteredTasks : tasks;
  return (
    <div className={className}>
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
