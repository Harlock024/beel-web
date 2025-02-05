import { Tag } from "@/types/tags";
import { create } from "zustand";

type TagStore = {
  tags: Tag[];
  addTag(tag: Tag): void;
  removeTag(tag: Tag): void;
};

const useTagStore = create<TagStore>((set) => ({
  tags: [],
  addTag: (tag: Tag) => {
    set((state) => ({ tags: [...state.tags, tag] }));
  },
  removeTag: (tag: Tag) => {
    set((state) => ({
      tags: state.tags.filter((t) => t !== tag),
    }));
  },
}));

export default useTagStore;
