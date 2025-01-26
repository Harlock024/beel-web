import { createContext, useState } from "react";
import { Task } from "@/types/task";

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (id: number) => void;
  editTask: (task: Task) => void;
}

export const TaskContext = createContext<undefined | TaskContextType>(
  undefined,
);

function useTaskReducer() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      name: "Task 1",
      description: "This is a task",
    },
    {
      id: 2,
      name: "Task 2",
      description: "This is a task",
    },
    {
      id: 3,
      name: "Task 3",
      description: "This is a task",
    },
    {
      id: 4,
      name: "Task 4",
      description: "This is a task",
    },
    {
      id: 5,
      name: "Task 5",
      description: "This is a task",
    },
  ]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };
  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const editTask = (task: Task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? { ...t, ...task } : t)));
  };

  return {
    tasks,
    addTask,
    removeTask,
    editTask,
  };
}
export function TaskProvider({ children }: { children: React.ReactNode }) {
  const { tasks, addTask, removeTask, editTask } = useTaskReducer();

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask, editTask }}>
      {children}
    </TaskContext.Provider>
  );
}
