import { jwtDecode } from "jwt-decode";

import { UserToken } from "../types/auth";

export function getCurrentUser():
    UserToken | null {

    if (typeof window === "undefined") {
        return null;
    }

    const token =
        localStorage.getItem("token");

    if (!token) {
        return null;
    }

    try {
        return jwtDecode<UserToken>(token);
    } catch {
        return null;
    }
}