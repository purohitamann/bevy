"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";

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
    const signUp = async (username: String, email: string, password: string) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        })
        console.log(data)
        if (error) {
            return console.log(error)
        }
        const { data: dataUser, error: errorUser } = await supabase.from('User').insert([{
            id: data?.user?.id, email: email, username: username
        }])
        console.log(dataUser)
        if (errorUser) {
            return console.log(errorUser)
        }
        setUser(data);
        return data
        // getUser(data?.user?.id)

        // router.push('/(tabs)');
    }


    // 🟣 2. Sign In
    const signIn = async (email: string, password: string) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) {
                throw new Error(error.message);
            }
            console.log("SignIn successful:", data);
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
