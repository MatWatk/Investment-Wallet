import { useState } from 'react';
import { auth } from '../services/firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export function useSignup() {
  const [error, setError] = useState<string | null>(null);

  const signup = async (email: string, password: string) => {
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('credentials: ', userCredential.user);
    //   return userCredential.user;
    } catch (err: any) {
      setError(err.message);
    }
  };
  return { signup, error };
}