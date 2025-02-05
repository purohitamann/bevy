"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextProps {
    user: unknown;
    signUp: (username: string, email: string, password: string, fullName?: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    getUser: (id: string) => Promise<void>;

}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    signUp: async () => { },
    signIn: async () => { },
    signOut: async () => { },
    getUser: async () => { }
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<unknown>(null);
    const router = useRouter();
    const pathname = usePathname();

    // 🟢 Get User Data from Supabase
    const getUser = async (id: string) => {
        const { data, error } = await supabase.from('User').select('*').eq('id', id).single();
        if (error) {
            console.error("Error fetching user:", error.message);
            return;
        }
        setUser(data);
        console.log("User data:", data);
    };

    // 🟢 Sign Up
    const signUp = async (username: string, email: string, password: string, fullName?: string) => {
        try {
            // 👉 1. Sign up the user with Supabase Auth
            const { data, error } = await supabase.auth.signUp({ email, password });
            if (error) throw error;

            const userId = data?.user?.id;
            if (!userId) throw new Error("User ID not found after signup.");

            // 👉 2. Insert user into 'User' table in Supabase
            const { error: dbError } = await supabase.from('User').insert([
                { id: userId, email, username, full_name: fullName }
            ]);
            if (dbError) throw dbError;

            // 👉 3. Fetch user data and update state
            await getUser(userId);
            router.push("/home");

        } catch (error: unknown) {
            console.error("Signup failed:", error);
        }
    };

    // 🟢 Sign In
    const signIn = async (email: string, password: string) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;

            console.log("SignIn successful:", data);
            await getUser(data?.user?.id);
            router.push("/home");
        } catch (error: unknown) {
            console.error("SignIn failed:", error);
        }
    };

    // 🟢 Sign Out
    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;

            setUser(null);
            router.push("/login");
        } catch (error: unknown) {
            console.error("SignOut failed:", error);
        }
    };

    // 🟢 Auth State Listener
    useEffect(() => {
        const { data: authData } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                getUser(session.user.id);
            } else {
                setUser(null);
                if (pathname !== "/signup" && pathname !== "/login") {
                    router.push("/login");
                }
            }
        });

        return () => {
            authData.subscription.unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, signUp, signIn, signOut, getUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
