import { Task } from '../models/Task';

export interface ITaskService {
  add(task: Task): void;
  list(): Task[];
  delete(id: string): void;
  update(id: string, updates: Partial<Omit<Task, 'id'>>): void;
  getById(id: string): Task | undefined;
  toggleCompleted(id: string): void;
  clearAll(): void;
}
