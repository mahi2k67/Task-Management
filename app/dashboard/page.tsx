"use client";

import { useState } from "react";

export default function DashboardPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">
        Task Dashboard
      </h1>

      <input
        type="text"
        placeholder="Enter task title"
        className="w-full border p-2 rounded mb-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter description"
        className="w-full border p-2 rounded mb-3"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Task
      </button>
    </main>
  );
}