"use client";
import React, { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

const Signup = () => {
    const { signUp } = useAuth();
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        await signUp(username, email, password);
        router.push("/home");
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold text-center">Sign Up</h2>
                <form onSubmit={handleSignup} className="mt-4">
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
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
                        Sign Up
                    </button>
                </form>
                <p className="text-center mt-4">
                    Already have an account? <a href="/login" className="text-blue-600">Log In</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
