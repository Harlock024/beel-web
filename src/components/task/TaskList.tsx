import useTask from "./store/TaskStore";
import { TaskCard } from "./TaskCard";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect } from "react";

export function TaskList() {
  const { tasks, finteredTask, ListIdFiltered, isFiltered } = useTask();

  const tasksToShow = isFiltered ? finteredTask : tasks;

  return (
    <div className="flex flex-col flex-grow items-center w-full h-px box-border ">
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
