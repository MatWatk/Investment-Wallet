import type { WalletAssetEditRequest } from "../../types/WalletTypes";
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";

export default async function addData(data: WalletAssetEditRequest) {
    const { assetId, editStatus, prevAmount, defaultData, ...payload } = data;
    const ref = collection(db, "wallet-edit-history");

    if (editStatus === "edit") {
        if (!assetId) {
            throw new Response("Missing asset id for edit action", { status: 400 });
        }
        if (defaultData && defaultData.market === payload.market) {
            const editPayload = {
                ...payload,
                amount: payload.amount - (defaultData.amount ?? 0),
                editStatus: editStatus,
            };
            await addDoc(ref, editPayload);
        }
        if (defaultData && defaultData.market !== payload.market) {
            const editPayload = {
                ...payload,
                amount: -payload.amount,
                editStatus: editStatus,
                market: defaultData.market,
            };
            if (defaultData.amount > payload.amount) {
                await addDoc(ref, editPayload);
            } else {
                throw new Response("Amount in the new market must be less than the amount in the previous market", { status: 400 });
            }
            const newMarketPayload = {
                ...payload,
                amount: payload.amount,
                editStatus: editStatus,
                market: payload.market,
            };
            await addDoc(ref, newMarketPayload);
        }



    } else {
        await addDoc(ref, { ...payload, editStatus: editStatus });
    }
}