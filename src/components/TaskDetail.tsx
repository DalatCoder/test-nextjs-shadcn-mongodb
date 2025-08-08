'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Edit, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Task {
  _id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface Todo {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  taskId: string;
  createdAt: string;
  updatedAt: string;
}

interface TaskDetailProps {
  taskId: string;
}

export default function TaskDetail({ taskId }: TaskDetailProps) {
  const [task, setTask] = useState<Task | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateTodoDialogOpen, setIsCreateTodoDialogOpen] = useState(false);
  const [isEditTodoDialogOpen, setIsEditTodoDialogOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todoFormData, setTodoFormData] = useState({
    title: '',
    description: '',
  });

  const fetchTaskAndTodos = useCallback(async () => {
    try {
      // Fetch task details
      const taskResponse = await fetch(`/api/tasks/${taskId}`);
      const taskResult = await taskResponse.json();
      
      // Fetch todos for this task
      const todosResponse = await fetch(`/api/todos?taskId=${taskId}`);
      const todosResult = await todosResponse.json();
      
      if (taskResult.success) {
        setTask(taskResult.data);
      }
      
      if (todosResult.success) {
        setTodos(todosResult.data);
      }
    } catch (error) {
      console.error('Error fetching task and todos:', error);
    } finally {
      setLoading(false);
    }
  }, [taskId]);

  useEffect(() => {
    if (taskId) {
      fetchTaskAndTodos();
    }
  }, [taskId, fetchTaskAndTodos]);

  const handleCreateTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...todoFormData,
          taskId,
        }),
      });
      
      if (response.ok) {
        setIsCreateTodoDialogOpen(false);
        setTodoFormData({ title: '', description: '' });
        fetchTaskAndTodos();
      }
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const handleUpdateTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTodo) return;
    
    try {
      const response = await fetch(`/api/todos/${selectedTodo._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoFormData),
      });
      
      if (response.ok) {
        setIsEditTodoDialogOpen(false);
        setSelectedTodo(null);
        setTodoFormData({ title: '', description: '' });
        fetchTaskAndTodos();
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (todoId: string) => {
    if (!confirm('Are you sure you want to delete this TODO?')) return;
    
    try {
      const response = await fetch(`/api/todos/${todoId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        fetchTaskAndTodos();
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleToggleTodoComplete = async (todoId: string, completed: boolean) => {
    try {
      const response = await fetch(`/api/todos/${todoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed }),
      });
      
      if (response.ok) {
        fetchTaskAndTodos();
      }
    } catch (error) {
      console.error('Error updating todo status:', error);
    }
  };

  const openEditTodoDialog = (todo: Todo) => {
    setSelectedTodo(todo);
    setTodoFormData({
      title: todo.title,
      description: todo.description || '',
    });
    setIsEditTodoDialogOpen(true);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (!task) {
    return <div className="flex justify-center items-center h-64">Task not found</div>;
  }

  const completedTodos = todos.filter(todo => todo.completed).length;
  const totalTodos = todos.length;
  const completionPercentage = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/tasks">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tasks
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">{task.title}</h1>
      </div>

      {/* Task Details */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Task Details</CardTitle>
              <CardDescription className="mt-2">
                Created: {new Date(task.createdAt).toLocaleDateString()}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge className={getPriorityColor(task.priority)}>
                {task.priority}
              </Badge>
              <Badge className={getStatusColor(task.status)}>
                {task.status}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {task.description && (
            <p className="text-muted-foreground mb-4">{task.description}</p>
          )}
          {task.dueDate && (
            <p className="text-sm text-muted-foreground">
              Due Date: {new Date(task.dueDate).toLocaleDateString()}
            </p>
          )}
        </CardContent>
      </Card>

      {/* TODO Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Progress</CardTitle>
          <CardDescription>
            {completedTodos} of {totalTodos} TODOs completed ({completionPercentage}%)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>

      {/* TODOs Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">TODOs ({totalTodos})</h2>
        <Dialog open={isCreateTodoDialogOpen} onOpenChange={setIsCreateTodoDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add TODO
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New TODO</DialogTitle>
              <DialogDescription>Add a new TODO item to this task</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateTodo} className="space-y-4">
              <div>
                <Label htmlFor="todo-title">Title</Label>
                <Input
                  id="todo-title"
                  value={todoFormData.title}
                  onChange={(e) => setTodoFormData({ ...todoFormData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="todo-description">Description</Label>
                <Textarea
                  id="todo-description"
                  value={todoFormData.description}
                  onChange={(e) => setTodoFormData({ ...todoFormData, description: e.target.value })}
                />
              </div>
              <Button type="submit" className="w-full">Create TODO</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* TODOs List */}
      <div className="space-y-3">
        {todos.map((todo) => (
          <Card key={todo._id} className={`transition-all ${todo.completed ? 'opacity-75' : ''}`}>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={(checked) => 
                      handleToggleTodoComplete(todo._id, checked as boolean)
                    }
                  />
                  <div className="flex-1">
                    <h4 className={`font-medium ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {todo.title}
                    </h4>
                    {todo.description && (
                      <p className={`text-sm mt-1 ${todo.completed ? 'line-through text-muted-foreground' : 'text-muted-foreground'}`}>
                        {todo.description}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(todo.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditTodoDialog(todo)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteTodo(todo._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {todos.length === 0 && (
          <Card>
            <CardContent className="pt-8 pb-8">
              <div className="text-center text-muted-foreground">
                <p>No TODOs yet. Create your first TODO to get started!</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Edit TODO Dialog */}
      <Dialog open={isEditTodoDialogOpen} onOpenChange={setIsEditTodoDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit TODO</DialogTitle>
            <DialogDescription>Update TODO information</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateTodo} className="space-y-4">
            <div>
              <Label htmlFor="edit-todo-title">Title</Label>
              <Input
                id="edit-todo-title"
                value={todoFormData.title}
                onChange={(e) => setTodoFormData({ ...todoFormData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-todo-description">Description</Label>
              <Textarea
                id="edit-todo-description"
                value={todoFormData.description}
                onChange={(e) => setTodoFormData({ ...todoFormData, description: e.target.value })}
              />
            </div>
            <Button type="submit" className="w-full">Update TODO</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
