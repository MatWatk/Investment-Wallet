import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import LoginPage from '../LoginPage';
import { store } from '../../../store';

describe('LoginPage tests', () => {
    const renderLoginPage = (action?: () => Promise<{ errorKey: 'invalidCredentials' }>) => {
        const router = createMemoryRouter([
            {
                path: '/',
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
            }
        ], {
            initialEntries: ['/'],
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
});