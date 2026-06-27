import { addDoc, collection } from "firebase/firestore";
import type { WalletPlatformEditRequest } from "../../types/WalletTypes";
import { db } from "../firebase/config";

export default async function actionPlatformFirebase(data: WalletPlatformEditRequest) {
    const { platformName, editStatus, ...payload } = data;
    const ref = collection(db, "wallet-tabs");
    console.log("actionPlatformFirebase", data);
    console.log("payload", payload);
    if (editStatus === "add") {
        await addDoc(ref, { platformName, editStatus });
    }
    
}