import React from 'react';
import { TaskForm } from '../ui/TaskForm';
import { TaskList } from '../ui/TaskList';
import '../App.css';

export const App: React.FC = () => {
  
  return (
    <div className="app-container">
      <h1>Task Manager</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
};
