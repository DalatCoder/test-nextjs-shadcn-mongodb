# 📚 Tài Liệu Kỹ Thuật - Task Manager Application

## 📋 Mục Lục
1. [Tổng Quan Dự Án](#tổng-quan-dự-án)
2. [Kiến Trúc Hệ Thống](#kiến-trúc-hệ-thống)
3. [Công Nghệ Sử Dụng](#công-nghệ-sử-dụng)
4. [Cấu Trúc Dự Án Chi Tiết](#cấu-trúc-dự-án-chi-tiết)
5. [Database Schema](#database-schema)
6. [API Documentation](#api-documentation)
7. [Component Architecture](#component-architecture)
8. [Authentication & Security](#authentication--security)
9. [Deployment](#deployment)

---

## 🎯 Tổng Quan Dự Án

### Mô tả
Task Manager là một ứng dụng web full-stack cho phép người dùng quản lý công việc (tasks) và các mục việc cần làm (todos) trong từng task. Ứng dụng được xây dựng với Next.js 15, MongoDB và Shadcn/UI.

### Tính năng chính
- **Dashboard Analytics**: Thống kê tổng quan về tasks và todos
- **Task Management**: CRUD operations cho tasks với priority và status
- **TODO Management**: Quản lý todos trong từng task với progress tracking
- **Real-time Updates**: Cập nhật UI ngay khi data thay đổi
- **Responsive Design**: Hoạt động tốt trên mọi thiết bị

### Tech Stack Overview
```
Frontend: Next.js 15 + React 19 + TypeScript
Backend: Next.js API Routes
Database: MongoDB Atlas với Mongoose ODM
UI Library: Shadcn/UI (Radix UI + Tailwind CSS)
Deployment: Vercel
```

---

## 🏗️ Kiến Trúc Hệ Thống

### 1. Client-Server Architecture
```
┌─────────────────────────────────────────────────────────┐
│                      CLIENT (Browser)                    │
│  ┌─────────────────────────────────────────────────┐   │
│  │            Next.js App (React Components)        │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐     │   │
│  │  │Dashboard │  │   Tasks   │  │   Todos  │     │   │
│  │  └──────────┘  └──────────┘  └──────────┘     │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                           │
                    HTTP/REST API
                           │
┌─────────────────────────────────────────────────────────┐
│                  SERVER (Next.js Backend)                │
│  ┌─────────────────────────────────────────────────┐   │
│  │              API Routes (/api/*)                 │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐     │   │
│  │  │Dashboard │  │Tasks CRUD │  │Todos CRUD│     │   │
│  │  └──────────┘  └──────────┘  └──────────┘     │   │
│  └─────────────────────────────────────────────────┘   │
│                           │                              │
│  ┌─────────────────────────────────────────────────┐   │
│  │            Mongoose ODM Layer                    │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                           │
                    MongoDB Protocol
                           │
┌─────────────────────────────────────────────────────────┐
│              DATABASE (MongoDB Atlas)                    │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Collections: tasks, todos                       │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### 2. Request Flow
```
User Action → React Component → API Call → Next.js API Route 
→ Mongoose → MongoDB → Response → State Update → UI Re-render
```

---

## 💻 Công Nghệ Sử Dụng

### Frontend Technologies

#### 1. Next.js 15 (App Router)
- **Version**: 15.4.6
- **Purpose**: Full-stack React framework
- **Key Features**:
  - App Router với nested layouts
  - Server Components by default
  - API Routes cho backend
  - Built-in optimization
  - TypeScript support

#### 2. React 19
- **Version**: 19.1.0
- **Key Concepts**:
  - Functional Components
  - Hooks (useState, useEffect, useCallback)
  - Context API (không dùng trong project này)
  - Component composition

#### 3. TypeScript
- **Version**: ^5
- **Purpose**: Type safety và better DX
- **Usage**:
  - Interface definitions cho data models
  - Type checking cho props
  - API response typing

#### 4. Tailwind CSS
- **Version**: ^4
- **Purpose**: Utility-first CSS framework
- **Features**:
  - Responsive design utilities
  - Custom color schemes
  - Component styling

#### 5. Shadcn/UI
- **Components Used**:
  - Button, Card, Badge
  - Dialog, Input, Label, Textarea
  - Select, Checkbox
- **Based on**: Radix UI primitives
- **Styling**: Tailwind CSS classes

### Backend Technologies

#### 1. Next.js API Routes
- **Location**: `/src/app/api/*`
- **Features**:
  - RESTful endpoints
  - Serverless functions
  - Built-in request/response handling

#### 2. MongoDB Atlas
- **Type**: Cloud NoSQL Database
- **Connection**: MongoDB connection string
- **Features**:
  - Document-based storage
  - Flexible schema
  - Cloud hosting

#### 3. Mongoose ODM
- **Version**: ^8.17.1
- **Purpose**: MongoDB object modeling
- **Features**:
  - Schema definition
  - Validation
  - Middleware hooks
  - Query building

### Development Tools

#### 1. Node.js & npm
- **Node**: 18+
- **npm**: Package management

#### 2. ESLint
- **Config**: eslint-config-next
- **Purpose**: Code quality

#### 3. Git
- **Purpose**: Version control

---

## 📁 Cấu Trúc Dự Án Chi Tiết

```
task-manager/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/                      # Backend API Routes
│   │   │   ├── dashboard/
│   │   │   │   └── route.ts         # GET /api/dashboard
│   │   │   ├── tasks/
│   │   │   │   ├── route.ts         # GET, POST /api/tasks
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts     # GET, PUT, DELETE /api/tasks/:id
│   │   │   └── todos/
│   │   │       ├── route.ts         # GET, POST /api/todos
│   │   │       └── [id]/
│   │   │           └── route.ts     # GET, PUT, DELETE /api/todos/:id
│   │   ├── tasks/
│   │   │   ├── page.tsx             # /tasks - Tasks list page
│   │   │   └── [id]/
│   │   │       └── page.tsx         # /tasks/:id - Task detail page
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout với Navigation
│   │   └── page.tsx                  # / - Homepage (Dashboard)
│   │
│   ├── components/
│   │   ├── ui/                      # Shadcn/UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── select.tsx
│   │   │   ├── checkbox.tsx
│   │   │   └── badge.tsx
│   │   ├── Dashboard.tsx            # Dashboard component
│   │   ├── TaskManager.tsx          # Tasks CRUD component
│   │   ├── TaskDetail.tsx           # Task với todos component
│   │   └── Navigation.tsx           # Navigation bar
│   │
│   ├── lib/
│   │   ├── mongodb.ts               # MongoDB connection singleton
│   │   └── utils.ts                 # Helper functions (cn())
│   │
│   └── models/
│       ├── Task.ts                  # Mongoose Task model
│       └── Todo.ts                  # Mongoose Todo model
│
├── public/                          # Static assets
├── .env.local                       # Environment variables
├── .gitignore
├── components.json                  # Shadcn/UI config
├── eslint.config.mjs               # ESLint configuration
├── next.config.ts                  # Next.js configuration
├── package.json                    # Dependencies
├── postcss.config.mjs              # PostCSS config
├── README.md                       # Project documentation
├── tailwind.config.ts              # Tailwind configuration
└── tsconfig.json                   # TypeScript configuration
```

---

## 🗄️ Database Schema

### Task Model
```typescript
{
  _id: ObjectId,              // MongoDB auto-generated
  title: String,              // Required, max 200 chars
  description: String,        // Optional, max 1000 chars
  status: String,            // Enum: 'pending' | 'in-progress' | 'completed'
  priority: String,          // Enum: 'low' | 'medium' | 'high'
  dueDate: Date,            // Optional
  createdAt: Date,          // Auto-generated
  updatedAt: Date           // Auto-generated
}
```

### Todo Model
```typescript
{
  _id: ObjectId,              // MongoDB auto-generated
  title: String,              // Required, max 200 chars
  description: String,        // Optional, max 500 chars
  completed: Boolean,         // Default: false
  taskId: ObjectId,          // Reference to Task (required)
  createdAt: Date,          // Auto-generated
  updatedAt: Date           // Auto-generated
}
```

### Relationships
```
Task (1) ─────────────> (*) Todo
         One-to-Many
```

---

## 🔌 API Documentation

### Base URL
```
Development: http://localhost:3000/api
Production: https://your-domain.vercel.app/api
```

### Endpoints

#### Dashboard API
```http
GET /api/dashboard
Response: {
  success: boolean,
  data: {
    tasks: {
      total: number,
      pending: number,
      inProgress: number,
      completed: number,
      byPriority: {
        high: number,
        medium: number,
        low: number
      }
    },
    todos: {
      total: number,
      completed: number,
      pending: number
    },
    recentTasks: Task[]
  }
}
```

#### Tasks API
```http
# Get all tasks
GET /api/tasks
Response: {
  success: boolean,
  data: Task[]
}

# Create task
POST /api/tasks
Body: {
  title: string,
  description?: string,
  status: 'pending' | 'in-progress' | 'completed',
  priority: 'low' | 'medium' | 'high',
  dueDate?: string
}

# Get single task
GET /api/tasks/:id

# Update task
PUT /api/tasks/:id
Body: Partial<Task>

# Delete task
DELETE /api/tasks/:id
```

#### Todos API
```http
# Get todos by taskId
GET /api/todos?taskId=:taskId
Response: {
  success: boolean,
  data: Todo[]
}

# Create todo
POST /api/todos
Body: {
  title: string,
  description?: string,
  taskId: string
}

# Update todo
PUT /api/todos/:id
Body: Partial<Todo>

# Delete todo
DELETE /api/todos/:id
```

---

## 🧩 Component Architecture

### Component Hierarchy
```
App
├── Layout
│   └── Navigation
├── Pages
│   ├── HomePage (/)
│   │   └── Dashboard
│   ├── TasksPage (/tasks)
│   │   └── TaskManager
│   └── TaskDetailPage (/tasks/:id)
│       └── TaskDetail
└── UI Components (Shadcn)
    ├── Button
    ├── Card
    ├── Dialog
    ├── Input
    ├── Select
    └── ...
```

### State Management
```typescript
// Local State (useState)
- Form data
- Loading states
- Dialog open/close
- Selected items

// Server State (API calls)
- Tasks list
- Todos list
- Dashboard stats

// No global state management (Redux/Zustand not used)
```

### Data Flow
```
1. Component mounts → useEffect
2. Fetch data from API → setState
3. User interaction → Event handler
4. API call (CRUD) → Update server
5. Refetch data → Update local state
6. Re-render UI with new data
```

---

## 🔐 Authentication & Security

### Current Implementation
- **No Authentication**: Project hiện tại không có auth
- **Public Access**: Tất cả endpoints đều public
- **MongoDB Credentials**: Hardcoded trong connection string

### Security Recommendations (Production)
```typescript
// 1. Add authentication (NextAuth.js)
// 2. Protect API routes với middleware
// 3. Use environment variables properly
// 4. Add rate limiting
// 5. Validate input data
// 6. Sanitize database queries
// 7. Implement CORS policies
```

---

## 🚀 Deployment

### Vercel Deployment

#### Prerequisites
- GitHub account
- Vercel account
- Project pushed to GitHub

#### Steps
1. **Import to Vercel**
   ```bash
   # Install Vercel CLI (optional)
   npm i -g vercel
   
   # Deploy
   vercel
   ```

2. **Environment Variables**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
   ```

3. **Build Settings**
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

#### Production Checklist
- [ ] Environment variables configured
- [ ] MongoDB Atlas IP whitelist updated
- [ ] Error handling implemented
- [ ] Loading states added
- [ ] SEO meta tags configured
- [ ] Performance optimized
- [ ] Security headers added

---

## 📊 Performance Optimization

### Current Optimizations
1. **Code Splitting**: Automatic với Next.js
2. **Image Optimization**: Next/Image component
3. **Static Generation**: Dashboard và Tasks pages
4. **API Route Caching**: Response caching
5. **Database Indexing**: MongoDB indexes

### Recommended Optimizations
```typescript
// 1. Implement SWR or React Query for caching
// 2. Add pagination for large datasets
// 3. Implement virtual scrolling
// 4. Optimize bundle size
// 5. Add service worker for offline support
```

---

## 🐛 Error Handling

### Current Implementation
```typescript
try {
  // API logic
} catch (error: unknown) {
  const errorMessage = error instanceof Error 
    ? error.message 
    : 'Unknown error occurred';
  return NextResponse.json(
    { success: false, error: errorMessage }, 
    { status: 400 }
  );
}
```

### Error Types
- **400**: Bad Request (validation errors)
- **404**: Not Found (resource doesn't exist)
- **500**: Server Error (database issues)

---

## 📈 Monitoring & Analytics

### Recommended Tools
- **Vercel Analytics**: Performance monitoring
- **Sentry**: Error tracking
- **MongoDB Atlas Monitoring**: Database performance
- **Google Analytics**: User behavior

---

## 🔄 Development Workflow

### Local Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Lint code
npm run lint
```

### Git Workflow
```bash
# Feature branch
git checkout -b feature/new-feature

# Commit changes
git add .
git commit -m "feat: add new feature"

# Push to GitHub
git push origin feature/new-feature

# Create Pull Request
```

---

## 📚 Resources & References

### Official Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Mongoose Documentation](https://mongoosejs.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn/UI](https://ui.shadcn.com)

### Tutorials & Guides
- [Next.js Learn Course](https://nextjs.org/learn)
- [MongoDB University](https://university.mongodb.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

## 🎯 Future Enhancements

### Phase 1: Authentication & Users
- [ ] Add NextAuth.js
- [ ] User registration/login
- [ ] Protected routes
- [ ] User-specific data

### Phase 2: Advanced Features
- [ ] Task assignment
- [ ] Due date reminders
- [ ] File attachments
- [ ] Comments system
- [ ] Activity logs

### Phase 3: Collaboration
- [ ] Team workspaces
- [ ] Real-time updates (WebSocket)
- [ ] Notifications
- [ ] Email integration

### Phase 4: Mobile & PWA
- [ ] Progressive Web App
- [ ] Offline support
- [ ] Push notifications
- [ ] Mobile app (React Native)

---

## 📝 License & Credits

### License
MIT License

### Built With
- Next.js by Vercel
- MongoDB by MongoDB Inc.
- Shadcn/UI by shadcn
- Icons by Lucide

### Author
Your Name

### Version
1.0.0

---

## 🤝 Contributing

### How to Contribute
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

### Code Standards
- Use TypeScript
- Follow ESLint rules
- Write meaningful commits
- Add proper comments
- Update documentation

---

*Last Updated: August 2025*
