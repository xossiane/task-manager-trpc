import { api } from '@/trpc/server';
import { notFound, redirect } from 'next/navigation';

type Params = {
  params: { id: string };
};

export default async function EditTaskPage({ params }: Params) {
  const id = params.id;

  const task = await api.task.get(id).catch(() => notFound());

  async function updateTask(formData: FormData) {
    'use server';
    const title = formData.get('title') as string;
    const description = formData.get('description') as string | undefined;

    await api.task.update({ id, title, description });
    redirect('/');
  }



  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Edit Task</h1>

      <form action={updateTask} className="space-y-4">
        <input
          name="title"
          defaultValue={task.title}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <textarea
          name="description"
          defaultValue={task.description ?? ''}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <div className="flex gap-4">
          <button
            type="submit"
            className="btn btn-primary px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </form>

     
    </div>
  );
}
