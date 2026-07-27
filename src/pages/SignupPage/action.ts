import { redirect } from "react-router-dom";
import authSingup from "../../services/api/authSingup";

export async function action({ request }: { request: Request }) {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    try {
        await authSingup(email, password);
        return redirect('/login');
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('auth/email-already-in-use')) {
                return { errorKey: 'emailInUse' };
            }
            else if (error.message.includes('auth/invalid-email')) {
                return { errorKey: 'invalidEmail' };
            }
            else if (error.message.includes('auth/weak-password')) {
                return { errorKey: 'weakPassword' };
            }
            else if (error.message.includes('auth/network-request-failed')) {
                return { errorKey: 'network' };
            }
            else {
            return { errorKey: 'generic' };
            }
        }
        throw error;
    }
}