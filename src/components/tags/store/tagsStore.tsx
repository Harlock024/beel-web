import { create } from "zustand";

type TagStore = {
  tags: string[];
  addTag(tag: string): void;
  removeTag(tag: string): void;
};

const useTagStore = create<TagStore>((set) => ({
  tags: [],
  addTag: (tag: string) => {
    set((state) => ({ tags: [...state.tags, tag] }));
  },
  removeTag: (tag: string) => {
    set((state) => ({
      tags: state.tags.filter((t) => t !== tag),
    }));
  },
}));

export default useTagStore;
