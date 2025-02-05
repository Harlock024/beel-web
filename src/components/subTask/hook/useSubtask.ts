import { useTaskStore } from "@/components/task/store/TaskStore";
import { Task } from "@/types/task";
import { create } from "zustand";

type SubTaskStore = {
  addSubTask: (subtask: string, taskId: number) => void;
  deleteSubtask: (task: Task, i: number) => void;
  editSubTask: (task: Task, i: number) => void;
  countSubTask: (task: Task) => number;
};

export const useSubtaskStore = create<SubTaskStore>((set) => ({
  addSubTask: (subtask, taskId) => {
    console.log("Adding subtask:", subtask, "to task ID:", taskId);
    const tasks = useTaskStore.getState().tasks;

    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, subTasks: [...(task.subTasks || []), subtask] }
        : task,
    );
    const updateTask = updatedTasks.find((task) => task.id === taskId);

    useTaskStore.setState({ tasks: updatedTasks, task: updateTask });
  },
  countSubTask: (task) => {
    const countSubtask = task.subTasks?.length! | 0;
    return countSubtask;
  },
  deleteSubtask: (task) => {},
  editSubTask: (task, i) => {},
}));
