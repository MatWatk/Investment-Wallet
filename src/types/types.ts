export type currencyType = "USD" | "PLN";

export type translationsType = {
    english: {
        login: {
            title: string;
            emailPlaceholder: string;
            passwordPlaceholder: string;
            submitButton: string;
            dontHaveAccount: string;
            register: string;
        },
        signup: {
            title: string;
            emailPlaceholder: string;
            confirmEmailPlaceholder: string;
            passwordPlaceholder: string;
            confirmPasswordPlaceholder: string;
            submitButton: string;
            alreadyHaveAccount: string;
            login: string;
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
        }
    },
    polish: {
        login: {
            title: string;
            emailPlaceholder: string;
            passwordPlaceholder: string;
            submitButton: string;
            dontHaveAccount: string;
            register: string;
        },
        signup: {
            title: string;
            emailPlaceholder: string;
            confirmEmailPlaceholder: string;
            passwordPlaceholder: string;
            confirmPasswordPlaceholder: string;
            submitButton: string;
            alreadyHaveAccount: string;
            login: string;
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
        }
    }
};
