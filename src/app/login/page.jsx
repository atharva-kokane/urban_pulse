"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple admin check
    if (email === "admin@urbanpulse.com" && password === "admin123") {
      localStorage.setItem("adminAuth", "true");
      router.push("/");
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#061226] text-white">

      <div className="bg-[#0B1B33] p-10 rounded-2xl border border-[#1f2a44]/60 w-[400px]">

        <h2 className="text-2xl font-semibold mb-6 text-center">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">

          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-[#0e1f35] rounded-lg border border-[#1f2a44]"
            required
          />

          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-[#0e1f35] rounded-lg border border-[#1f2a44]"
            required
          />

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 p-3 rounded-lg font-semibold"
          >
            Login
          </button>

        </form>

      </div>
    </div>
  );
}