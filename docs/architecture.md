# JobPilot Architecture

## High-Level Overview
JobPilot is a Single Page Application (SPA) built using React, Vite, and Tailwind CSS. It leverages Firebase for authentication and database management. The application follows a modular, feature-based architecture to promote scalability and maintainability.

## Directory Structure
- **`src/components/`**: Reusable UI elements, divided into logical categories (`common/`, `cards/`, `layout/`).
- **`src/pages/`**: Top-level page components connected directly to the React Router.
- **`src/contexts/`**: React Context providers for global state management (Auth, Theme, Toast, Jobs).
- **`src/hooks/`**: Custom React hooks extracting business logic from components.
- **`src/services/`**: API and database service layers interacting directly with Firebase Firestore.
- **`src/config/`**: External service configuration (Firebase setup).

## State Management
Global state is managed via React's native Context API.
- **`AuthContext`**: Manages the current user session and authentication state.
- **`JobsContext`**: Manages the global list of jobs, kanban pipeline state, and performs optimistic UI updates when mutating data via the `jobService`.
- **`ThemeContext`**: Controls Dark/Light mode toggles.

## Routing
Routing is handled by `react-router-dom` using the `HashRouter`. Pages are wrapped in `ProtectedRoute` and `PublicRoute` guards to secure authenticated areas of the application.
