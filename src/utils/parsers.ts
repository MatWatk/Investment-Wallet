import type { WalletAssetRequest } from "../types/WalletTypes";

export function parseWalletAssetRequest(formData: FormData): WalletAssetRequest {
    const raw = Object.fromEntries(formData.entries());
    console.log("Raw form data:", raw);

    const name = typeof raw.name === "string" ? raw.name.trim() : "";
    const market = typeof raw.market === "string" ? raw.market : "";
    const date = typeof raw.date === "string" ? raw.date : "";
    const currency = raw.currency;

    const amount = Number(raw.amount);
    const price = Number(raw.price);

    if (currency !== "USD" && currency !== "PLN") {
        throw new Response("Invalid currency", { status: 400 });
    }

    if (!name || !date || !Number.isFinite(amount) || amount <= 0 || !Number.isFinite(price) || price <= 0) {
        throw new Response("Invalid form payload", { status: 400 });
    }

    return {
        name,
        amount,
        market,
        price,
        currency,
        date,
    };
}