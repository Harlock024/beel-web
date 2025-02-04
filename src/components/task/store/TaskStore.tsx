import { create } from "zustand";
import { Task } from "@/types/task";

type StoreTask = {
  tasks: Task[];
  task: Task | undefined;
  countedSubTask: number;
  selectedTaskId: number | null;
  finteredTask: Task[];
  isFiltered: boolean;
  getTask: (id: number) => void;
  addTask: (task: Task) => void;
  addSubTask: (subtask: string, id: number) => void;
  countSubTask: (task: Task) => void;
  ListIdFiltered: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (task: Task) => void;
  deselectTask: () => void;
  resetFilter: () => void;
};
const useTask = create<StoreTask>((set) => ({
  tasks: [
    {
      id: 1,
      name: "Task 1",
      description: "Description of task 1",
      listId: 0,
      dueDate: new Date(),
      tags: ["tag1", "tag2"],
      subTasks: ["subtask 1", "subtask 2"],
    },
    {
      id: 2,
      name: "Task 2",
      description: "Description of task 2",
      listId: 0,
      dueDate: new Date(),
      tags: ["tag1", "tag2"],
      subTasks: ["subtask 1", "subtask 2"],
    },
  ],
  task: undefined,
  countedSubTask: 0,
  selectedTaskId: 0,
  finteredTask: [],
  isFiltered: false,
  getTask: (id: number) => {
    const task = useTask.getState().tasks.find((task) => task.id === id);
    set({ task });
  },
  addTask: (task: Task) => {
    set((state) => ({ tasks: [...state.tasks, task] }));
  },

  addSubTask: (subtask: string, id: number) => {
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id
          ? { ...task, subTasks: [...(task.subTasks || []), subtask] }
          : task,
      );
      const updatedTask = updatedTasks.find((task) => task.id === id);
      return { tasks: updatedTasks, task: updatedTask };
    });
  },
  countSubTask(task) {
    const count = task.subTasks?.length || 0;
    set({ countedSubTask: count });
  },
  removeTask: (id: number) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  },
  editTask: (task: Task) => {
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
    }));
  },
  ListIdFiltered(id) {
    const tasks = useTask.getState().tasks.filter((task) => task.listId === id);
    console.log("task store id filtered ", id);
    set({ finteredTask: tasks, isFiltered: true });
  },
  resetFilter() {
    set({ isFiltered: false });
  },
  deselectTask: () => {
    set({ selectedTaskId: null });
  },
}));
export default useTask;
