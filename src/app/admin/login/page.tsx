"use client";

import Image from "next/image";
import logo from "../../../../public/Logo.svg";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AdminLoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Simulate login API call
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to admin dashboard on successful login
        router.push("/admin/dashboard");
      } else {
        setError(data.error || "Invalid email or password.");
      }
    } catch (error) {
      setError("An error occurred. Please try again. " + error);
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-custom">
      <div className="flex flex-col items-center justify-center h-full w-[664.53px] mx-auto max-md:w-[90%]">
        {/* Logo */}
        <Image src={logo} alt="logo" className="mb-6 w-[60px]" />

        {/* Title */}
        <h2 className="text-[36px] font-bold text-white mb-4">Admin Login</h2>

        {/* Description */}
        <p className="text-[#FAFAFA] text-[14px] mb-8 text-center">
          Please enter your credentials to access the admin dashboard.
        </p>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="w-full">
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 mb-4 rounded-lg border border-[#E4E7EB] text-[#FAFAFA] bg-transparent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 mb-4 rounded-lg border border-[#E4E7EB] text-[#FAFAFA] bg-transparent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#0ACF83] text-white rounded-lg hover:bg-[#00945B] transition duration-300 cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
