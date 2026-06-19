import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBWcEZ96YaLh8T-fz7QzUtNkSo_Y31sSAU",
  authDomain: "investment-wallet-b6bc8.firebaseapp.com",
  projectId: "investment-wallet-b6bc8",
  storageBucket: "investment-wallet-b6bc8.firebasestorage.app",
  messagingSenderId: "953071625239",
  appId: "1:953071625239:web:3fa6df1082efb012146852"
};

initializeApp(firebaseConfig);

const db = getFirestore();

export { db };