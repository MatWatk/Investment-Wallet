import AssetTableHeader from "../../components/AssetTable/AssetTableHeader";
import type { DepositData } from "../../types/WalletTypes";
import { useLoaderData } from "react-router-dom";
import PageContentWrapper from "../../components/PageContentWrapper";
import PageHeader from "../../components/PageHeader";
import AssetButton from "../../components/Wallet_components/AssetButton";
import { translations } from "../../constants/translations";
import { useLanguage } from "../../hooks/useLanguage";
import DepositPosition from "../../components/AssetTable/DepositPosition";
// import useSortData from "../../hooks/useSortData";

export default function DepositPage() {
    const language = useLanguage();
    const depositData = useLoaderData<DepositData[]>();

    // const { sortedData, requestSort, sortConfig } = useSortData(data, {
    //     name: (coin) => assetByCoingeckoId[coin.id]?.name ?? "",
    //     current_price: (coin) => coin.current_price,
    //     price_change_percentage_24h_in_currency: (coin) => coin.price_change_percentage_24h_in_currency,
    //     price_change_percentage_30d_in_currency: (coin) => coin.price_change_percentage_30d_in_currency,
    // });
    return (
        <>
            <div className="mb-6 flex flex-wrap items-start gap-4 shrink-0">
                <PageHeader title={translations[language].depositPage.title} />
                <div className="ml-auto flex w-full flex-wrap justify-end gap-3 sm:w-auto sm:flex-nowrap sm:gap-5">
                    <AssetButton
                        id={"add-platform-button"}
                        onClick={() => {
                            // Handle the click event for adding a platform
                        }}>
                        {translations[language].depositPage.addDepositButton}
                    </AssetButton>
                </div>
            </div>
            <PageContentWrapper>
                <AssetTableHeader
                    type='deposit'

                    // handleSort={requestSort}
                    // sortConfig={sortConfig}
                    sortableKeys={[
                        "name",
                    ]}
                />
                {depositData.map((deposit, index) => (
                    <DepositPosition key={index} depositData={deposit} />
                ))}
            </PageContentWrapper>
        </>
    );
}

