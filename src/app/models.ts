export interface ToDo {
  title: string;
  name: string;
  tasks: Task[];
}

export interface Task {
  taskName: string;
  priority: string;
  dueDate: string;
}
