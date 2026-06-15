# JobPilot Development Guide

## Local Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn
- A Firebase Project (for Authentication and Firestore)

### Installation
1. Clone the repository: `git clone https://github.com/Ujjwallp/JobPilot_Web.git`
2. Install dependencies: `npm install`
3. Duplicate `.env.example` to `.env.local` and fill in your Firebase credentials.
4. Start the development server: `npm run dev`

## Code Conventions
- **Components:** Written as functional components using React Hooks. File names must use `PascalCase` (e.g., `JobCard.jsx`).
- **Hooks & Utils:** Standard JavaScript functions, file names must use `camelCase` (e.g., `useJobs.js`).
- **Styling:** Tailwind CSS is used exclusively for styling. Avoid writing custom CSS in `index.css` unless necessary for global resets or specific animations.
- **Imports:** Use absolute path aliases (`@/components`, `@/utils`) for clean import structures.

## Contributing
1. Create a feature branch (`git checkout -b feature/your-feature-name`).
2. Commit your changes.
3. Push to the branch and open a Pull Request.
