import { auth } from '../../services/firebase/config';
import { signOut } from 'firebase/auth';
import { authActions } from '../../store/authSlice';
import { store } from '../../store';

export default async function logout() {
    try {
        await signOut(auth);
        store.dispatch(authActions.setAuth({ isAuthenticated: false, user: null }));
    } catch (error) {
        throw error;
    }
}