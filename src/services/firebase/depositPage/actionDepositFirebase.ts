import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import type { WalletDepositRequest } from "../../../types/DepositTypes";
import depositRequestValidation from "./depositRequestValidation";

export default function actionDepositFirebase(data: WalletDepositRequest) {
    depositRequestValidation(data);

    const { id, actionRequestType, amount, ...payload } = data;
    const ref = collection(db, "deposit");

    if (actionRequestType === "add") {
        console.log("Adding deposit:", payload);
        addDoc(ref, { ...payload, amount });
    }
}