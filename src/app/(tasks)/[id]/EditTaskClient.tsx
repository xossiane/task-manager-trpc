
'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { TaskForm } from '@/app/components/TaskForm';
import { api } from '@/trpc/server';

export function EditTaskClient({
  task,
}: {
  task: { id: string; title: string; description?: string };
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (data: { title: string; description?: string }) => {
    startTransition(async () => {
      await api.task.update({ ...data, id: task.id });
      router.push('/tasks');
    });
  };

  return (
    <TaskForm
      defaultValues={{ title: task.title, description: task.description }}
      onSubmit={handleSubmit}
      isSubmitting={isPending}
    />
  );
}
