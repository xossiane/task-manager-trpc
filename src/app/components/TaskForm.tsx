
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TaskSchema } from '@/schemas/task';


export function TaskForm({ 
  defaultValues,
  onSubmit,
  isSubmitting 
}: {
  defaultValues: { title: string; description?: string };
  onSubmit: (data: { title: string; description?: string }) => void;
  isSubmitting: boolean;
}) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(TaskSchema.omit({ id: true, createdAt: true })),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-1">Title*</label>
        <input 
          {...register('title')} 
          className="w-full p-2 border rounded"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>
      <div>
        <label className="block mb-1">Description</label>
        <textarea 
          {...register('description')} 
          className="w-full p-2 border rounded"
          rows={4}
        />
      </div>
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-300"
      >
        {isSubmitting ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
}