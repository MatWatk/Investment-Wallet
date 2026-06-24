import type { WalletAssetEditRequest } from "../types/WalletTypes";

export function parseWalletAssetRequest(formData: FormData): WalletAssetEditRequest {
    const raw = Object.fromEntries(formData.entries());

    const name = typeof raw.name === "string" ? raw.name.trim() : "";
    const market = typeof raw.market === "string" ? raw.market : "";
    const date = typeof raw.date === "string" ? raw.date : "";
    const currency = raw.currency;

    const amount = Number(raw.amount);
    const price = Number(raw.price);
    const editStatus = raw.editStatus === "edit" ? "edit" : "add";
    const assetId = typeof raw.assetId === "string" && raw.assetId.length > 0 ? raw.assetId : undefined;

    let defaultData: WalletAssetEditRequest | undefined;
    if (typeof raw.defaultData === "string" && raw.defaultData.length > 0) {
        try {
            defaultData = JSON.parse(raw.defaultData) as WalletAssetEditRequest;
        } catch {
            throw new Response("Invalid defaultData payload", { status: 400 });
        }
    }

    if (currency !== "USD" && currency !== "PLN") {
        throw new Response("Invalid currency", { status: 400 });
    }


    return {
        name,
        amount,
        market,
        price,
        currency,
        date,
        editStatus,
        assetId,
        defaultData,
    };
}