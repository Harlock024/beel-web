import { Subtask } from "./subTask";
import { Tag } from "./tags";

export interface Task {
  id?: number;
  name: string;
  description?: string;
  listId: number;
  dueDate?: Date;
  tags?: Tag[];
  subTasks?: Subtask[];
}
