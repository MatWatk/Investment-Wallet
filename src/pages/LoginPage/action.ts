import { redirect } from "react-router-dom";
import login from "../../services/api/authLogin";

export async function action({ request }: { request: Request }) {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    try {
        const res = await login(email, password);
        console.log(res)
        return redirect('/');
    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('auth/invalid-credential')) {
                return { errorKey: 'invalidCredentials' };
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