"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    const savedUser = localStorage.getItem("user");

    // No registered user
    if (!savedUser) {
      alert("No account found. Please register first.");
      router.push("/register");
      return;
    }

    const user = JSON.parse(savedUser);

    // Check login credentials
    if (
      email === user.email &&
      password === user.password
    ) {
      localStorage.setItem("loggedIn", "true");
      router.push("/dashboard");
    } else {
      alert("Invalid email or password");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-800 text-white flex items-center justify-center p-6">
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

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 outline-none"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-cyan-500 hover:bg-cyan-600 py-4 rounded-2xl font-semibold"
          >
            Login
          </button>
        </div>

        <p className="text-center text-gray-300 mt-6">
          New user?{" "}
          <span
            onClick={() =>
              router.push("/register")
            }
            className="text-cyan-300 cursor-pointer"
          >
            Register
          </span>
        </p>
      </motion.div>
    </main>
  );
}