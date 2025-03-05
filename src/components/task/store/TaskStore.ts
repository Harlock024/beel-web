import { create } from "zustand";
import { Task } from "@/types/task";
import { persist, devtools } from "zustand/middleware";
import useListStore from "@/components/list/store/listStore";
type TaskStore = {
  tasks: Task[];
  task: Task | undefined;
  getTasks: (user_id: number) => void;
  getTaskByListId: (id: number) => void;
  addTask: (task: Task) => void;
  closeTask: () => void;
  getTask: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (task: Task) => void;
};
export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  task: undefined,
  getTaskByListId: (id) => {
    const tasks = useTaskStore
      .getState()
      .tasks.filter((task) => task.listId === id);
    set({ tasks });
  },
  getTasks: (id) => {},

  getTask: (id) => {
    const task = useTaskStore.getState().tasks.find((task) => task.id === id);
    set({ task });
  },
  addTask: (task) => {
    set((state) => ({
      tasks: [...state.tasks, task],
    }));
    useListStore.getState().countedTask(task.listId!);
  },
  removeTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
    useListStore.getState().countedTask(useTaskStore.getState().task!.listId!);
  },
  editTask: (updatedTask) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      ),
    }));
    useListStore.getState().countedTask(updatedTask.listId!);
  },
  closeTask: () => {
    set({ task: undefined });
  },
}));
