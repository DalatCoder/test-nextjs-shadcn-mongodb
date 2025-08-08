import mongoose from 'mongoose';

export interface ITask extends mongoose.Document {
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for the task'],
    maxlength: [200, 'Title cannot be more than 200 characters'],
  },
  description: {
    type: String,
    maxlength: [1000, 'Description cannot be more than 1000 characters'],
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  dueDate: {
    type: Date,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);
