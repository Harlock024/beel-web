import { useTaskStore } from "@/components/task/store/TaskStore";
import { Subtask } from "@/types/subTask";
import { Task } from "@/types/task";
import { create } from "zustand";

type SubTaskStore = {
  addSubTask: (subtask: Subtask, taskId: number) => void;
  deleteSubtask: (task: Task, subTask: Subtask) => void;
  countSubTask: (task: Task) => number;
};
export const useSubtaskStore = create<SubTaskStore>((set) => ({
  addSubTask: (subtask, taskId) => {
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
  deleteSubtask: (task, subtask: Subtask) => {
    const tasks = useTaskStore.getState().tasks;
    const updatedTasks = tasks.map((t) =>
      t.id === task.id
        ? { ...t, subTasks: t.subTasks?.filter((sub) => sub !== subtask) }
        : t,
    );
    const updateTask = updatedTasks.find((t) => t.id === task.id);
    useTaskStore.setState({ task: updateTask });
    useTaskStore.setState({ tasks: updatedTasks });
  },
}));
