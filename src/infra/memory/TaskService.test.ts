import { TaskService } from './TaskService';
import { Task } from '../../domain/models/Task';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('TaskService', () => {
  let taskService: TaskService;
  let mockTask: Task;
  
  beforeEach(() => {
    // Clear localStorage mock before each test
    localStorageMock.clear();
    jest.clearAllMocks();
    
    taskService = new TaskService();
    mockTask = {
      id: '1',
      text: 'Test task',
      completed: false,
      createdAt: new Date(),
    };
  });
  
  test('should add a task', () => {
    taskService.add(mockTask);
    const tasks = taskService.list();
    
    expect(tasks).toHaveLength(1);
    expect(tasks[0]).toEqual(mockTask);
    expect(localStorageMock.setItem).toHaveBeenCalled();
  });
  
  test('should list all tasks', () => {
    const mockTask2: Task = {
      id: '2',
      text: 'Another test task',
      completed: true,
      createdAt: new Date(),
    };
    
    taskService.add(mockTask);
    taskService.add(mockTask2);
    
    const tasks = taskService.list();
    
    expect(tasks).toHaveLength(2);
    expect(tasks).toEqual([mockTask, mockTask2]);
  });
  
  test('should delete a task', () => {
    taskService.add(mockTask);
    expect(taskService.list()).toHaveLength(1);
    
    taskService.delete(mockTask.id);
    expect(taskService.list()).toHaveLength(0);
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(2); // Once for add, once for delete
  });
  
  test('should toggle task completion', () => {
    taskService.add(mockTask);
    expect(taskService.list()[0].completed).toBe(false);
    
    taskService.toggleCompleted(mockTask.id);
    expect(taskService.list()[0].completed).toBe(true);
    
    taskService.toggleCompleted(mockTask.id);
    expect(taskService.list()[0].completed).toBe(false);
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(3); // Once for add, twice for toggle
  });
  
  test('should update a task', () => {
    taskService.add(mockTask);
    
    const updates = {
      text: 'Updated task',
      priority: 'high' as const
    };
    
    taskService.update(mockTask.id, updates);
    
    const updatedTask = taskService.getById(mockTask.id);
    expect(updatedTask?.text).toBe('Updated task');
    expect(updatedTask?.priority).toBe('high');
    expect(updatedTask?.id).toBe(mockTask.id);
    expect(updatedTask?.completed).toBe(mockTask.completed);
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(2); // Once for add, once for update
  });
  
  test('should get a task by id', () => {
    taskService.add(mockTask);
    
    const task = taskService.getById(mockTask.id);
    expect(task).toEqual(mockTask);
    
    const nonExistentTask = taskService.getById('non-existent-id');
    expect(nonExistentTask).toBeUndefined();
  });
  
  test('should validate task text is not empty', () => {
    const invalidTask: Task = {
      ...mockTask,
      text: ''
    };
    
    expect(() => taskService.add(invalidTask)).toThrow('Task text cannot be empty');
    expect(localStorageMock.setItem).not.toHaveBeenCalled(); // Should not save invalid task
  });
  
  test('should clear all tasks', () => {
    taskService.add(mockTask);
    taskService.add({
      ...mockTask,
      id: '2',
      text: 'Another task'
    });
    
    expect(taskService.list()).toHaveLength(2);
    
    taskService.clearAll();
    
    expect(taskService.list()).toHaveLength(0);
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(3); // Twice for add, once for clear
  });
  
  test('should load tasks from localStorage on initialization', () => {
    // Setup localStorage with pre-existing tasks
    const testDate = new Date('2025-01-01T12:00:00Z');
    const storedTasks = [
      {
        id: 'stored-1',
        text: 'Stored task',
        completed: true,
        createdAt: testDate.toISOString() // Simulate JSON serialization
      }
    ];
    
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(storedTasks));
    
    // Create a new service instance which should load from localStorage
    const newTaskService = new TaskService();
    
    // Check if tasks were loaded
    const loadedTasks = newTaskService.list();
    expect(loadedTasks).toHaveLength(1);
    expect(loadedTasks[0].id).toBe('stored-1');
    expect(loadedTasks[0].text).toBe('Stored task');
    expect(loadedTasks[0].completed).toBe(true);
    
    // Verify the date was properly converted back to a Date object
    expect(loadedTasks[0].createdAt).toBeInstanceOf(Date);
    
    // Compare date properties instead of the entire Date object
    if (loadedTasks[0].createdAt instanceof Date) {
      expect(loadedTasks[0].createdAt.getFullYear()).toBe(testDate.getFullYear());
      expect(loadedTasks[0].createdAt.getMonth()).toBe(testDate.getMonth());
      expect(loadedTasks[0].createdAt.getDate()).toBe(testDate.getDate());
      expect(loadedTasks[0].createdAt.getHours()).toBe(testDate.getHours());
    }
    
    // Verify getItem was called at least once (it may be called twice due to the constructor and test setup)
    expect(localStorageMock.getItem).toHaveBeenCalled();
  });
  
  test('should handle localStorage errors gracefully', () => {
    // Mock localStorage.getItem to throw an error
    localStorageMock.getItem.mockImplementationOnce(() => {
      throw new Error('Storage error');
    });
    
    // Should not throw when creating service
    expect(() => new TaskService()).not.toThrow();
    
    // Mock localStorage.setItem to throw an error
    localStorageMock.setItem.mockImplementationOnce(() => {
      throw new Error('Storage error');
    });
    
    // Should not throw when saving
    expect(() => taskService.add(mockTask)).not.toThrow();
  });
});
