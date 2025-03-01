import { create } from "zustand";
import { List } from "@/types/list";
import { ViteID } from "node_modules/astro/dist/core/build/types";

type Store = {
  lists: List[];
  listId: number | null;
  getListID: (id: number) => void;
  createList: (list: List) => void;
  numofTasksAsigned: (id: number) => void;
  decrementNumofTasksAsigned: (id: number) => void;
  updateList: (id: number, updatedlist: Partial<List>) => void;
  deleteList: (id: number) => void;
  deselectList: () => void;
};
const useListStore = create<Store>((set) => ({
  lists: [{ id: 1, name: "personal", numTaskAsigned: 0, color: "" }],
  listId: null,
  createList: (list) => set((state) => ({ lists: [...state.lists, list] })),
  updateList(id, updatedList) {
    set((state) => ({
      lists: state.lists.map((list) =>
        list.id === id ? { ...list, ...updatedList } : list
      ),
    }));
  },

  numofTasksAsigned: (id) =>
    set((state) => ({
      lists: state.lists.map((list) =>
        list.id === id
          ? { ...list, numTaskAsigned: list.numTaskAsigned + 1 }
          : list
      ),
    })),
  decrementNumofTasksAsigned: (id) =>
    set((state) => ({
      lists: state.lists.map((list) =>
        list.id === id
          ? { ...list, numTaskAsigned: list.numTaskAsigned - 1 }
          : list
      ),
    })),
  deleteList: (id) =>
    set((state) => ({
      lists: state.lists.filter((list) => list.id !== id),
    })),
  getListID: (id: number) => {
    set({ listId: id });
  },
  deselectList: () => {
    set({ listId: null });
  },
}));
export default useListStore;
