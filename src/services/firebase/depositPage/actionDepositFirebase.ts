import { collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import type { WalletDepositRequest } from "../../../types/DepositTypes";
import depositRequestValidation from "./depositRequestValidation";

export default async function actionDepositFirebase(data: WalletDepositRequest) {
    depositRequestValidation(data);

    const { id, actionRequestType, amount, ...payload } = data;
    const ref = collection(db, "deposit");

    if (actionRequestType === "add") {
        await addDoc(ref, { ...payload, amount });
    }
    if (actionRequestType === "delete") {
        await deleteDoc(doc(ref, id));
    }
    if (actionRequestType === "edit") {
        if (!id) {
            throw new Error("ID is required for edit action");
        }
        await updateDoc(
            doc(db, "deposit", id),
            {...payload, amount,}
        );

    }

}