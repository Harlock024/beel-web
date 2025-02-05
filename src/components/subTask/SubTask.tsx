import { Task } from "@/types/task";
import { useTaskStore } from "../task/store/TaskStore";
import { useSubtaskStore } from "./hook/useSubtask";
import { FormEvent, useState, useMemo } from "react";

export function Subtask() {
  const { task, getTask } = useTaskStore();
  const addSubTask = useSubtaskStore((state) => state.addSubTask);
  const [subTaskName, setSubTaskName] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!subTaskName.trim()) {
      console.log("Subtask name is required", subTaskName);
      return;
    }
    if (!task?.id) {
      console.warn("Task ID is missing");
      return;
    }
    addSubTask(subTaskName, task.id);
    setSubTaskName("");
  };
  const subTasksList = useMemo(() => {
    if (!task?.subTasks || task.subTasks.length === 0) {
      return <div>No subtasks added yet</div>;
    }
    console.log(task);
    return task.subTasks.map((subTask, index) => (
      <div key={index} className="subtask-item">
        {subTask}
      </div>
    ));
  }, [task?.subTasks]);

  if (!task) {
    return <div>No task selected</div>;
  }
  return (
    <div>
      <h1 className="text-lg font-semibold">SubTasks</h1>
      <form onSubmit={handleSubmit} aria-label="Add new subtask">
        <input
          className="border-none placeholder:font-normal font-normal ring-0 focus:ring-0 focus:outline-none flex-1 ml-2 bg-transparent"
          type="text"
          placeholder="Add New Subtask"
          onChange={(e) => setSubTaskName(e.target.value)}
          aria-label="Subtask name"
        />
        <button type="button" className="hidden"></button>
      </form>
      <div className="mt-4">{subTasksList}</div>
    </div>
  );
}
