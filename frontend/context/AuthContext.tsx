"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { getCurrentUser } from "@/services/auth";

interface AuthContextType {
    user: any;
    isLoggedIn: boolean;
    loading: boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {

    const [user, setUser] = useState<any>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const currentUser = getCurrentUser();

        setUser(currentUser);

        setLoading(false);

    }, []);

    const logout = () => {

        localStorage.removeItem("token");

        setUser(null);

        window.location.href = "/login";

    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoggedIn: !!user,
                loading,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
}