import { db } from "../../services/firebase/config";
import { collection, getDocs } from "firebase/firestore";

export default async function loadWalletAssets<T>(
    collectionName: string, 
    fetchedFields: string[]
): Promise<T[]> {
    const collectionRef = collection(db, collectionName);

    const querySnapshot = await getDocs(collectionRef);
    const data = querySnapshot.docs.map(doc => {
        const docData = doc.data();
        const fieldData = Object.fromEntries(
            fetchedFields.map(field => [field, docData[field]])
        );
        return { id: doc.id, ...fieldData } as T;
    });

    return data;
}