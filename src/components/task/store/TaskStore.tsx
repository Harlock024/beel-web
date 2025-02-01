import { create } from "zustand";
import { Task } from "@/types/task";
type StoreTask = {
  tasks: Task[];
  task: Task | undefined;
  finteredTask: Task[];
  isFiltered: boolean;
  getTask: (id: number) => void;
  addTask: (task: Task) => void;
  ListIdFiltered: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (task: Task) => void;
  resetFilter: () => void;
};
const useTask = create<StoreTask>((set) => ({
  tasks: [],
  task: undefined,
  finteredTask: [],
  isFiltered: false,
  getTask: (id: number) => {
    const task = useTask.getState().tasks.find((task) => task.id === id);
    set({ task });
  },
  addTask: (task: Task) => {
    set((state) => ({ tasks: [...state.tasks, task] }));
  },
  removeTask: (id: number) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  },
  editTask: (task: Task) => {
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
    }));
  },

  ListIdFiltered(id) {
    const tasks = useTask.getState().tasks.filter((task) => task.listId === id);
    console.log("task store id filtered ", id);
    set({ finteredTask: tasks, isFiltered: true });
  },
  resetFilter() {
    set({ isFiltered: false });
  },
}));
export default useTask;
