import { collection, Firestore, getDocs } from "firebase/firestore";

export default async function loadFirebaseData(db: Firestore, collectionName: string) {
    const collectionRef = collection(db, collectionName);
    const querySnapshot = await getDocs(collectionRef);
    const data = querySnapshot.docs.map(doc => ({ ...doc.data() }));

    return data;
}