import { connectDB } from "@/lib/mongodb";

export default async function Home() {
  await connectDB();

  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold">
        Database Connected
      </h1>
    </main>
  );
}