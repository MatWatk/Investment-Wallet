import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import type { ActionFunction } from 'react-router-dom';
import LoginPage from '../LoginPage';
import login from "../../../services/api/authLogin";
import { store } from '../../../store';
import type { User } from 'firebase/auth';
import { action as loginAction } from '../action';
import { auth } from "../../../services/firebase/config";

vi.mock('../../../services/api/authLogin', () => ({
    default: vi.fn(),
}));


describe('LoginPage tests', () => {
    afterEach(() => {
        vi.clearAllMocks();
        vi.mocked(login).mockReset();
        Object.defineProperties(auth, {
            currentUser: {
                value: null,
            }
        });
    });
    const renderLoginPage = (action?: ActionFunction) => {
        const router = createMemoryRouter([
            {
                path: '/login',
                element: (
                    <Provider store={store}>
                        <LoginPage />
                    </Provider>
                ),
                action,
            },
            {
                path: '/signup',
                element: <div>Signup Page</div>,
            },
            {
                path: '/',
                element: <div>Wallet Page</div>,
            }
        ], {
            initialEntries: ['/login'],
        });

        render(<RouterProvider router={router} />);

    };

    test('should render the login page correctly', () => {
        renderLoginPage();

        const emailInput = screen.getByPlaceholderText(/email/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);
        const submitButton = screen.getByRole('button', { name: /login/i });
        const registerButton = screen.getByText(/register/i);

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
        expect(registerButton).toBeInTheDocument();
    });

    test('email and password inputs should be empty initially', () => {
        renderLoginPage();

        const emailInput = screen.getByPlaceholderText(/email/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);

        expect(emailInput).toHaveValue('');
        expect(passwordInput).toHaveValue('');
    });

    test('email and password inputs should be required', () => {
        renderLoginPage();

        const emailInput = screen.getByPlaceholderText(/email/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);

        expect(emailInput).toBeRequired();
        expect(passwordInput).toBeRequired();
    });

    test('error should be displayed when invalid credentials are provided', async () => {
        renderLoginPage(async () => ({ errorKey: 'invalidCredentials' }));

        const emailInput = screen.getByPlaceholderText(/email/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);
        const submitButton = screen.getByRole('button', { name: /login/i });

        await userEvent.type(emailInput, 'test@example.com');
        await userEvent.type(passwordInput, 'invalidpassword');
        await userEvent.click(submitButton);

        expect(await screen.findByText(/incorrect password or email/i)).toBeInTheDocument();
    });

    test('should navigate to the signup page when register button is clicked', async () => {
        renderLoginPage();

        const registerButton = screen.getByText(/register/i);
        await userEvent.click(registerButton);

        expect(await screen.findByText(/signup page/i)).toBeInTheDocument();
    });

    test('error should disappear after changing input values', async () => {
        renderLoginPage(async () => ({ errorKey: 'invalidCredentials' }));

        const emailInput = screen.getByPlaceholderText(/email/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);
        const submitButton = screen.getByRole('button', { name: /login/i });

        await userEvent.type(emailInput, 'test@example.com');
        await userEvent.type(passwordInput, 'invalidpassword');
        await userEvent.click(submitButton);

        expect(await screen.findByText(/incorrect password or email/i)).toBeInTheDocument();

        await userEvent.type(passwordInput, 'aaa');

        expect(screen.queryByText(/incorrect password or email/i)).not.toBeInTheDocument();
        await userEvent.click(submitButton);
        expect(await screen.findByText(/incorrect password or email/i)).toBeInTheDocument();

        await userEvent.type(emailInput, 'aaa');

        expect(screen.queryByText(/incorrect password or email/i)).not.toBeInTheDocument();

    })

    describe('positive login tests', () => {

        test('should navigate to the wallet page when login is successful', async () => {
            vi.mocked(login).mockResolvedValue({
                uid: '123',
                email: 'test@test.pl',
            } as User);

            renderLoginPage(loginAction)

            const emailInput = screen.getByPlaceholderText(/email/i);
            const passwordInput = screen.getByPlaceholderText(/password/i);
            const submitButton = screen.getByRole('button', { name: /login/i });

            await userEvent.type(emailInput, 'test@test.pl');
            await userEvent.type(passwordInput, '123456');
            await userEvent.click(submitButton);

            expect(await screen.findByText(/wallet page/i)).toBeInTheDocument();
        });
        test('button should be disabled with changed text on logging in status', async () => {
            vi.mocked(login).mockResolvedValue({
                uid: '123',
                email: 'test@test.pl',
            } as User);
            renderLoginPage(loginAction)

            Object.defineProperty(auth, 'currentUser', {
                value: null,
                configurable: true,
            });

            const emailInput = screen.getByPlaceholderText(/email/i);
            const passwordInput = screen.getByPlaceholderText(/password/i);
            const submitButton = screen.getByRole('button', { name: /login/i });

            await userEvent.type(emailInput, 'test@test.pl');
            await userEvent.type(passwordInput, '123456');
            await userEvent.click(submitButton);

            expect(await submitButton).toBeDisabled();
            expect(await submitButton).toHaveTextContent(/logging in/i);

        });

        test('successful message should appear after providing correct login and password', async () => {
            Object.defineProperty(auth, 'currentUser', {
                value: { email: 'test@test.pl' },
                configurable: true,
            });

            renderLoginPage(loginAction)

            expect(await screen.findByText(/logged successfully/i)).toBeInTheDocument();
        });
    });
});