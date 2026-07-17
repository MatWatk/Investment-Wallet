import { db } from "../../services/firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";

type CollectionName =
    | "wallet-edit-history"
    | "wallet-tabs";

export default async function loadWalletAssets<T>(
    collectionName: CollectionName,
    fetchedFields: string[],
    loggedUserEmail: string,
): Promise<T[]> {
    const collectionRef = collection(db, collectionName);
    try {
        const filteredQuery = query(collectionRef, where("loggedUser", "==", loggedUserEmail));
        const querySnapshot = await getDocs(filteredQuery);
        const data = querySnapshot.docs.map(doc => {
            const docData = doc.data();
            const fieldData = Object.fromEntries(
                fetchedFields.map(field => [field, docData[field]])
            );
            return { id: doc.id, ...fieldData } as T;
        });
        return data;
    }
    catch (error) {
        console.error(error)
        throw new Response('Failed to load data from collection', { status: 500 });
    }
}