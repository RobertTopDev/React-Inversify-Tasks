import { useMemo, useState, useEffect } from 'react';
import { container } from '../di/container';
import { TYPES } from '../di/symbols';
import { ITaskService } from '../domain/ports/ITaskService';
import { Task } from '../domain/models/Task';
import { useConfig } from './useConfig';

export const useTaskService = () => {
  const taskService = useMemo(() => container.get<ITaskService>(TYPES.TaskService), []);
  const config = useConfig();
  const [tasks, setTasks] = useState<Task[]>(() => taskService.list());
  
  useEffect(() => {
    setTasks(taskService.list());
    
    const intervalId = setInterval(() => {
      setTasks(taskService.list());
    }, config.taskRefreshInterval);
    
    return () => clearInterval(intervalId);
  }, [taskService, config.taskRefreshInterval]);
  
  return {
    tasks,
    addTask: (task: Task) => {
      taskService.add(task);
      setTasks(taskService.list());
    },
    deleteTask: (id: string) => {
      taskService.delete(id);
      setTasks(taskService.list());
    },
    toggleTaskCompleted: (id: string) => {
      taskService.toggleCompleted(id);
      setTasks(taskService.list());
    },
    updateTask: (id: string, updates: Partial<Omit<Task, 'id'>>) => {
      taskService.update(id, updates);
      setTasks(taskService.list());
    },
    getTaskById: (id: string) => taskService.getById(id),
    clearAllTasks: () => {
      taskService.clearAll();
      setTasks([]);
    }
  };
};
