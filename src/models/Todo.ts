import mongoose from 'mongoose';

export interface ITodo extends mongoose.Document {
  title: string;
  description?: string;
  completed: boolean;
  taskId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for the todo'],
    maxlength: [200, 'Title cannot be more than 200 characters'],
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Todo || mongoose.model<ITodo>('Todo', TodoSchema);
