import { create } from "zustand";
import { Task } from "@/types/task";
import { useTaskStore } from "./TaskStore";

type FilterStore = {
  filteredTasks: Task[];
  isFiltered: boolean;
  filterByListId: (id: number) => void;
  resetFilter: () => void;
};

export const useFilterStore = create<FilterStore>((set) => ({
  filteredTasks: [],
  isFiltered: false,
  filterByListId: (id) => {
    const tasks = useTaskStore
      .getState()
      .tasks.filter((task) => task.listId === id);
    set({ filteredTasks: tasks, isFiltered: true });
  },
  resetFilter: () => set({ isFiltered: false }),
}));
