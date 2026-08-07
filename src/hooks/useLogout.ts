import { useState } from "react";
import logout from "../services/api/authLogout";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase/config";

export default function useLogout() {
    const [logoutError, setLogoutError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            if(!auth.currentUser) {
                throw new Error('No user is currently logged in.');
            }
            await logout();
            navigate('/login');
        } catch(error) {
            setLogoutError(error instanceof Error ? error.message : 'Logout failed.');
        }
    };

    return { logoutError, handleLogout };
}