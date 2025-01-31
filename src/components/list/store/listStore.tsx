import { create } from "zustand";
import { List } from "@/types/list";

type Store = {
  lists: List[];
  selectedListId: number | null;
  selectList: (id: number) => void;
  createList: (list: List) => void;
  numofTasksAsigned: (id: number) => void;
  decrementNumofTasksAsigned: (id: number) => void;
  updateList: (id: number, updatedlist: Partial<List>) => void;
  deleteList: (id: number) => void;
  deselectList: () => void;
};
const useListStore = create<Store>((set) => ({
  lists: [],
  selectedListId: null,
  createList: (list) => set((state) => ({ lists: [...state.lists, list] })),
  updateList(id, updatedList) {
    set((state) => ({
      lists: state.lists.map((list) =>
        list.id === id ? { ...list, ...updatedList } : list,
      ),
    }));
  },
  numofTasksAsigned: (id) =>
    set((state) => ({
      lists: state.lists.map((list) =>
        list.id === id
          ? { ...list, numTaskAsigned: list.numTaskAsigned + 1 }
          : list,
      ),
    })),
  decrementNumofTasksAsigned: (id) =>
    set((state) => ({
      lists: state.lists.map((list) =>
        list.id === id
          ? { ...list, numTaskAsigned: list.numTaskAsigned - 1 }
          : list,
      ),
    })),
  deleteList: (id) =>
    set((state) => ({
      lists: state.lists.filter((list) => list.id !== id),
    })),
  selectList: (id: number) => {
    set({ selectedListId: id });
  },
  deselectList: () => {
    set({ selectedListId: null });
  },
}));
export default useListStore;
