export default function DashboardPage() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">
        Task Dashboard
      </h1>

      <button className="bg-blue-600 text-white px-4 py-2 rounded mb-6">
        Add Task
      </button>

      <div className="border p-4 rounded shadow">
        <h2 className="text-xl font-semibold">
          Learn Next.js
        </h2>
        <p>Status: Pending</p>
        <p>Priority: High</p>
      </div>
    </main>
  );
}