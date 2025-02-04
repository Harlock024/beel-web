export interface Task {
  id: number;
  name: string;
  description?: string;
  listId?: number;
  dueDate?: Date;
  tags?: String[];
  subTasks?: string[];
}
