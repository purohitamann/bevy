"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

/**
 * Dark-themed Login Page with Framer Motion animations.
 * Uses vibrant colors: #36C5F0, #2EB67D, #ECB22E, #E01E5A.
 */
const Login = () => {
    const { signIn } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please fill in both fields.");
            return;
        }

        try {
            await signIn(email, password);
            console.log("User signed in successfully");
            router.push("/home"); // Redirect to home after login
        } catch (err: unknown) {
            setError("Invalid email or password.");
            console.error(err);
        }
    };

    return (
        <motion.div
            className="flex justify-center items-center h-screen bg-gray-900"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
        >
            <motion.div
                className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 border border-gray-700"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
            >
                <h2 className="text-2xl font-semibold text-center text-white">Login</h2>
                {error && (
                    <p className="text-red-400 text-center mt-2">{error}</p>
                )}

                <motion.form
                    className="mt-6"
                    onSubmit={handleLogin}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-[#36C5F0] mb-3"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-[#2EB67D] mb-3"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <motion.button
                        type="submit"
                        className="w-full py-3 mt-4 text-white font-semibold rounded transition duration-300 ease-in-out bg-gradient-to-r from-[#36C5F0] to-[#2EB67D] hover:from-[#ECB22E] hover:to-[#E01E5A]"
                        disabled={!email || !password}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        Sign In
                    </motion.button>
                </motion.form>

                <p className="text-center mt-4 text-gray-400">
                    Don&apos;t have an account?{" "}
                    <a href="/signup" className="text-[#36C5F0] hover:underline">
                        Sign Up
                    </a>
                </p>
            </motion.div>
        </motion.div>
    );
};

export default Login;
