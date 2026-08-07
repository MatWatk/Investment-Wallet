import { renderHook, waitFor } from "@testing-library/react";
import logout from "../../services/api/authLogout";
import { auth } from '../../services/firebase/config';
import { vi } from "vitest";
import useLogout from "../useLogout";
import { MemoryRouter } from "react-router-dom";

vi.mock('../../services/api/authLogout', () => ({
    default: vi.fn(),
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter>
        {children}
    </MemoryRouter>
);

describe('logout tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    test('should call signOut from firebase/auth', async () => {
        Object.defineProperty(auth, 'currentUser', {
            value: { email: 'user@example.com' },
            configurable: true,
        });

        await logout();
        expect(logout).toHaveBeenCalled();
    });

    test('should throw error if user is not logged in', async () => {
        Object.defineProperty(auth, 'currentUser', {
            value: null,
            configurable: true,
        });
        const { result } = renderHook(() => useLogout(), { wrapper });
        result.current.handleLogout();
        expect(logout).not.toHaveBeenCalled();
        await waitFor(() => {
            expect(result.current.logoutError).toBe('No user is currently logged in.');
        });
    });

    test('should set logoutError if logout fails', async () => {
        vi.mocked(logout).mockRejectedValueOnce(new Error('Logout failed.'));

        Object.defineProperty(auth, 'currentUser', {
            value: { email: 'user@example.pl' },
            configurable: true,
        });
        const { result } = renderHook(() => useLogout(), { wrapper });
        result.current.handleLogout();
        expect(logout).toHaveBeenCalledTimes(1);
        await waitFor(() => {
            expect(result.current.logoutError).toBe('Logout failed.');
        });
    });
});
