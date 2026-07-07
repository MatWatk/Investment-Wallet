import { useSelector } from "react-redux";

type AuthUser = {
    uid: string;
    email: string | null;
}

export function useAuth() {
    return useSelector((state: { authData: { isAuthenticated: boolean, user: AuthUser | null } }) => state.authData);
}