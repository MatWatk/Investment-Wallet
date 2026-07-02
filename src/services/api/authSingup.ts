import { auth } from '../../services/firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default async function signup(email: string, password: string) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw error;
    }
}