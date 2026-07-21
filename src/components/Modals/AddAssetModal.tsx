import ModalWrapper from "./ModalWrapper";
import ModalInput from "./ModalInput";
import ModalSelect from "./ModalSelect";
import ModalRowWrapper from "./ModalRowWrapper";
import ModalHeader from "./ModalHeader";
import ModalButton from "./ModalButton";
import { useTheme } from "../../hooks/useTheme";
import { Form } from "react-router-dom";

import { assets, currencies } from "../../constants/assets";
import type { EditDataStatus, WalletAssetEditRequest, WalletTab } from "../../types/WalletTypes";
import { useEffect, useState } from "react";
import { auth } from "../../services/firebase/config";
import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../constants/translations";
import { findAssetPrice } from "../../utils/utils";
import type { CoinMarketData } from "../../types/AssetTableTypes";
import ModalCheckbox from "./ModalCheckbox";
import { useCurrency } from "../../hooks/useCurrency";
import loadCurrencyExchRate from "../../services/api/loadCurrencyExchRate";

export default function AddAssetModal({
    isOpen,
    onClose,
    openPlatformModal,
    platforms,
    defaultData,
    editStatus,
    coingeckoData,
}: {
    isOpen: boolean,
    onClose: () => void,
    openPlatformModal: () => void,
    platforms: WalletTab[],
    defaultData?: WalletAssetEditRequest | null,
    editStatus?: EditDataStatus,
    coingeckoData: CoinMarketData[],
}) {
    const themeState = useTheme();
    const language = useLanguage();
    const currency = useCurrency();

    const [isInputInvalid, setIsInputInvalid] = useState<Record<string, boolean>>({});
    const [isAutomaticCalculationEnabled, setIsAutomaticCalculationEnabled] = useState<boolean>(false);
    const [selectedAsset, setSelectedAsset] = useState<string>(defaultData?.name || 'Bitcoin');
    const [modalCurrency, setModalCurrency] = useState<string>('USD');
    const [providedAmount, setProvidedAmount] = useState<number>(defaultData?.amount || 0);

    // Move to separate hook
    const [currentExchangeRate, setCurrentExchangeRate] = useState<number>(1);
    const [exchangeRateError, setExchangeRateError] = useState<string | null>(null);

    useEffect(() => {
        let canceled = false;
        const loadRate = async () => {
            if (!isAutomaticCalculationEnabled) {
                return;
            }
            try {
                const currencyExchRate = await loadCurrencyExchRate(currency);
                if (!canceled) {
                    setCurrentExchangeRate(currencyExchRate.rates[modalCurrency]);
                }
            } catch (error) {
                console.error("Failed to load currency exchange rate:", error);
                if (!canceled) {
                    setExchangeRateError(translations[language].modals.addAsset.exchangeRateNotAvailable);
                }
            }
        };
        loadRate();
        return () => {
            canceled = true;
        };
    }, [modalCurrency, currency]);
    // End of separate hook

    const currentDate = new Date().toISOString().split("T")[0];
    const currentEditStatus = editStatus ?? "add";

    const disableField = currentEditStatus === "edit";

    if (!isOpen) return null;

    const assetsPrices = (findAssetPrice(assets, coingeckoData, selectedAsset) * currentExchangeRate * providedAmount).toFixed(2);

    // console.log(`default data: ${defaultData?.price}`)
    // console.log(`assetsPrices: ${selectedAsset}`)
    console.log(findAssetPrice(assets, coingeckoData, selectedAsset) * currentExchangeRate * providedAmount)
    return (
        <ModalWrapper>
            <ModalHeader title={currentEditStatus === "edit" ? translations[language].modals.addAsset.titleEdit : translations[language].modals.addAsset.titleAdd} themeState={themeState} />
            <Form method="post" onSubmit={onClose} className="mt-4 flex flex-col gap-4">
                <input type="hidden" name="editStatus" value={currentEditStatus} />
                <input type="hidden" name="loggedUser" value={auth.currentUser?.email || ""} />
                <input type="hidden" name="assetId" value={defaultData?.assetId || ""} />
                <input type="hidden" name="defaultData" value={defaultData ? JSON.stringify(defaultData) : ""} />
                <input type="hidden" name="actionRequestType" value="asset" />
                {disableField && (
                    <>
                        <input type="hidden" name="name" value={defaultData?.name ?? ""} />
                        <input type="hidden" name="price" value={defaultData?.price ?? ""} />
                        <input type="hidden" name="currency" value={defaultData?.currency ?? ""} />
                        <input type="hidden" name="date" value={defaultData?.date ?? currentDate} />
                    </>
                )}
                {isAutomaticCalculationEnabled && (
                    <>
                        <input type="hidden" name="price" value={assetsPrices} />
                        <input type="hidden" name="currency" value={modalCurrency} />
                    </>
                )
                }
                <ModalSelect
                    themeState={themeState}
                    labelText={translations[language].modals.addAsset.assetName}
                    name="name"
                    options={assets.map((asset) => ({ value: asset.name, label: asset.name }))}
                    defaultValue={defaultData?.name}
                    disabled={disableField}
                    onChange={(event) => setSelectedAsset(event.target.value)}
                />
                <ModalInput
                    themeState={themeState}
                    labelText={translations[language].modals.addAsset.amount}
                    inputType="number"
                    name="amount"
                    defaultValue={defaultData?.amount}
                    invalidInput={isInputInvalid}
                    setInvalidInput={setIsInputInvalid}
                    onChange={(event) => setProvidedAmount(Number(event.target.value))}
                />
                <ModalCheckbox
                    themeState={themeState}
                    labelText={translations[language].modals.addAsset.automaticCalculation}
                    name="automaticCalculation"
                    defaultChecked={isAutomaticCalculationEnabled}
                    setChecked={setIsAutomaticCalculationEnabled}
                />
                <ModalRowWrapper>
                    <ModalInput
                        themeState={themeState}
                        labelText={translations[language].modals.addAsset.price}
                        inputType="number"
                        name="price"
                        defaultValue={defaultData?.price || (isAutomaticCalculationEnabled ? assetsPrices : undefined)}
                        disabled={disableField || isAutomaticCalculationEnabled}
                        invalidInput={isInputInvalid}
                        setInvalidInput={setIsInputInvalid}
                    />
                    <ModalSelect
                        themeState={themeState}
                        labelText={translations[language].modals.addAsset.currency}
                        name="currency"
                        options={currencies.map((currency) => ({ value: currency, label: currency }))}
                        defaultValue={defaultData?.currency || currency}
                        disabled={disableField}
                        onChange={(event) => setModalCurrency(event.target.value)}
                    />
                </ModalRowWrapper>
                {exchangeRateError && (
                    <div className="text-red-500 text-sm">
                        <p>{exchangeRateError}</p>
                    </div>
                )}
                <ModalRowWrapper>
                    <ModalSelect
                        themeState={themeState}
                        labelText={translations[language].modals.addAsset.platform}
                        name="market"
                        options={platforms.map((platform) => ({ value: platform.platformName, label: platform.platformName }))}
                        defaultValue={defaultData?.market}
                    />
                    <ModalButton
                        type="button"
                        onClick={openPlatformModal}
                        themeState={themeState}>
                        {translations[language].modals.addAsset.addPlatform}
                    </ModalButton>
                </ModalRowWrapper>
                <ModalInput
                    themeState={themeState}
                    labelText={translations[language].modals.addAsset.date}
                    inputType="date"
                    name="date"
                    defaultValue={defaultData?.date || currentDate}
                    disabled={disableField}
                />
                <div className="mt-2 mb-2 flex flex-row gap-4 justify-evenly">
                    <ModalButton type="button" onClick={onClose} themeState={themeState}>{translations[language].modals.addAsset.close}</ModalButton>
                    <ModalButton
                        type="submit"
                        themeState={themeState}
                        disabled={Object.values(isInputInvalid).some(Boolean)}>
                        {currentEditStatus === "edit" ? translations[language].modals.addAsset.submitEdit : translations[language].modals.addAsset.submitAdd}
                    </ModalButton>
                </div>
            </Form>
        </ModalWrapper >
    );
}