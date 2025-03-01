import { create } from "zustand";
import { Task } from "@/types/task";

type TaskStore = {
  tasks: Task[];
  task: Task | undefined;
  addTask: (task: Task) => void;
  closeTask: () => void;
  getTask: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (task: Task) => void;
};
export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  task: undefined,
  getTask: (id) => {
    const task = useTaskStore.getState().tasks.find((task) => task.id === id);
    set({ task });
  },
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  editTask: (updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      ),
    })),
  closeTask: () => {
    set({ task: undefined });
  },
}));
