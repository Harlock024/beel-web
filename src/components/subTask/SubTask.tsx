import { Task } from "@/types/task";
import useTask from "../task/store/TaskStore";
import { FormEvent, useRef, useMemo } from "react";

export function Subtask() {
  const { addSubTask, task, getTask } = useTask();
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

  const subTasksList = useMemo(() => {
    if (!task?.subTasks || task.subTasks.length === 0) {
      return <div>No subtasks added yet</div>;
    }
    return task.subTasks.map((subTask, index) => (
      <div key={index} className="subtask-item">
        {subTask}
      </div>
    ));
  }, [task?.subTasks]);

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
      <div className="mt-4">{subTasksList}</div>
    </div>
  );
}
