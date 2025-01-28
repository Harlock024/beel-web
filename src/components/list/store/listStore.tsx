import { create } from "zustand";
import { List } from "@/types/list";

type Store = {
  lists: List[];
  createList: (list: List) => void;
  deleteList: (id: number) => void;
};

const useListStore = create<Store>((set) => ({
  lists: [
    {
      id: 1,
      name: "List 1",
      numTaskAsigned: 0,
    },
  ],
  createList: (list) => set((state) => ({ lists: [...state.lists, list] })),
  deleteList: (id) =>
    set((state) => ({
      lists: state.lists.filter((list) => list.id !== id),
    })),
}));

export default useListStore;
