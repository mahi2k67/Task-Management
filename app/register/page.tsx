"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleRegister() {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    // Save user locally (simple demo)
    localStorage.setItem(
      "user",
      JSON.stringify({
        name,
        email,
        password,
      })
    );

    alert("Registration successful!");
    router.push("/login");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-800 text-white flex items-center justify-center p-6 overflow-hidden">
      
      {/* Floating icons */}
      <div className="fixed top-10 left-10 text-3xl animate-bounce">
        ✨
      </div>
      <div className="fixed top-24 right-20 text-3xl animate-pulse">
        💎
      </div>
      <div className="fixed bottom-20 left-20 text-3xl animate-bounce">
        🌟
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-cyan-300">
            Create Account
          </h1>
          <p className="text-gray-300 mt-2">
            Register for Task Dashboard
          </p>
        </div>

        {/* Mini cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <MiniCard emoji="🎯" text="Plan" />
          <MiniCard emoji="🚀" text="Build" />
          <MiniCard emoji="🏆" text="Achieve" />
        </div>

        {/* Form */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 outline-none placeholder:text-gray-300"
          />

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
            onClick={handleRegister}
            className="w-full bg-cyan-500 hover:bg-cyan-600 hover:scale-105 transition py-4 rounded-2xl font-semibold"
          >
            Register
          </button>
        </div>

        <p className="text-center text-gray-300 mt-6">
          Already have an account?{" "}
          <span
            onClick={() =>
              router.push("/login")
            }
            className="text-cyan-300 cursor-pointer"
          >
            Login
          </span>
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