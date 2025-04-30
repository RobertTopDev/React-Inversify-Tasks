import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskItem } from './TaskItem';
import { Task } from '../domain/models/Task';

// Mock the date to ensure consistent testing
const mockDate = new Date('2025-01-01T12:00:00Z');

describe('TaskItem Component', () => {
  const mockTask: Task = {
    id: 'task-123',
    text: 'Test Task',
    completed: false,
    createdAt: mockDate,
    priority: 'medium'
  };
  
  const mockOnToggleCompleted = jest.fn();
  const mockOnDelete = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('renders task correctly', () => {
    render(
      <TaskItem 
        task={mockTask} 
        onToggleCompleted={mockOnToggleCompleted} 
        onDelete={mockOnDelete} 
      />
    );
    
    // Check if task text is displayed
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    
    // Check if date is displayed
    expect(screen.getByText(/Jan 1, 2025/)).toBeInTheDocument();
    
    // Check if priority is displayed
    expect(screen.getByText('medium')).toBeInTheDocument();
    
    // Check if checkbox is unchecked
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });
  
  test('calls onToggleCompleted when checkbox is clicked', () => {
    render(
      <TaskItem 
        task={mockTask} 
        onToggleCompleted={mockOnToggleCompleted} 
        onDelete={mockOnDelete} 
      />
    );
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(mockOnToggleCompleted).toHaveBeenCalledWith(mockTask.id);
    expect(mockOnToggleCompleted).toHaveBeenCalledTimes(1);
  });
  
  test('calls onDelete when delete button is clicked', () => {
    render(
      <TaskItem 
        task={mockTask} 
        onToggleCompleted={mockOnToggleCompleted} 
        onDelete={mockOnDelete} 
      />
    );
    
    const deleteButton = screen.getByRole('button', { name: /delete task/i });
    fireEvent.click(deleteButton);
    
    expect(mockOnDelete).toHaveBeenCalledWith(mockTask.id);
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });
  
  test('applies line-through style when task is completed', () => {
    const completedTask: Task = {
      ...mockTask,
      completed: true
    };
    
    render(
      <TaskItem 
        task={completedTask} 
        onToggleCompleted={mockOnToggleCompleted} 
        onDelete={mockOnDelete} 
      />
    );
    
    const taskText = screen.getByText('Test Task');
    expect(taskText).toHaveStyle('text-decoration: line-through');
  });
});
