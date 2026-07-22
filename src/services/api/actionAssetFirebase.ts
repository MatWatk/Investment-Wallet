import type { WalletAssetEditRequest } from "../../types/WalletTypes";
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";

export default async function actionAssetFirebase(data: WalletAssetEditRequest) {
    const { assetId, editStatus, defaultData, ...payload } = data;
    const ref = collection(db, "wallet-edit-history");

    if (payload.amount <= 0) {
        throw new Response("Amount must be greater than 0", { status: 400 });
    }
    if (editStatus === "edit" && !assetId) {
        throw new Response("Missing asset id for edit action", { status: 400 });
    }
    if (editStatus === "delete" && !assetId) {
        throw new Response("Missing asset id for delete action", { status: 400 });
    }

    try {
        if (editStatus === "edit" && defaultData) {
            if (defaultData.market === payload.market) {
                const editPayload = {
                    ...payload,
                    amount: payload.amount - (defaultData.amount ?? 0),
                    editStatus,
                };
                await addDoc(ref, editPayload);
                return;
            }
            if (defaultData.amount < payload.amount) {
                throw new Response("New amount cannot be greater than the previous amount when changing market", { status: 400 });
            }

            const editPayload = {
                ...payload,
                amount: -payload.amount,
                editStatus,
                market: defaultData.market,
            };
            await addDoc(ref, editPayload);

            const newMarketPayload = {
                ...payload,
                amount: payload.amount,
                editStatus,
                market: payload.market,
            };
            await addDoc(ref, newMarketPayload);
            return;
        }

        if (editStatus === "delete") {
            const deletePayload = {
                ...payload,
                amount: -payload.amount,
                averangePrice: -payload.averagePrice,
            };
            await addDoc(ref, deletePayload);
            return;
        }

        await addDoc(ref, { ...payload, editStatus });

    }
    catch (error) {
        if (error instanceof Response) {
            throw error;
        }
        console.error(error);
        throw new Response("Failed to perform action on asset", { status: 500 });
    }
}