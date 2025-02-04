"use client";
import React from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

const Home = () => {
    const { user, signOut } = useAuth();
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
                <h2 className="text-2xl font-semibold">Welcome, {user?.email}!</h2>
                <p className="mt-2">You're now logged in.</p>
                <button
                    className="w-full bg-red-500 text-white py-2 rounded mt-4"
                    onClick={async () => {
                        await signOut();
                        router.push("/login");
                    }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Home;
