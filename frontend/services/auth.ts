import { jwtDecode } from "jwt-decode";

interface UserToken {
    sub: string;
    user_id: number;
    name: string;
}

export function getCurrentUser(): UserToken | null {

    if (typeof window === "undefined") {
        return null;
    }

    const token = localStorage.getItem("token");

    if (!token) {
        return null;
    }

    try {
        return jwtDecode<UserToken>(token);
    } catch {
        return null;
    }
}