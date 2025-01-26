import useTask from "./hook/useTask";
import { TaskCard } from "./TaskCard";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export function TaskList() {
  const { tasks } = useTask();
  return (
    <div className="flex items-center flex-col h-72 border  space-y-4">
      <ScrollArea className="w-full">
        {tasks.map((task) => (
          <>
            <TaskCard task={task} key={task.id} />
            <Separator />
          </>
        ))}
      </ScrollArea>
    </div>
  );
}
