"use client";
import React from "react";
import { useRouter } from "next/navigation";

const CreateAccount = () => {
    const router = useRouter();

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
                <h2 className="text-2xl font-semibold">Welcome!</h2>
                <p className="mt-4">Create an account to get started.</p>
                <button
                    className="w-full bg-green-500 text-white py-2 rounded mt-4"
                    onClick={() => router.push("/signup")}
                >
                    Create Account
                </button>
            </div>
        </div>
    );
};

export default CreateAccount;
