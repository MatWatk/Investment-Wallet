import { useState } from "react";
import logout from "../services/api/authLogout";
import { useNavigate } from "react-router-dom";

export default function useLogout() {
    const [logoutError, setLogoutError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            setLogoutError('Logout failed.');
        }
    };

    return { logoutError, handleLogout };
}