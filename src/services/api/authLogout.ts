import { auth } from '../../services/firebase/config';
import { signOut } from 'firebase/auth';


export default async function logout() {
    await signOut(auth);
}