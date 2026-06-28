import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import type { WalletPlatformEditRequest } from "../../types/WalletTypes";
import { db } from "../firebase/config";

export default async function actionPlatformFirebase(data: WalletPlatformEditRequest) {
    const { platformName, editStatus, platformId, ...payload } = data;
    const ref = collection(db, "wallet-tabs");
    if (editStatus === "add") {
        await addDoc(ref, { platformName, editStatus, ...payload });
    }
    if (editStatus === "delete") {
        if (!platformId) {
            throw new Error("Missing platformId");
        }
        await deleteDoc(doc(db, "wallet-tabs", platformId));
    }
}