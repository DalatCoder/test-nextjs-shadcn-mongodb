import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Task from '@/models/Task';
import Todo from '@/models/Todo';

export async function GET() {
  try {
    await dbConnect();
    
    // Get task statistics
    const totalTasks = await Task.countDocuments({});
    const pendingTasks = await Task.countDocuments({ status: 'pending' });
    const inProgressTasks = await Task.countDocuments({ status: 'in-progress' });
    const completedTasks = await Task.countDocuments({ status: 'completed' });
    
    // Get todo statistics
    const totalTodos = await Todo.countDocuments({});
    const completedTodos = await Todo.countDocuments({ completed: true });
    const pendingTodos = totalTodos - completedTodos;
    
    // Get recent tasks
    const recentTasks = await Task.find({}).sort({ createdAt: -1 }).limit(5);
    
    // Get tasks by priority
    const highPriorityTasks = await Task.countDocuments({ priority: 'high', status: { $ne: 'completed' } });
    const mediumPriorityTasks = await Task.countDocuments({ priority: 'medium', status: { $ne: 'completed' } });
    const lowPriorityTasks = await Task.countDocuments({ priority: 'low', status: { $ne: 'completed' } });
    
    const stats = {
      tasks: {
        total: totalTasks,
        pending: pendingTasks,
        inProgress: inProgressTasks,
        completed: completedTasks,
        byPriority: {
          high: highPriorityTasks,
          medium: mediumPriorityTasks,
          low: lowPriorityTasks,
        }
      },
      todos: {
        total: totalTodos,
        completed: completedTodos,
        pending: pendingTodos,
      },
      recentTasks,
    };
    
    return NextResponse.json({ success: true, data: stats });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}
