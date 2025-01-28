import { createContext, useState, Dispatch, SetStateAction } from "react";
import { Task } from "@/types/task";

interface TaskContextType {
  tasks: Task[];
  task: Task | undefined;
  setTask: Dispatch<SetStateAction<Task | undefined>>;
  getTask: (id: number) => void;
  addTask: (task: Task) => void;
  removeTask: (id: number) => void;
  editTask: (task: Task) => void;
}
export const TaskContext = createContext<undefined | TaskContextType>(
  undefined,
);
function useTaskReducer() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<Task | undefined>(undefined);
  const getTask = (id: number) => {
    const foundTask = tasks.find((task) => task.id == id);
    setTask(foundTask || { id: 0, name: "", description: "" });
  };

  const addTask = (task: Task) => {
    if (!task) return;
    setTasks([
      ...tasks,
      {
        ...task,
        id: tasks.length + 1,
        name: task.name,
        description: task.description,
        dueDate: task.dueDate,
      },
    ]);
  };
  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const editTask = (task: Task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? { ...t, ...task } : t)));
  };
  return {
    tasks,
    task,
    setTask,
    getTask,
    addTask,
    removeTask,
    editTask,
  };
}
export function TaskProvider({ children }: { children: React.ReactNode }) {
  const { tasks, task, setTask, getTask, addTask, removeTask, editTask } =
    useTaskReducer();

  return (
    <TaskContext.Provider
      value={{
        tasks,
        task,
        setTask,
        getTask,
        addTask,
        removeTask,
        editTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
