import useTask from "./hook/useTask";
import { TaskCard } from "./TaskCard";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export function TaskList() {
  const { tasks } = useTask();


  




  return (
    <div className="flex flex-col flex-grow items-center w-full h-px box-border ">
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
