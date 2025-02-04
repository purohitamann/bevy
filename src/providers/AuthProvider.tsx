"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import { prisma } from "@/utils/prisma";

interface AuthContextProps {
    user: any;
    signUp: (username: string, email: string, password: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    signUp: async () => { },
    signIn: async () => { },
    signOut: async () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    // 🟣 1. Sign Up
    const signUp = async (username: string, email: string, password: string) => {
        try {
            // 👉 A) Create user in Supabase Auth
            const { data, error } = await supabase.auth.signUp({ email, password });
            if (error) {
                throw new Error(error.message);
            }

            const userId = data?.user?.id;
            if (!userId) {
                throw new Error("Supabase user not found after signup.");
            }

            // 👉 B) Create user in Prisma DB with the same ID
            await prisma.user.create({
                data: {
                    id: userId, // Must match the supabase auth user ID
                    email,
                    username,
                },
            });

            // 👉 C) Update local state & redirect
            setUser(data.user);
            router.push("/home");
        } catch (err: any) {
            console.error("Signup failed:", err.message);
            throw err; // re-throw for your UI to catch
        }
    };

    // 🟣 2. Sign In
    const signIn = async (email: string, password: string) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) {
                throw new Error(error.message);
            }
            setUser(data.user);
            router.push("/home");
        } catch (err: any) {
            console.error("SignIn failed:", err.message);
            throw err;
        }
    };

    // 🟣 3. Sign Out
    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw new Error(error.message);
            setUser(null);
            router.push("/login");
        } catch (err: any) {
            console.error("SignOut failed:", err.message);
        }
    };

    // 🟣 4. Keep track of auth state changes
    useEffect(() => {
        const { data: subscription } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                if (!session?.user) {
                    setUser(null);
                } else {
                    setUser(session.user);
                }
            }
        );
        return () => {
            subscription?.subscription.unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, signUp, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
