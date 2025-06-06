
import { api } from '@/trpc/server';
import { notFound } from 'next/navigation';
import { EditTaskClient } from './EditTaskClient';

type Params = { params: { id: string } };

export default async function EditTaskPage({ params }: Params) {
  const task = await api.task.get(params.id).catch(() => null);
  if (!task) return notFound();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
      <EditTaskClient task={task} />
    </div>
  );
}
