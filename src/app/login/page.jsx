"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    toast.dismiss(); // Clear previous toasts
    toast.loading("Logging in...");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      toast.dismiss();

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || "Login failed");
        return;
      }

      toast.success("Login successful!");
      router.push("/"); // Navigate to dashboard or home after login
    } catch (err) {
      toast.dismiss();
      toast.error("Something went wrong.");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('https://www.zillowstatic.com/bedrock/app/uploads/sites/47/GA_ATL_PITTSBURGH_82772_161_RT-2_RT-5f7457-1440x960.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <Toaster />

      <motion.form
        className="relative w-full max-w-md mx-3 p-8 bg-white shadow-2xl rounded-2xl z-10 border border-gray-200"
        onSubmit={handleLogin}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-6 text-4xl font-extrabold text-center text-gray-800">
          Welcome Back!
        </h2>

        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 mt-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-8">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 mt-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            placeholder="Enter your password"
            required
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full py-3 text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-md hover:from-blue-600 hover:to-blue-700 shadow-md"
        >
          Login
        </motion.button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Register here
          </span>
        </p>
      </motion.form>
    </div>
  );
}
