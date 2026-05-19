"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Task = {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority?: string;
};

export default function DashboardPage() {
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState("");

  const [priority, setPriority] =
    useState("Medium");

  const [filter, setFilter] =
    useState("All");

  async function loadTasks() {
    const res = await fetch(
      "/api/tasks"
    );
    const data = await res.json();
    setTasks(data);
  }

  async function addTask() {
    if (!title.trim()) return;

    await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        priority,
      }),
    });

    setTitle("");
    setDescription("");
    setPriority("Medium");
    loadTasks();
  }

  async function deleteTask(
    id: string
  ) {
    await fetch("/api/tasks", {
      method: "DELETE",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    loadTasks();
  }

  async function completeTask(
    id: string
  ) {
    await fetch("/api/tasks", {
      method: "PUT",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        id,
        status:
          "Completed",
      }),
    });

    loadTasks();
  }

  async function updateTask() {
    if (!editingId) return;

    await fetch("/api/tasks", {
      method: "PUT",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        id: editingId,
        title,
        description,
        priority,
      }),
    });

    setEditingId("");
    setTitle("");
    setDescription("");
    setPriority("Medium");
    loadTasks();
  }

  function handleLogout() {
    localStorage.removeItem(
      "loggedIn"
    );
    router.push("/login");
  }

  useEffect(() => {
    const loggedIn =
      localStorage.getItem(
        "loggedIn"
      );

    if (!loggedIn) {
      router.push(
        "/login"
      );
      return;
    }

    loadTasks();
  }, []);

  const completed =
    tasks.filter(
      (task) =>
        task.status ===
        "Completed"
    ).length;

  const pending =
    tasks.length -
    completed;

  const completionRate =
    tasks.length > 0
      ? Math.round(
          (completed /
            tasks.length) *
            100
        )
      : 0;

  const chartData = [
    {
      name:
        "Completed",
      value:
        completed,
    },
    {
      name:
        "Pending",
      value:
        pending,
    },
  ];

  function aiSuggestion() {
    if (
      tasks.length === 0
    )
      return "✨ Start your first task!";
    if (
      completionRate >=
      80
    )
      return "🏆 Amazing progress!";
    if (
      completionRate >=
      50
    )
      return "🌟 You're doing well!";
    return "🎯 Finish pending tasks!";
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-800 text-white p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-cyan-300">
              AI Task
              Dashboard
            </h1>

            <p className="text-gray-300">
              Smart
              productivity
              tracking
            </p>
          </div>

          <button
            onClick={
              handleLogout
            }
            className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-2xl"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <GlassCard title="Total">
            {
              tasks.length
            }
          </GlassCard>

          <GlassCard title="Done">
            {
              completed
            }
          </GlassCard>

          <GlassCard title="Pending">
            {pending}
          </GlassCard>
        </div>

        {/* AI */}
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-6 mb-8">
          <h2 className="text-cyan-300 text-xl mb-2">
            🤖 AI
            Analysis
          </h2>
          <p>
            {aiSuggestion()}
          </p>
        </div>

        {/* Chart */}
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-6 mb-8 h-80">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={
                  chartData
                }
                dataKey="value"
                outerRadius={
                  100
                }
                label
              >
                <Cell fill="#22C55E" />
                <Cell fill="#F59E0B" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Input */}
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-6 mb-8">
          <input
            className="w-full p-3 rounded-2xl mb-3 text-black"
            placeholder="Task title"
            value={title}
            onChange={(
              e
            ) =>
              setTitle(
                e
                  .target
                  .value
              )
            }
          />

          <textarea
            className="w-full p-3 rounded-2xl mb-3 text-black"
            placeholder="Description"
            value={
              description
            }
            onChange={(
              e
            ) =>
              setDescription(
                e
                  .target
                  .value
              )
            }
          />

          <select
            value={
              priority
            }
            onChange={(
              e
            ) =>
              setPriority(
                e
                  .target
                  .value
              )
            }
            className="w-full p-3 rounded-2xl mb-3 text-black"
          >
            <option>
              Low
            </option>
            <option>
              Medium
            </option>
            <option>
              High
            </option>
          </select>

          <button
            onClick={
              editingId
                ? updateTask
                : addTask
            }
            className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-2xl"
          >
            {editingId
              ? "Update Task"
              : "Add Task"}
          </button>
        </div>

        {/* Filter */}
        <div className="flex gap-3 mb-6">
          {[
            "All",
            "High",
            "Medium",
            "Low",
          ].map(
            (
              item
            ) => (
              <button
                key={
                  item
                }
                onClick={() =>
                  setFilter(
                    item
                  )
                }
                className={`px-4 py-2 rounded-2xl ${
                  filter ===
                  item
                    ? "bg-cyan-500"
                    : "bg-white/10"
                }`}
              >
                {item}
              </button>
            )
          )}
        </div>

        {/* Tasks */}
        <div className="space-y-4">
          {tasks
            .filter(
              (
                task
              ) =>
                filter ===
                "All"
                  ? true
                  : task.priority ===
                    filter
            )
            .map(
              (
                task
              ) => (
                <div
                  key={
                    task._id
                  }
                  className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-5"
                >
                  <div className="flex justify-between">
                    <h3 className="font-bold">
                      {
                        task.title
                      }
                    </h3>

                    <div className="flex gap-2 items-center">
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          task.priority ===
                          "High"
                            ? "bg-red-500"
                            : task.priority ===
                              "Medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                      >
                        {
                          task.priority
                        }
                      </span>

                      <span>
                        {task.status ===
                        "Completed"
                          ? "✅"
                          : "⏳"}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-300 my-2">
                    {
                      task.description
                    }
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setEditingId(
                          task._id
                        );
                        setTitle(
                          task.title
                        );
                        setDescription(
                          task.description
                        );
                        setPriority(
                          task.priority ||
                            "Medium"
                        );
                      }}
                      className="bg-blue-600 px-3 py-1 rounded-xl"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        completeTask(
                          task._id
                        )
                      }
                      className="bg-green-600 px-3 py-1 rounded-xl"
                    >
                      Done
                    </button>

                    <button
                      onClick={() =>
                        deleteTask(
                          task._id
                        )
                      }
                      className="bg-red-600 px-3 py-1 rounded-xl"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            )}
        </div>

      </div>
    </main>
  );
}

function GlassCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-6 text-center">
      <p className="text-gray-300">
        {title}
      </p>

      <h2 className="text-3xl font-bold text-cyan-300">
        {children}
      </h2>
    </div>
  );
}