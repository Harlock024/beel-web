import { create } from "zustand";
import { Task } from "@/types/task";
import { useTaskStore } from "./TaskStore";

// enum Isfiltered {
//   ALL = "all_task",
//   TODAY = "today",
//   TOMORROW = "tomorrow",
//   WEEK = "week",
// }

type FilterStore = {
  filteredTasks: Task[];
  isFiltered?: boolean | null;
  filterByListId: (id: number) => void;
  resetFilter: () => void;
};

export const useFilterStore = create<FilterStore>((set) => ({
  filteredTasks: [],
  isFiltered: null,
  filterByListId: (id) => {
    const tasks = useTaskStore
      .getState()
      .tasks.filter((task) => task.listId === id);
    set({ filteredTasks: tasks, isFiltered: true || false });
  },
  resetFilter: () => set({ isFiltered: false }),
}));
