import type { EditDataStatus } from "./WalletTypes";

export interface DepositData {
    id: string;
    amount: number;
    date: string;
    platform: string;
    loggedUser: string;
}

export interface WalletDepositRequest {
    id?: string;
    amount: number;
    date: string;
    platform: string;
    loggedUser: string;
    actionRequestType: EditDataStatus;
    currency: "USD" | "PLN";
}