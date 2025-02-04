"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

/**
 * A signup page with Framer Motion animations.
 * After successful signup, it also inserts the user ID
 * into the Supabase 'User' table.
 */
const Signup = () => {
    const { signUp } = useAuth();
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Optional validation
        if (!username || !email || !password) {
            setError("All fields are required.");
            return;
        }

        try {
            await signUp(username, email, password);
            console.log("User created successfully");
            router.push("/home"); // Uncomment if you want to redirect here
        } catch (err) {
            setError("Failed to create an account. Try again.");
            console.error(err);
        }
    };

    return (
        <motion.div
            className="flex justify-center items-center h-screen bg-gray-100"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
        >
            <motion.div
                className="bg-white p-6 rounded-lg shadow-md w-96"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
            >
                <h2 className="text-2xl font-semibold text-center">Sign Up</h2>
                {error && (
                    <p className="text-red-500 text-center mt-2">{error}</p>
                )}

                <motion.form
                    className="mt-4"
                    onSubmit={handleSignup}
                    // Animate the form sliding up
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full p-2 border rounded mb-3"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 border rounded mb-3"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 border rounded mb-3"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <motion.button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                        disabled={!username || !email || !password}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        Sign Up
                    </motion.button>
                </motion.form>

                <p className="text-center mt-4">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600">
                        Log In
                    </a>
                </p>
            </motion.div>
        </motion.div>
    );
};

export default Signup;
