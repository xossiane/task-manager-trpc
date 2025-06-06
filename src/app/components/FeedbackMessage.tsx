'use client';

import { useSearchParams } from 'next/navigation';

export function FeedbackMessage() {
  const searchParams = useSearchParams();
  const msg = searchParams.get('msg');

  if (msg === 'created') {
    return (
      <div className="mb-4 p-2 rounded bg-green-200 text-green-800">
        Sua tarefa foi criada com sucesso!
      </div>
    );
  }
  if (msg === 'edited') {
    return (
      <div className="mb-4 p-2 rounded bg-green-200 text-green-800">
        Sua tarefa foi editada com sucesso!
      </div>
    );
  }
  if (msg === 'deleted') {
    return (
      <div className="mb-4 p-2 rounded bg-green-200 text-green-800">
        Tarefa deletada com sucesso!
      </div>
    );
  }
  if (msg === 'error') {
    return (
      <div className="mb-4 p-2 rounded bg-red-200 text-red-800">
        Ocorreu um erro ao processar sua solicitação.
      </div>
    );
  }
  return null;
}
