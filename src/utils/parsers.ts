import type { WalletAssetEditRequest, WalletPlatformEditRequest } from "../types/WalletTypes";

export function parseWalletAssetRequest(formData: FormData): WalletAssetEditRequest {
    const get = (key: string) => formData.get(key)?.toString();

    const name = (get("name") ?? "").trim();
    const market = get("market") ?? "";
    const date = get("date") ?? "";

    const currencyRaw = get("currency");
    if (currencyRaw !== "USD" && currencyRaw !== "PLN") {
        throw new Response("Invalid currency", { status: 400 });
    }
    const currency = currencyRaw;

    const amount = Number(get("amount"));
    const price = Number(get("price"));

    if (Number.isNaN(amount) || Number.isNaN(price)) {
        throw new Response("Invalid number fields", { status: 400 });
    }

    const editStatusRaw = get("editStatus");
    // const editStatus = editStatusRaw === "edit" ? "edit" : "add";

    const assetIdRaw = get("assetId");
    const assetId = assetIdRaw ? assetIdRaw : undefined;

    let defaultData: WalletAssetEditRequest | undefined;
    const defaultDataRaw = get("defaultData");

    if (defaultDataRaw) {
        try {
            defaultData = JSON.parse(defaultDataRaw);
        } catch {
            throw new Response("Invalid defaultData payload", { status: 400 });
        }
    }

    return {
        name,
        amount,
        market,
        price,
        currency,
        date,
        editStatus: editStatusRaw as "edit" | "add" | "delete",
        assetId,
        defaultData,
        actionRequestType: "asset",
    };
}

export function parseWalletPlatformRequest(formData: FormData): WalletPlatformEditRequest {
    const raw = Object.fromEntries(formData.entries());

    const platformName = typeof raw.platformName === "string" ? raw.platformName.trim() : "";
    const editStatus = raw.editStatus === "edit" ? "edit" : "add";
    const actionRequestType = "platform";

    return {
        platformName,
        editStatus,
        actionRequestType,
    };
}

// export function parseDeleteRequest(formData: FormData): { id: string, collectionName: string } {
//     const raw = Object.fromEntries(formData.entries());

//     const id = typeof raw.assetId === "string" ? raw.assetId : "";
//     const collectionName = typeof raw.collectionName === "string" ? raw.collectionName : "";

//     return {
//         id,
//         collectionName,
//     };
// }