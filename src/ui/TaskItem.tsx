import React, { memo } from 'react';
import { Task } from '../domain/models/Task';

interface TaskItemProps {
  task: Task;
  onToggleCompleted: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = memo(({ task, onToggleCompleted, onDelete }) => {
  const handleToggleCompleted = () => {
    onToggleCompleted(task.id);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  // Format the creation date
  const formattedDate = task.createdAt.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <li className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggleCompleted}
        aria-label={`Mark "${task.text}" as ${task.completed ? 'incomplete' : 'complete'}`}
      />
      <div className="task-content">
        <span 
          style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
          className="task-text"
        >
          {task.text}
        </span>
        <small className="task-date">Created: {formattedDate}</small>
        {task.priority && (
          <span className={`task-priority task-priority-${task.priority}`}>
            {task.priority}
          </span>
        )}
      </div>
      <button 
        onClick={handleDelete}
        aria-label={`Delete task "${task.text}"`}
        className="delete-button"
      >
        Delete
      </button>
    </li>
  );
});

TaskItem.displayName = 'TaskItem';
