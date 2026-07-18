export type currencyType = "USD" | "PLN";

export type translationsType = {
    [key: string]: {
        login: {
            title: string;
            emailPlaceholder: string;
            passwordPlaceholder: string;
            submitButton: string;
            dontHaveAccount: string;
            register: string;
            loginProcessing: string;
            successMessage: string;
            invalidCredentialsError: string;
            networkError: string;
            genericError: string;
        },
        signup: {
            title: string;
            emailPlaceholder: string;
            confirmEmailPlaceholder: string;
            passwordPlaceholder: string;
            confirmPasswordPlaceholder: string;
            submitButton: string;
            submittingText: string;
            alreadyHaveAccount: string;
            login: string;
            valuesDoNotMatch: string;
            emailInUseError: string;
            invalidEmailError: string;
            weakPasswordError: string;
            networkError: string;
            genericError: string;
        },
        assetPricePage: {
            title: string;
        },
        assetTable: {
            assetName: string;
            last24hChange: string;
            last30dChange: string;
            amount: string;
            value: string;
            currency: string;
        },
        navBar: {
            projectName: string;
            currencyLabel: string;
            languageLabel: string;
            languages: string[];
            themeLabel: string;
        },
        sideBar: {
            logout: string;
            sideButtons: string[];
        },
        walletPage: {
            walletHeader: string;
            searchbarLabel: string;
            searchbarPlaceholder: string;
            tableHeaders: string[];
            summaryBar: string;
            addAssetButton: string;
            addPlatform: string;
            editButton: string;
            summaryTab: string;
        },
        modals: {
            addAsset: {
                titleEdit: string;
                titleAdd: string;
                assetName: string;
                amount: string;
                price: string;
                currency: string;
                platform: string;
                addPlatform: string;
                date: string;
                close: string;
                submitEdit: string;
                submitAdd: string;
                automaticCalculation: string;
                exchangeRateNotAvailable: string;
            },
            addPlatform: {
                title: string;
                platformName: string;
                platformsList: string;
                close: string;
                submit: string;
                deleteAlt: string;
            },
            deleteConfirmation: {
                title: string;
                connectedAssetWithAmount: string;
                removeConnectedAssetsPrefix: string;
                removeConnectedAssetsSuffix: string;
                confirmPlatformDeletePrefix: string;
                confirmPlatformDeleteSuffix: string;
                confirmAssetDeletePrefix: string;
                confirmAssetDeleteMiddle: string;
                cancel: string;
                confirm: string;
            },
            inputErrors: {
                amountPositive: string;
                platformExists: string;
            }
        },
        routerErrors: {
            walletData: string;
            assetPriceData: string;
            loginPage: string;
            signupPage: string;
        }
    }
}
