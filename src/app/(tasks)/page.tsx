// src/app/(tasks)/page.tsx
import Link from 'next/link';
import { api } from '@/trpc/server';

export default async function TaskList() {
  const tasks = await api.task.list();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>
      <Link href="/tasks/new" className="btn btn-primary mb-4">
        Create New Task
      </Link>
      <div className="space-y-2">
        {tasks.map((task) => (
          <div key={task.id} className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title">{task.title}</h2>
              <p>{task.description}</p>
              <Link href={`/tasks/${task.id}`} className="btn btn-sm mt-2">
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}