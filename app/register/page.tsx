export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-96 p-6 shadow-lg rounded-lg border">
        <h1 className="text-2xl font-bold mb-4">Register</h1>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-2 rounded mb-3"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded mb-4"
        />

        <button className="w-full bg-green-600 text-white p-2 rounded">
          Register
        </button>
      </div>
    </main>
  );
}