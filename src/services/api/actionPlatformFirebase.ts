import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import type { WalletPlatformEditRequest } from "../../types/WalletTypes";
import { db } from "../firebase/config";

export default async function actionPlatformFirebase(data: WalletPlatformEditRequest) {
    const { platformName, editStatus, platformId, ...payload } = data;
    const ref = collection(db, "wallet-tabs");

    if (editStatus === "delete" && !platformId) {
        throw new Response("Missing platformId", { status: 400 });
    }
    try {
        if (editStatus === "add") {
            await addDoc(ref, { platformName, editStatus, ...payload });
            return;
        }
        if (editStatus === "delete") {
            await deleteDoc(doc(db, "wallet-tabs", platformId!));
            return;
        }
    } catch (error) {
        console.error(error);
        throw new Response("Failed to perform action on platform", { status: 500 });
    }
}