import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Todo from '@/models/Todo';

// GET single todo
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const todo = await Todo.findById(id);
    if (!todo) {
      return NextResponse.json({ success: false, error: 'Todo not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: todo });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}

// PUT update todo
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const todo = await Todo.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!todo) {
      return NextResponse.json({ success: false, error: 'Todo not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: todo });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}

// DELETE todo
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const deletedTodo = await Todo.deleteOne({ _id: id });
    if (!deletedTodo.deletedCount) {
      return NextResponse.json({ success: false, error: 'Todo not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}
