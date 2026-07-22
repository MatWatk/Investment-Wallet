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
    const averagePrice = Number(get("averagePrice"));

    if (Number.isNaN(amount) || Number.isNaN(averagePrice)) {
        throw new Response("Invalid number fields", { status: 400 });
    }

    const editStatusRaw = get("editStatus");

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

    const loggedUser = get("loggedUser");
    if (!loggedUser) {
        throw new Response("Missing loggedUser", { status: 400 });
    }

    return {
        name,
        amount,
        market,
        averagePrice,
        currency,
        date,
        editStatus: editStatusRaw as "edit" | "add" | "delete",
        assetId,
        defaultData,
        actionRequestType: "asset",
        loggedUser,
    };
}

export function parseWalletPlatformRequest(formData: FormData): WalletPlatformEditRequest {
    const get = (key: string) => formData.get(key)?.toString();

    const platformName = get("platformName") ?? "";
    if (!platformName) {
        throw new Response("Missing platformName", { status: 400 });
    }

    const platformId = get("platformId");
    if (!platformId && get("editStatus") === "delete") {
        throw new Response("Missing platformId", { status: 400 });
    }
    const editStatus = get("editStatus");
    const actionRequestType = "platform";
    
    const loggedUser = get("loggedUser");
    if (!loggedUser) {
        throw new Response("Missing loggedUser", { status: 400 });
    }

    return {
        platformId,
        platformName,
        editStatus: editStatus as "edit" | "add" | "delete",
        actionRequestType,
        loggedUser,
    };
}