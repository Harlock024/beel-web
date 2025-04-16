import { create } from "zustand";
import { Task } from "@/types/task";
import useListStore from "@/stores/listStore";

import { v4 as uuidv4 } from "uuid";

type TaskStore = {
  tasks: Task[];
  task: Task | undefined;
  getTasks: (user_id: string) => void;
  getTaskByListId: (id: string) => void;
  addTask: (task: Task) => void;
  closeTask: () => void;
  getTask: (id: string) => void;
  removeTask: (id: string) => void;
  editTask: (task: Task) => void;
};

const TaskID = uuidv4().toString();

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [
    {
      id: TaskID,
      name: "Task 1",
      description: "Description for Task 1",
      status: "pending",
      listId: "1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],

  task: undefined,
  getTaskByListId: (id) => {
    const tasks = useTaskStore
      .getState()
      .tasks.filter((task) => task.listId === id);
    set({ tasks });
  },
  getTasks: (id) => {},

  getTask: (id) => {
    const task = useTaskStore.getState().tasks.find((task) => task.id === id);
    set({ task });
  },
  addTask: (task) => {
    set((state) => ({
      tasks: [...state.tasks, task],
    }));
    useListStore.getState().countedTask(task.listId!);
  },
  removeTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
    useListStore.getState().countedTask(useTaskStore.getState().task!.listId!);
  },
  editTask: (updatedTask) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    }));
    useListStore.getState().countedTask(updatedTask.listId!);
  },
  closeTask: () => {
    set({ task: undefined });
  },
}));
