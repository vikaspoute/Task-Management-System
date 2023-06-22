export class Task {
  taskId: number | null = null;
  taskName: string = '';
  description: string = '';
  dueDate: string = '';
  assignedTo: { userId: number | null } = { userId: null };
  priority: string = '';
  status: string = '';
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
}
