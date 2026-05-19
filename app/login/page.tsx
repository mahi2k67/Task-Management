"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    // fake login success
    localStorage.setItem("loggedIn", "true");
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-800 text-white flex items-center justify-center p-6 overflow-hidden">
      
      <div className="fixed top-10 left-10 text-3xl animate-bounce">✨</div>
      <div className="fixed top-24 right-20 text-3xl animate-pulse">💎</div>
      <div className="fixed bottom-20 left-20 text-3xl animate-bounce">🌟</div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-cyan-300">
            Welcome Back
          </h1>
          <p className="text-gray-300 mt-2">
            Login to your Task Dashboard
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <MiniCard emoji="🎯" text="Focus" />
          <MiniCard emoji="🚀" text="Grow" />
          <MiniCard emoji="🏆" text="Win" />
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 outline-none placeholder:text-gray-300"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 outline-none placeholder:text-gray-300"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-cyan-500 hover:bg-cyan-600 hover:scale-105 transition py-4 rounded-2xl font-semibold"
          >
            Login
          </button>
        </div>

        <p className="text-center text-gray-300 mt-6">
          Student Productivity App
        </p>
      </motion.div>
    </main>
  );
}

function MiniCard({
  emoji,
  text,
}: {
  emoji: string;
  text: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-3 text-center"
    >
      <div className="text-2xl mb-1">
        {emoji}
      </div>
      <p className="text-sm">{text}</p>
    </motion.div>
  );
}