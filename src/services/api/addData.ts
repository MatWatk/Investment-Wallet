import type { WalletAssetRequest } from "../../types/WalletTypes";
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";

export default async function addData(data: WalletAssetRequest) { 
    const ref = collection(db, "wallet-assets");
    await addDoc(ref, data);
}