import { Tag } from "@/types/tags";
import { Task } from "@/types/task";
import { create } from "zustand";
import { useTaskStore } from "@/components/task/store/TaskStore";

type TagStore = {
  tags: Tag[];
  addTag(tag: Tag): void;
  assignTagToTask(tag: Tag, task: Task): void;
  unassignTagFromTask(tag: Tag, task: Task): void;
  removeTag(tag: Tag): void;
};

const useTagStore = create<TagStore>((set) => ({
  tags: [],
  addTag: (tag: Tag) => {
    set((state) => ({ tags: [...state.tags, tag] }));
  },
  assignTagToTask: (tag: Tag, task: Task) => {
    const tasks = useTaskStore.getState().tasks;
    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, tags: [...(t.tags || []), tag] } : t,
    );
    const updateTask = updatedTasks.find((t) => t.id === task.id);
    useTaskStore.setState({ tasks: updatedTasks, task: updateTask });
  },
  unassignTagFromTask: (tag: Tag, task: Task) => {
    const tasks = useTaskStore.getState().tasks;
    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, tags: t.tags?.filter((t) => t !== tag) } : t,
    );
    const updateTask = updatedTasks.find((t) => t.id === task.id);
    useTaskStore.setState({
      tasks: updatedTasks,
      task: updateTask,
    });
  },
  removeTag: (tag: Tag) => {
    set((state) => ({
      tags: state.tags.filter((t) => t !== tag),
    }));
  },
}));

export default useTagStore;
