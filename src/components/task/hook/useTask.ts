import { useContext } from "react";
import { TaskContext } from "../context/TasksProvider";

function useTask() {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTask must be used within a TaskProvider");
  return context;
}

export default useTask;
