import { Task } from "@/types/task";
import { useSubtaskStore } from "../subTask/hook/useSubtask";
import { FormEvent, useRef } from "react";
import { useTaskStore } from "../task/store/TaskStore";

export function Subtask() {
  const { addSubTask } = useSubtaskStore();
  const { task } = useTaskStore();
  const nameRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subTaskName = nameRef.current?.value;
    if (!subTaskName || !task?.id) {
      console.warn("Invalid input or task ID is missing");
      return;
    }
    addSubTask(subTaskName, task.id);
    nameRef!.current!.value = "";
  };
  console.log(task);
  return (
    <div>
      <h1 className="text-lg font-semibold">SubTasks</h1>
      <form onSubmit={handleSubmit} aria-label="Add new subtask">
        <input
          className="border-none placeholder:font-normal font-normal ring-0 focus:ring-0 focus:outline-none flex-1 ml-2 bg-transparent"
          type="text"
          placeholder="Add New Subtask"
          ref={nameRef}
          aria-label="Subtask name"
        />
        <button type="submit" className="hidden"></button>
      </form>
      <div className="mt-4">
        {task?.subTasks?.map((subtask) => {
          return <div>{subtask}</div>;
        })}
      </div>
    </div>
  );
}
