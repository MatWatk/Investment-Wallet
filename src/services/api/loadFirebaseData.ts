import { db } from "../../services/firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";

type CollectionName =
    | "wallet-edit-history"
    | "wallet-tabs"
    | "deposit";

function getFirebaseErrorStatus(error: unknown): number {
    if (typeof error !== "object" || error === null || !("code" in error)) return 500;

    switch (error.code) {
        case "permission-denied":
            return 403;
        case "unauthenticated":
            return 401;
        case "unavailable":
        case "deadline-exceeded":
            return 503;
        default:
            return 500;
    }
}

export default async function loadFirebaseData<T>(
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
        throw new Error('Failed to load data from collection', {
            cause: { status: getFirebaseErrorStatus(error) },
        });
    }
}