import React, { useState } from 'react';
import { useTaskService } from '../hooks/useTaskService';
import { Task } from '../domain/models/Task';

type Priority = 'low' | 'medium' | 'high' | undefined;

export const TaskForm: React.FC = () => {
  const { addTask } = useTaskService();
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTask({ 
        id: crypto.randomUUID(), 
        text,
        completed: false,
        createdAt: new Date(),
        priority
      });
      setText('');
      setPriority(undefined);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form" aria-labelledby="form-heading">
      <h3 id="form-heading" className="form-heading">Create New Task</h3>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="task-input">Task description</label>
          <input
            id="task-input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter task"
            className="task-input"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="task-priority">Priority</label>
          <select
            id="task-priority"
            value={priority || ''}
            onChange={(e) => setPriority(e.target.value as Priority || undefined)}
            className="task-priority-select"
          >
            <option value="">None</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
      
      <button type="submit" aria-label="Create task" className="task-button">
        Create Task
      </button>
    </form>
  );
};
