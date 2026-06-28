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
        console.log(`Delete platform with ID: ${platformId}`);
        if (!platformId) {
            throw new Error("Missing platformId");
        }
        await deleteDoc(doc(db, "wallet-tabs", platformId));
        console.log('delete doc called')
    }
}