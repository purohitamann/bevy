"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";

/**
 * Dark-themed Home Page with Framer Motion animations.
 * Uses vibrant colors: #36C5F0, #2EB67D, #ECB22E, #E01E5A.
 */
interface User {
    full_name: string;

}

const Home = () => {
    const { user, signOut, getUser } = useAuth() as unknown as { user: User; signOut: () => Promise<void>; getUser: () => Promise<User> };

    const router = useRouter();
    const [totalUsers, setTotalUsers] = useState(0);

    const fetchTotalUsers = async () => {
        try {
            const { data, error } = await supabase.from("User").select("*");
            if (error) throw error;
            setTotalUsers(data.length);
        } catch (error: unknown) {
            console.error("Error fetching total users:", error);
        }
    };

    useEffect(() => {
        fetchTotalUsers();
    }, [router, getUser]);

    return (
        <motion.div
            className="flex flex-col items-center justify-center h-screen bg-gray-900"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 border border-gray-700 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
            >
                <h1 className="text-3xl font-bold text-white">Bevy Beta</h1>
                <motion.h3
                    className="text-md text-gray-400 mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Total Users: <span className="text-[#36C5F0] font-bold">{totalUsers}</span>
                </motion.h3>

                <motion.h2
                    className="text-lg font-semibold text-white mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    Welcome, <span className="text-[#2EB67D]">{user?.full_name || "User"}!</span>
                </motion.h2>

                <p className="mt-2 text-gray-300">You&apos;re now logged in.</p>

                <motion.button
                    className="w-full py-3 mt-6 text-white font-semibold rounded transition duration-300 ease-in-out bg-gradient-to-r from-[#36C5F0] to-[#2EB67D] hover:from-[#ECB22E] hover:to-[#E01E5A]"
                    onClick={async () => {
                        await signOut();
                        router.push("/login");
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                >
                    Logout
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

export default Home;
