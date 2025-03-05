import { useTaskStore } from "./store/TaskStore";
import { useFilterStore } from "./store/FilterStore";
import { TaskCard } from "./TaskCard";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TaskForm } from "./TaskForm";
import { useListStore } from "../list/store/listStore";
import { useEffect } from "react";

export function TaskList() {
  const { tasks } = useTaskStore();
  const { isFiltered, filteredTasks } = useFilterStore();
  const { list, getList } = useListStore();

  const tasksToShow = isFiltered ? filteredTasks : tasks;

  return (
    <div className="flex-1 overflow-y-auto">
      <h1 className="text-3xl font-bold">{list?.name.toUpperCase()}</h1>
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
