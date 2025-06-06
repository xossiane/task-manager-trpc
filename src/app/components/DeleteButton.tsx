'use client';

export function DeleteButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="btn btn-sm btn-error"
      onClick={(e) => {
        if (!confirm('Are you sure you want to delete this task?')) {
          e.preventDefault();
        }
      }}
    >
      {children}
    </button>
  );
}
