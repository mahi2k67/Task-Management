"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-800 text-white overflow-hidden">

      {/* Floating decorations */}
      <div className="fixed top-10 left-10 text-4xl animate-bounce">
        ✨
      </div>

      <div className="fixed top-20 right-16 text-4xl animate-pulse">
        💎
      </div>

      <div className="fixed bottom-20 left-16 text-4xl animate-bounce">
        🌟
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold text-cyan-300 mb-6">
            AI Task Manager
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Organize tasks, track progress,
            analyze productivity, and achieve
            your goals smarter.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center gap-6 mb-20"
        >
          <button
            onClick={() =>
              router.push("/login")
            }
            className="bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-2xl text-lg font-semibold"
          >
            Login
          </button>

          <button
            onClick={() =>
              router.push("/register")
            }
            className="bg-white/10 border border-white/20 hover:bg-white/20 px-8 py-4 rounded-2xl text-lg font-semibold"
          >
            Register
          </button>
        </motion.div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6">

          <FeatureCard
            emoji="📝"
            title="Task Management"
            desc="Create, edit, complete and delete tasks easily."
          />

          <FeatureCard
            emoji="📊"
            title="Analytics"
            desc="Visual charts and AI insights for productivity."
          />

          <FeatureCard
            emoji="🎯"
            title="Priority Tracking"
            desc="High, medium and low priority organization."
          />

        </div>
      </div>
    </main>
  );
}

function FeatureCard({
  emoji,
  title,
  desc,
}: {
  emoji: string;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
      }}
      className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 text-center"
    >
      <div className="text-5xl mb-4">
        {emoji}
      </div>

      <h2 className="text-2xl font-bold text-cyan-300 mb-3">
        {title}
      </h2>

      <p className="text-gray-300">
        {desc}
      </p>
    </motion.div>
  );
}