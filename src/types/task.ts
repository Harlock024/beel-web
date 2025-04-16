import { Subtask } from "./subTask";
import { Tag } from "./tags";

export interface Task {
  id?: string;
  name: string;
  description?: string;
  listId?: string;
  dueDate?: Date;
  tags?: Tag[];
  subTasks?: Subtask[];
}
