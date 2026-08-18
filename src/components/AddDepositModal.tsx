import { Form } from "react-router-dom";
import ModalHeader from "./Modals/ModalHeader";
import ModalWrapper from "./Modals/ModalWrapper";
import ModalRowWrapper from "./Modals/ModalRowWrapper";
import ModalInput from "./Modals/ModalInput";
import ModalSelect from "./Modals/ModalSelect";
import { useTheme } from "../hooks/useTheme";
import { useLanguage } from "../hooks/useLanguage";
import { translations } from "../constants/translations";
import useInputField from "../hooks/useInputField";
import { currencies } from "../constants/assets";
import type { WalletTab } from "../types/WalletTypes";

export default function AddDepositModal({
    currentEditStatus,
    defaultData,
    onClose,
    currency,
    disableField,
    platforms,
}: {
    currentEditStatus: "add" | "edit",
    defaultData?: { amount: number, currency: string, market: string, date: string },
    onClose?: () => void,
    currency?: string,
    disableField?: boolean,
    setModalCurrency?: (currency: string) => void,
    platforms: WalletTab[],
}) {

    const themeState = useTheme();
    const language = useLanguage();

    const {
        isInputInvalid,
        setIsInputInvalid,
        setModalCurrency,
        currentDate,
    } = useInputField();

    return (
        <ModalWrapper>
            <ModalHeader title={currentEditStatus === "edit" ? translations[language].modals.addAsset.titleEdit : translations[language].modals.addAsset.titleAdd} themeState={themeState} />
            <Form method="post" onSubmit={onClose} className="mt-4 flex flex-col gap-4">
                <ModalRowWrapper>
                    <ModalInput
                        themeState={themeState}
                        labelText={translations[language].modals.addAsset.amount}
                        inputType="number"
                        name="amount"
                        defaultValue={defaultData?.amount}
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
                <ModalSelect
                    themeState={themeState}
                    labelText={translations[language].modals.addAsset.platform}
                    name="market"
                    options={platforms.map((platform) => ({ value: platform.platformName, label: platform.platformName }))}
                    defaultValue={defaultData?.market}
                />
                <ModalInput
                    themeState={themeState}
                    labelText={translations[language].modals.addAsset.date}
                    inputType="date"
                    name="date"
                    defaultValue={defaultData?.date || currentDate}
                />

            </Form>
        </ModalWrapper>
    )
}