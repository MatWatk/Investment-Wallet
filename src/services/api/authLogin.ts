import { auth } from '../../services/firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default async function login(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
}