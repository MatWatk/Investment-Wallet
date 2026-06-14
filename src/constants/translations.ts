import type { translationsType } from "../types/types";

export const translations: translationsType = {
    english: {
        assetPricePage: {
            title: "Asset Price List"
        },
        assetTable: {
            assetName: "Asset Name",
            last24hChange: "Last 24h change",
            last30dChange: "Last 30d change",
            amount: "Amount",
            value: "Value",
            currency: "Currency",
        },
        navBar: {
            projectName: "Investment Wallet",
            currencyLabel: "Currency",
            languageLabel: "Language",
            languages: ["English", "Polish"],
            themeLabel: "Theme",
        },
        sideBar: {
            logout: "Logout",
            sideButtons: ["Your wallet", "Asset price list"]
        },
        walletPage: {
            walletHeader: "Your wallet",
            searchbarLabel: "Search",
            searchbarPlaceholder: "Search for an asset...",
            tableHeaders: ["Asset Name", "Amount", "Value", "Currency"],
        }
    },
    polish: {
        assetPricePage: {
            title: "Lista cen aktywów"
        },
        assetTable: {
            assetName: "Nazwa aktywa",
            last24hChange: "Zmiana 24h",
            last30dChange: "Zmiana 30d",
            amount: "Ilość",
            value: "Wartość",
            currency: "Waluta",
        },
        navBar: {
            projectName: "Portfel Inwestycyjny",
            currencyLabel: "Waluta",
            languageLabel: "Język",
            languages: ["Angielski", "Polski"],
            themeLabel: "Motyw",
        },
        sideBar: {
            logout: "Wyloguj się",
            sideButtons: ["Podgląd portfela", "Lista cen aktywów"]
        },
        walletPage: {
            walletHeader: "Twój portfel",
            searchbarLabel: "Szukaj",
            searchbarPlaceholder: "Szukaj aktywa...",
            tableHeaders: ["Nazwa aktywa", "Ilość", "Wartość", "Waluta"],
        }
    }
}
