// src/app/page.tsx
import Link from 'next/link';
import { api } from '@/trpc/server';

export default async function Home() {
  const tasks = await api.task.list();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>
      
      <Link 
        href="/new"
        className="inline-block mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Create New Task
      </Link>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="border rounded-lg p-4 shadow-sm">
            <h2 className="font-bold text-lg">{task.title}</h2>
            {task.description && (
              <p className="text-gray-600 mt-1">{task.description}</p>
            )}
            <div className="mt-3">
              <Link 
                href={`/tasks/${task.id}`}
                className="text-blue-500 hover:text-blue-700 text-sm"
              >
                Edit Task
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}