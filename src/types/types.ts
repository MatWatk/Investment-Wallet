export type currencyType = "USD" | "PLN";

export type translationsType = {
    english: {
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
        }
    },
    polish: {
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
        }
    }
};
