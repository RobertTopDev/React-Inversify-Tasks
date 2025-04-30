import React, { useState, useMemo } from 'react';
import { useTaskService } from '../hooks/useTaskService';
import { TaskItem } from './TaskItem';

type FilterType = 'all' | 'active' | 'completed';

export const TaskList: React.FC = () => {
  const { tasks, toggleTaskCompleted, deleteTask, clearAllTasks } = useTaskService();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');

  const handleToggleCompleted = (id: string) => {
    toggleTaskCompleted(id);
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
  };

  const handleClearAllTasks = () => {
    if (window.confirm('Are you sure you want to clear all tasks?')) {
      clearAllTasks();
    }
  };

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const activeCount = useMemo(() => tasks.filter(task => !task.completed).length, [tasks]);
  const completedCount = useMemo(() => tasks.filter(task => task.completed).length, [tasks]);

  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h2>Tasks</h2>
        {tasks.length > 0 && (
          <button 
            onClick={handleClearAllTasks}
            className="clear-all-button"
            aria-label="Clear all tasks"
          >
            Clear All
          </button>
        )}
      </div>
      
      {tasks.length > 0 && (
        <div className="task-filters">
          <button 
            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({tasks.length})
          </button>
          <button 
            className={`filter-button ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active ({activeCount})
          </button>
          <button 
            className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed ({completedCount})
          </button>
        </div>
      )}
      
      {tasks.length === 0 ? (
        <p>No tasks yet. Add one above!</p>
      ) : filteredTasks.length === 0 ? (
        <p>No {filter} tasks found.</p>
      ) : (
        <ul>
          {filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleCompleted={handleToggleCompleted}
              onDelete={handleDeleteTask}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
