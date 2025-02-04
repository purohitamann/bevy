"use client";
import React, { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";


const Login = () => {
    const { signIn } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        await signIn(email, password);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold text-center">Login</h2>
                <form onSubmit={handleLogin} className="mt-4">
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
                        Sign In
                    </button>
                </form>
                <p className="text-center mt-4">
                    Don't have an account? <a href="/signup" className="text-blue-600">Sign Up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;

