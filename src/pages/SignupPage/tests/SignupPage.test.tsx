import { createMemoryRouter, RouterProvider } from "react-router-dom";
import SignupPage from "../SignupPage";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, test, vi } from "vitest";
import { Provider } from "react-redux";
import { store } from "../../../store";
import { action as signupAction } from "../action";

vi.mock('../action', () => ({
    action: vi.fn(),
}));

describe('SignupPage tests', () => {
    const renderSignupPage = () => {
        const router = createMemoryRouter([
            {
                path: '/signup',
                element: (
                    <Provider store={store}>
                        <SignupPage />
                    </Provider>
                ),
                action: signupAction,
            },
            {
                path: '/login',
                element: <div>Login Page</div>,
            },
        ], {
            initialEntries: ['/signup'],
        });

        render(<RouterProvider router={router} />);
    };

    afterEach(() => {
        vi.clearAllMocks();
    });

    test('should render the signup page correctly', () => {
        renderSignupPage();

        const emailInput = screen.getByLabelText(/email address/i);
        const passwordInput = screen.getByLabelText(/^password$/i);
        const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
        const submitButton = screen.getByRole('button', { name: /sign up/i });
        const loginLink = screen.getByRole('link', { name: /login/i });

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(confirmPasswordInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
        expect(loginLink).toBeInTheDocument();
    });
    test('should send email, password and confirm password when form is submitted', async () => {
        renderSignupPage();

        const emailInput = screen.getByLabelText(/email address/i);
        const passwordInput = screen.getByLabelText(/^password$/i);
        const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
        const submitButton = screen.getByRole('button', { name: /sign up/i });

        await userEvent.type(emailInput, 'test@example.com');
        await userEvent.type(passwordInput, 'password123');
        await userEvent.type(confirmPasswordInput, 'password123');
        await userEvent.click(submitButton);

        expect(signupAction).toHaveBeenCalledWith(expect.objectContaining({
            request: expect.any(Request),
        }));
    });

    test('all fields should be required', async () => {
        renderSignupPage();

        const emailInput = screen.getByLabelText(/email address/i);
        const passwordInput = screen.getByLabelText(/^password$/i);
        const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

        expect(emailInput).toBeRequired();
        expect(passwordInput).toBeRequired();
        expect(confirmPasswordInput).toBeRequired();
    })

    test('all fields should be empty initially', async () => {
        renderSignupPage();

        const emailInput = screen.getByLabelText(/email address/i);
        const passwordInput = screen.getByLabelText(/^password$/i);
        const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

        expect(emailInput).toHaveValue('');
        expect(passwordInput).toHaveValue('');
        expect(confirmPasswordInput).toHaveValue('');
    })

    test('should display error when passwords do not match and button should be disabled', async () => {
        renderSignupPage();

        const passwordInput = screen.getByLabelText(/^password$/i);
        const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
        const submitButton = screen.getByRole('button', { name: /sign up/i });

        await userEvent.type(passwordInput, 'password123');
        await userEvent.type(confirmPasswordInput, 'password456');

        expect(await screen.findByText(/values do not match/i)).toBeInTheDocument();
        expect(submitButton).toBeDisabled();
    });

    test('should navigate to the login page when login link is clicked', async () => {
        renderSignupPage();

        const loginLink = screen.getByRole('link', { name: /login/i });
        await userEvent.click(loginLink);

        expect(await screen.findByText(/login page/i)).toBeInTheDocument();
    })

    test('should display backend error when action returns an error', async () => {
        vi.mocked(signupAction).mockResolvedValue({ errorKey: 'emailInUse' });

        renderSignupPage();

        const emailInput = screen.getByLabelText(/email address/i);
        const passwordInput = screen.getByLabelText(/^password$/i);
        const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
        const submitButton = screen.getByRole('button', { name: /sign up/i });

        await userEvent.type(emailInput, 'test@example.com');
        await userEvent.type(passwordInput, 'password123');
        await userEvent.type(confirmPasswordInput, 'password123');
        await userEvent.click(submitButton);

        expect(await screen.findByText(/email already in use/i)).toBeInTheDocument();
    })
})