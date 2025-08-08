# Task Manager

A modern task management application built with Next.js, TypeScript, MongoDB, and Shadcn/UI.

## Features

- **Dashboard**: Overview of tasks and todos with statistics
- **Task Management**: Full CRUD operations for tasks
- **TODO Management**: Create and manage todos within tasks
- **Real-time Progress**: Track completion percentage for each task
- **Modern UI**: Built with Shadcn/UI components
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Database**: MongoDB Atlas
- **UI Components**: Shadcn/UI (Radix UI + Tailwind CSS)
- **Icons**: Lucide React
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (connection string provided)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd task-manager
```

2. Install dependencies
```bash
npm install
```

3. Environment setup
The MongoDB connection string is already configured in `.env.local`:
```
MONGODB_URI=mongodb+srv://hieuntctk42:k6OpRQHcFjiYmGmX@cluster0.ex8r26h.mongodb.net/task-manager
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── dashboard/     # Dashboard statistics
│   │   ├── tasks/         # Task CRUD operations
│   │   └── todos/         # Todo CRUD operations
│   ├── tasks/             # Task pages
│   │   └── [id]/          # Dynamic task detail pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page (Dashboard)
├── components/            # React components
│   ├── ui/                # Shadcn/UI components
│   ├── Dashboard.tsx      # Dashboard component
│   ├── TaskManager.tsx    # Task management component
│   ├── TaskDetail.tsx     # Task detail with todos
│   └── Navigation.tsx     # Navigation component
├── lib/                   # Utilities
│   ├── mongodb.ts         # Database connection
│   └── utils.ts           # Helper utilities
└── models/                # MongoDB models
    ├── Task.ts            # Task model
    └── Todo.ts            # Todo model
```

## API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/[id]` - Get a specific task
- `PUT /api/tasks/[id]` - Update a task
- `DELETE /api/tasks/[id]` - Delete a task

### Todos
- `GET /api/todos?taskId=[id]` - Get todos for a specific task
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/[id]` - Update a todo
- `DELETE /api/todos/[id]` - Delete a todo

### Dashboard
- `GET /api/dashboard` - Get dashboard statistics

## Features Overview

### Dashboard
- Total tasks, pending tasks, completed tasks statistics
- TODO completion statistics
- Priority distribution
- Recent tasks list

### Task Management
- Create, read, update, delete tasks
- Task priorities (Low, Medium, High)
- Task status (Pending, In Progress, Completed)
- Due date support
- Task descriptions

### TODO Management
- Create, read, update, delete todos within tasks
- Mark todos as completed/incomplete
- Progress tracking for tasks
- Todo descriptions

## Deployment

The application is ready for deployment on Vercel:

1. Push your code to a GitHub repository
2. Connect your GitHub repository to Vercel
3. Vercel will automatically detect this as a Next.js project
4. The environment variable is already configured
5. Deploy!

## Environment Variables

```env
MONGODB_URI=mongodb+srv://hieuntctk42:k6OpRQHcFjiYmGmX@cluster0.ex8r26h.mongodb.net/task-manager
```
