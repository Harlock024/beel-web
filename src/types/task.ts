import { Subtask } from "./subTask";

export interface Task {
  id?: number;
  name: string;
  description?: string;
  listId?: number;
  dueDate?: Date;
  tags?: string[];
  subTasks?: Subtask[];
}
