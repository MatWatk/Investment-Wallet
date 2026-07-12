import { auth } from '../../services/firebase/config';
import { signOut } from 'firebase/auth';


export default async function logout() {
    try {
        await signOut(auth);
    } catch (error) {
        throw error;
    }
}