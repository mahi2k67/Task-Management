import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">
        Task Management App
      </h1>

      <Link href="/login" className="text-blue-600">
        Login
      </Link>

      <Link href="/register" className="text-blue-600">
        Register
      </Link>

      <Link href="/dashboard" className="text-blue-600">
        Dashboard
      </Link>
    </main>
  );
}