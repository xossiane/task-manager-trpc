'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { trpc } from '@/trpc/client';

// Zod schema
const taskFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
});

type TaskFormData = z.infer<typeof taskFormSchema>;

export default function TaskPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const isNew = params.id === 'new';

  // TRPC utils para invalidação
  const utils = trpc.useUtils();

  // Buscar tarefa se for edição
  const { data: tasks, isLoading } = trpc.task.list.useQuery(undefined, {
    enabled: !isNew,
  });

  const task = tasks?.find((t) => t.id === params.id);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description || '',
      });
    }
  }, [task, reset]);

  const createTask = trpc.task.create.useMutation({
    onSuccess: async () => {
      await utils.task.list.invalidate();
      router.push('/');
    },
  });

  const updateTask = trpc.task.update.useMutation({
    onSuccess: async () => {
      await utils.task.list.invalidate();
      router.push('/');
    },
  });

  const onSubmit = (data: TaskFormData) => {
    if (isNew) {
      createTask.mutate(data);
    } else {
      updateTask.mutate({
        ...data,
        id: params.id,
        createdAt: task?.createdAt || new Date(),
      });
    }
  };

  if (!isNew && isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">
        {isNew ? 'Create New Task' : 'Edit Task'}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            {...register('title')}
            className="border border-gray-300 rounded-md p-2 w-full"
            disabled={isSubmitting}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            {...register('description')}
            rows={4}
            className="border border-gray-300 rounded-md p-2 w-full"
            disabled={isSubmitting}
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}
