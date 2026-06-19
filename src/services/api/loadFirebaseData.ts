import { db } from "../../services/firebase/config";
import { collection, getDocs } from "firebase/firestore";

export default async function loadWalletAssets<T>(collectionName: string, fetchedFields: string[]): Promise<T[]> {
    const collectionRef = collection(db, collectionName);

    const querySnapshot = await getDocs(collectionRef);
    const data = querySnapshot.docs.map(doc => {
        const docData = doc.data();
        const assetData: Record<string, T> = {};
        fetchedFields.forEach(field => {
            assetData[field] = docData[field];
        });
        return assetData as T;
     });

    return data;
}