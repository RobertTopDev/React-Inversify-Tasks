# React + InversifyJS Task Management App

A modern React application with InversifyJS for dependency injection that demonstrates clean architecture principles and best practices.

## Features

- Create tasks with priority levels (low, medium, high)
- Mark tasks as completed with visual feedback
- Delete individual tasks
- Filter tasks by status (All, Active, Completed)s
- Clear all tasks at once
- LocalStorage persistence for tasks between sessions
- Responsive and accessible UI
- Task creation date display
- Centralized configuration management


## Architecture

This project follows a clean architecture approach with clear separation of concerns:

- **Domain Layer**: Contains business logic, models, and service interfaces
- **Infrastructure Layer**: Implements the service interfaces
- **UI Layer**: Presentation components that consume services
- **DI Layer**: Manages dependencies using InversifyJS

## Key Technical Concepts

### Dependency Injection with InversifyJS

The application uses InversifyJS for dependency injection, which allows for:

- Loose coupling between components
- Easy testing through dependency mocking
- Simplified service management

## Testing

The project includes a comprehensive testing setup:

- **Jest**: Test runner and assertion library
- **React Testing Library**: For testing React components
- **ts-jest**: TypeScript support for Jest

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Running the Application

```bash
# Start the development server
npm run dev
```

Visit `http://localhost:5173` in your browser to see the application.

## Development

### Project Setup

The project uses:

- Vite for fast development and building
- TypeScript for type safety
- React for the UI
- InversifyJS for dependency injection
- Jest and React Testing Library for testing

### Key Files

- `src/di/container.ts`: InversifyJS container configuration
- `src/domain/ports/ITaskService.ts`: Service interface
- `src/infra/memory/TaskService.ts`: Service implementation with localStorage
- `src/infra/config/ConfigService.ts`: Configuration service
- `src/ui/TaskForm.tsx` & `src/ui/TaskList.tsx`: UI components
- `src/hooks/useTaskService.ts`: Custom hook for accessing the task service

## Future Enhancements

Potential improvements for this project:

1. User authentication and multiple user support
2. Multiple task lists/categories
3. Task due dates and reminders
4. Task search functionality
5. Mobile app version with React Native
6. Backend API integration for cloud storage
7. Task sharing and collaboration features
8. Rich text formatting for task descriptions
9. Task attachments
10. Task analytics and reporting
