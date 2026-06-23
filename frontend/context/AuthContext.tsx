"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { getCurrentUser } from "@/features/auth/services/auth";
import { UserToken } from "@/features/auth/types/auth";

interface AuthContextType {
    user: UserToken | null;
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

    const [user, setUser] = useState<UserToken | null>(null);

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