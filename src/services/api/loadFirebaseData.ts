import { db } from "../../services/firebase/config";
import { collection, getDocs } from "firebase/firestore";

export default async function loadFirebaseData(collectionName: string) {
    const collectionRef = collection(db, collectionName);
    const querySnapshot = await getDocs(collectionRef);
    const data = querySnapshot.docs.map(doc => ({ ...doc.data() }));

    return data;
}