'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface DashboardStats {
  tasks: {
    total: number;
    pending: number;
    inProgress: number;
    completed: number;
    byPriority: {
      high: number;
      medium: number;
      low: number;
    };
  };
  todos: {
    total: number;
    completed: number;
    pending: number;
  };
  recentTasks: Array<{
    _id: string;
    title: string;
    status: string;
    priority: string;
    createdAt: string;
  }>;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard');
      const result = await response.json();
      if (result.success) {
        setStats(result.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (!stats) {
    return <div className="flex justify-center items-center h-64">Error loading dashboard data</div>;
  }

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

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.tasks.total}</div>
            <p className="text-xs text-muted-foreground">
              {stats.tasks.completed} completed
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.tasks.pending}</div>
            <p className="text-xs text-muted-foreground">
              Need attention
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total TODOs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todos.total}</div>
            <p className="text-xs text-muted-foreground">
              {stats.todos.completed} completed
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.tasks.byPriority.high}</div>
            <p className="text-xs text-muted-foreground">
              Urgent tasks
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Task Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Task Status Overview</CardTitle>
            <CardDescription>Current status of all tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span>Pending</span>
              <Badge variant="secondary">{stats.tasks.pending}</Badge>
            </div>
            <div className="flex justify-between">
              <span>In Progress</span>
              <Badge className="bg-blue-100 text-blue-800">{stats.tasks.inProgress}</Badge>
            </div>
            <div className="flex justify-between">
              <span>Completed</span>
              <Badge className="bg-green-100 text-green-800">{stats.tasks.completed}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Priority Distribution</CardTitle>
            <CardDescription>Active tasks by priority</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span>High Priority</span>
              <Badge className="bg-red-100 text-red-800">{stats.tasks.byPriority.high}</Badge>
            </div>
            <div className="flex justify-between">
              <span>Medium Priority</span>
              <Badge className="bg-yellow-100 text-yellow-800">{stats.tasks.byPriority.medium}</Badge>
            </div>
            <div className="flex justify-between">
              <span>Low Priority</span>
              <Badge className="bg-green-100 text-green-800">{stats.tasks.byPriority.low}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Tasks */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Tasks</CardTitle>
          <CardDescription>Your most recently created tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stats.recentTasks.map((task) => (
              <div key={task._id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{task.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </p>
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
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
