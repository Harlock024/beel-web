import { create } from "zustand";
import { List } from "@/types/list";
import { useTaskStore } from "@/stores/TaskStore";
import { useFilterStore } from "@/stores/FilterStore";

import { v4 as uuidv4 } from "uuid";

const LIST_ID = uuidv4().toString();

type Store = {
  lists: List[];
  list: List | null;
  getList: (id: string) => void;
  createList: (list: List) => void;
  countedTask: (list_id: string) => void;
  updateList: (id: string, updatedlist: Partial<List>) => void;
  deleteList: (id: string) => void;
};
export const useListStore = create<Store>((set) => ({
  lists: [
    { id: LIST_ID, name: "personal", numTaskAsigned: 0, color: "", tasks: [] },
  ],
  list: null,
  createList: (list) => set((state) => ({ lists: [...state.lists, list] })),
  updateList(id, updatedList) {
    set((state) => ({
      lists: state.lists.map((list) =>
        list.id === id ? { ...list, ...updatedList } : list,
      ),
    }));
  },
  countedTask: (list_id: string) => {
    const taskList = useTaskStore.getState().tasks;
    const taskCount = taskList.filter((task) => task.listId === list_id);
    set((state) => ({
      lists: state.lists.map((list) =>
        list.id === list_id
          ? { ...list, numTaskAsigned: taskCount.length }
          : list,
      ),
    }));
  },
  deleteList: (id) =>
    set((state) => ({
      lists: state.lists.filter((list) => list.id !== id),
    })),
  getList: (id: string) => {
    set((state) => {
      const selectedList = state.lists.find((list) => list.id === id) || null;
      if (selectedList) {
        let taskList = useTaskStore
          .getState()
          .tasks.filter((task) => task.listId === id);
        useFilterStore.setState({ filteredTasks: taskList });
      }
      return { list: selectedList };
    });
  },
}));
export default useListStore;
