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
import ModalButton from "./Modals/ModalButton";
import { auth } from "../services/firebase/config";

export default function AddDepositModal({
    defaultData,
    onClose,
    currency,
    disableField,
    platforms,
}: {
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
            <ModalHeader title={defaultData ? translations[language].modals.addDeposit.titleEdit : translations[language].modals.addDeposit.titleAdd} themeState={themeState} />
            <Form method="post" onSubmit={onClose} className="mt-4 flex flex-col gap-4">
                <ModalRowWrapper>
                    <input type="hidden" name="editStatus" value={defaultData ? "edit" : "add"} />
                    <input type="hidden" name="actionRequestType" value={defaultData ? "edit" : "add"} />
                    <input type="hidden" name="loggedUser" value={auth.currentUser?.email || ""} />
                    <ModalInput
                        themeState={themeState}
                        labelText={translations[language].modals.addDeposit.amount}
                        inputType="number"
                        name="amount"
                        defaultValue={defaultData?.amount}
                        invalidInput={isInputInvalid}
                        setInvalidInput={setIsInputInvalid}
                    />
                    <ModalSelect
                        themeState={themeState}
                        labelText={translations[language].modals.addDeposit.currency}
                        name="currency"
                        options={currencies.map((currency) => ({ value: currency, label: currency }))}
                        defaultValue={defaultData?.currency || currency}
                        disabled={disableField}
                        onChange={(event) => setModalCurrency(event.target.value)}
                    />
                </ModalRowWrapper>
                <ModalSelect
                    themeState={themeState}
                    labelText={translations[language].modals.addDeposit.platform}
                    name="platform"
                    options={platforms.map((platform) => ({ value: platform.platformName, label: platform.platformName }))}
                    defaultValue={defaultData?.market}
                />
                <ModalInput
                    themeState={themeState}
                    labelText={translations[language].modals.addDeposit.date}
                    inputType="date"
                    name="date"
                    defaultValue={defaultData?.date || currentDate}
                />
                <div className="mt-2 mb-2 flex flex-row gap-4 justify-evenly">
                    <ModalButton type="button" onClick={onClose} themeState={themeState}>{translations[language].modals.addDeposit.close}</ModalButton>
                    <ModalButton
                        id='submit-add-asset-modal'
                        type="submit"
                        themeState={themeState}
                        disabled={Object.values(isInputInvalid).some(Boolean)}>
                        {defaultData ? translations[language].modals.addDeposit.editSubmit : translations[language].modals.addDeposit.addSubmit}
                    </ModalButton>
                </div>
            </Form>
        </ModalWrapper>
    )
}