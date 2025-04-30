import { injectable } from 'inversify';
import { Task } from '../../domain/models/Task';
import { ITaskService } from '../../domain/ports/ITaskService';

const STORAGE_KEY = 'react-inversify-tasks';

@injectable()
export class TaskService implements ITaskService {
  private tasks: Task[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    try {
      const storedTasks = localStorage.getItem(STORAGE_KEY);
      if (storedTasks) {
        // Parse the stored tasks and convert date strings back to Date objects
        this.tasks = JSON.parse(storedTasks, (key, value) => {
          if (key === 'createdAt' && value) {
            return new Date(value);
          }
          return value;
        });
      }
    } catch (error) {
      console.error('Failed to load tasks from localStorage:', error);
    }
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
    } catch (error) {
      console.error('Failed to save tasks to localStorage:', error);
    }
  }

  add(task: Task): void {
    // Add validation
    if (!task.text.trim()) {
      throw new Error('Task text cannot be empty');
    }
    
    // Set defaults for new fields
    const newTask: Task = {
      ...task,
      createdAt: task.createdAt || new Date(),
      completed: task.completed || false
    };
    
    this.tasks.push(newTask);
    this.saveToStorage();
  }

  list(): Task[] {
    return [...this.tasks];
  }

  delete(id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveToStorage();
  }

  update(id: string, updates: Partial<Omit<Task, 'id'>>): void {
    this.tasks = this.tasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    );
    this.saveToStorage();
  }

  getById(id: string): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }

  toggleCompleted(id: string): void {
    this.tasks = this.tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.saveToStorage();
  }

  clearAll(): void {
    this.tasks = [];
    this.saveToStorage();
  }
}
