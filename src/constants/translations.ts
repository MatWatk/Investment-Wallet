import type { translationsType } from "../types/types";

export const translations: translationsType = {
    english: {
        login: {
            title: "Login",
            emailPlaceholder: "Email address",
            passwordPlaceholder: "Password",
            submitButton: "Login",
            dontHaveAccount: "Don't have an account?",
            register: "Register",
            loginProcessing: "Logging in...",
            successMessage: "Logged successfully. Please wait...",
            invalidCredentialsError: "Incorrect password or email.",
            networkError: "Network error. Please check your internet connection and try again.",
            genericError: "Failed to log in. Please try again."
        },
        signup: {
            title: "Sign Up",
            emailPlaceholder: "Email address",
            confirmEmailPlaceholder: "Confirm Email",
            passwordPlaceholder: "Password",
            confirmPasswordPlaceholder: "Confirm Password",
            submitButton: "Sign Up",
            submittingText: "Signing Up...",
            alreadyHaveAccount: "Already have an account?",
            login: "Login",
            valuesDoNotMatch: "Values do not match",
            emailInUseError: "Email already in use. Please use a different email.",
            invalidEmailError: "Invalid email address. Please enter a valid email.",
            weakPasswordError: "Weak password. Please use a stronger password with at least 6 characters.",
            networkError: "Network error. Please check your internet connection and try again.",
            genericError: "Failed to sign up. Please try again."
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
            summaryBar: "Total value: ",
            addAssetButton: "Add Asset",
            addPlatform: "Add Platform",
            editButton: "Edit",
            summaryTab: "Summary",
        },
        modals: {
            addAsset: {
                titleEdit: "Edit Asset",
                titleAdd: "Add Asset",
                assetName: "Asset Name",
                amount: "Amount",
                price: "Price",
                currency: "Currency",
                platform: "Platform",
                addPlatform: "Add Platform",
                date: "Date",
                close: "Close",
                submitEdit: "Edit Asset",
                submitAdd: "Add Asset",
            },
            addPlatform: {
                title: "Add Platform",
                platformName: "Platform Name",
                platformsList: "Platforms:",
                close: "Close",
                submit: "Add Platform",
                deleteAlt: "Delete",
            },
            deleteConfirmation: {
                title: "Confirm Deletion",
                connectedAssetWithAmount: "with amount:",
                removeConnectedAssetsPrefix: "Please remove the connected assets before deleting the platform. There are",
                removeConnectedAssetsSuffix: "connected assets:",
                confirmPlatformDeletePrefix: "Are you sure you want to delete",
                confirmPlatformDeleteSuffix: "platform?",
                confirmAssetDeletePrefix: "Are you sure you want to delete",
                confirmAssetDeleteMiddle: "with amount",
                cancel: "Cancel",
                confirm: "Confirm",
            },
            inputErrors: {
                amountPositive: "Amount must be greater than 0",
                platformExists: "This platform name already exists",
            }
        },
        routerErrors: {
            walletData: "Error loading wallet data",
            assetPriceData: "Error loading asset price data",
            loginPage: "Error loading login page",
            signupPage: "Error loading signup page",
        }
    },
    polish: {
        login: {
            title: "Zaloguj się",
            emailPlaceholder: "Adres e-mail",
            passwordPlaceholder: "Hasło",
            submitButton: "Zaloguj się",
            dontHaveAccount: "Nie masz konta?",
            register: "Zarejestruj się",
            loginProcessing: "Logowanie...",
            successMessage: "Zalogowano pomyślnie. Proszę czekać...",
            invalidCredentialsError: "Nieprawidłowy e-mail lub hasło.",
            networkError: "Błąd sieci. Sprawdź połączenie z internetem i spróbuj ponownie.",
            genericError: "Nie udało się zalogować. Spróbuj ponownie."
        },
        signup: {
            title: "Zarejestruj się",
            emailPlaceholder: "Adres e-mail",
            confirmEmailPlaceholder: "Potwierdź adres e-mail",
            passwordPlaceholder: "Hasło",
            confirmPasswordPlaceholder: "Potwierdź hasło",
            submitButton: "Zarejestruj się",
            submittingText: "Rejestracja...",
            alreadyHaveAccount: "Masz już konto?",
            login: "Zaloguj się",
            valuesDoNotMatch: "Wartości nie są zgodne",
            emailInUseError: "Ten adres e-mail jest już używany. Użyj innego adresu.",
            invalidEmailError: "Nieprawidłowy adres e-mail. Wpisz poprawny adres.",
            weakPasswordError: "Hasło jest za słabe. Użyj silniejszego hasła (minimum 6 znaków).",
            networkError: "Błąd sieci. Sprawdź połączenie z internetem i spróbuj ponownie.",
            genericError: "Nie udało się zarejestrować. Spróbuj ponownie."
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
            summaryBar: "Łączna wartość: ",
            addAssetButton: "Dodaj aktywo",
            addPlatform: "Dodaj platformę",
            editButton: "Edytuj",
            summaryTab: "Podsumowanie",
        },
        modals: {
            addAsset: {
                titleEdit: "Edytuj aktywo",
                titleAdd: "Dodaj aktywo",
                assetName: "Nazwa aktywa",
                amount: "Ilość",
                price: "Cena",
                currency: "Waluta",
                platform: "Platforma",
                addPlatform: "Dodaj platformę",
                date: "Data",
                close: "Zamknij",
                submitEdit: "Edytuj aktywo",
                submitAdd: "Dodaj aktywo",
            },
            addPlatform: {
                title: "Dodaj platformę",
                platformName: "Nazwa platformy",
                platformsList: "Platformy:",
                close: "Zamknij",
                submit: "Dodaj platformę",
                deleteAlt: "Usuń",
            },
            deleteConfirmation: {
                title: "Potwierdź usunięcie",
                connectedAssetWithAmount: "z ilością:",
                removeConnectedAssetsPrefix: "Usuń powiązane aktywa przed usunięciem platformy. Liczba powiązanych aktywów:",
                removeConnectedAssetsSuffix: "",
                confirmPlatformDeletePrefix: "Czy na pewno chcesz usunąć platformę",
                confirmPlatformDeleteSuffix: "?",
                confirmAssetDeletePrefix: "Czy na pewno chcesz usunąć",
                confirmAssetDeleteMiddle: "o ilości",
                cancel: "Anuluj",
                confirm: "Potwierdź",
            },
            inputErrors: {
                amountPositive: "Ilość musi być większa od 0",
                platformExists: "Ta nazwa platformy już istnieje",
            }
        },
        routerErrors: {
            walletData: "Błąd ładowania danych portfela",
            assetPriceData: "Błąd ładowania danych cen aktywów",
            loginPage: "Błąd ładowania strony logowania",
            signupPage: "Błąd ładowania strony rejestracji",
        }
    }
}
