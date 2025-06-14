import { TaskForm } from '@/app/components/TaskForm';
import { TaskSchema } from '@/schemas/task';
import { api } from '@/trpc/server';
import { z } from 'zod';
import { redirect } from 'next/navigation';

const TaskFormData = TaskSchema.omit({ id: true, createdAt: true });
type TaskFormData = z.infer<typeof TaskFormData>;

export default function NewTaskPage() {

  async function createTask(data: TaskFormData) {
    'use server';
    await api.task.create(data);
    redirect('/'); 
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">New Task</h1>
      <TaskForm
        defaultValues={{ title: '', description: '' }}
        onSubmit={createTask}
        isSubmitting={false}
      />
    </div>
  );
}
