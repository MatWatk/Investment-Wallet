import type { translationsType } from "../types/types";

export const translations: translationsType = {
    english: {
        login: {
            title: "Login",
            emailPlaceholder: "Email address",
            passwordPlaceholder: "Password",
            submitButton: "Login",
            dontHaveAccount: "Don't have an account?",
            register: "Register"
        },
        signup: {
            title: "Sign Up",
            emailPlaceholder: "Email address",
            confirmEmailPlaceholder: "Confirm Email",
            passwordPlaceholder: "Password",
            confirmPasswordPlaceholder: "Confirm Password",
            submitButton: "Sign Up",
            alreadyHaveAccount: "Already have an account?",
            login: "Login"
        },
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
            summaryBar: "Total value: "
        }
    },
    polish: {
        login: {
            title: "Zaloguj się",
            emailPlaceholder: "Adres e-mail",
            passwordPlaceholder: "Hasło",
            submitButton: "Zaloguj się",
            dontHaveAccount: "Nie masz konta?",
            register: "Zarejestruj się"
        },
        signup: {
            title: "Zarejestruj się",
            emailPlaceholder: "Adres e-mail",
            confirmEmailPlaceholder: "Potwierdź adres e-mail",
            passwordPlaceholder: "Hasło",
            confirmPasswordPlaceholder: "Potwierdź hasło",
            submitButton: "Zarejestruj się",
            alreadyHaveAccount: "Masz już konto?",
            login: "Zaloguj się"
        },
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
            summaryBar: "Łączna wartość: "
        }
    }
}
