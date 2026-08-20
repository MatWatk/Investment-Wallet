import type { WalletDepositRequest } from "../../../types/DepositTypes";

export default function depositRequestValidation(data: WalletDepositRequest) {
    const { id, actionRequestType, amount, ...payload } = data;

    if (amount <= 0) {
        throw new Error("Amount must be greater than 0");
    }
    if ((actionRequestType === "edit" || actionRequestType === 'delete') && !id) {
        throw new Error("Missing deposit id for edit or delete action");
    }
    if (actionRequestType !== "add" && actionRequestType !== "edit" && actionRequestType !== "delete") {
        throw new Error("Invalid actionRequestType");
    }
    if (!payload.loggedUser) {
        throw new Error("Missing loggedUser");
    }
    if (!payload.platform) {
        throw new Error("Missing platform");
    }
}