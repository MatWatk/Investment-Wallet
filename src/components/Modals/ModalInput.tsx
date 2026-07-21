import { useMemo, type Dispatch, type SetStateAction } from "react";
import type { WalletTab } from "../../types/WalletTypes";
import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../constants/translations";

export default function ModalInput({
    themeState,
    labelText,
    inputType = "text",
    defaultValue,
    name, 
    disabled,
    invalidInput,
    setInvalidInput,
    existingPlatforms,
    onChange,
    }: {
        themeState: boolean,
        labelText: string,
        inputType?: "text" | "number" | "date",
        defaultValue?: string | number,
        name: string,
        disabled?: boolean,
        invalidInput?: Record<string, boolean>,
        setInvalidInput?: Dispatch<SetStateAction<Record<string, boolean>>>,
        existingPlatforms?: WalletTab[],
        onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    }) {
        const language = useLanguage();
        const existingPlatformNames = useMemo(() => {
            return existingPlatforms?.map(platform => platform.platformName.toLowerCase()) ?? [];
        }, [existingPlatforms]);


        const handleChange = (value: string, hasBadInput: boolean) => {
            if (!setInvalidInput) {
                return;
            }
            if (inputType === "number" && (hasBadInput || value === "" || Number(value) <= 0)) {
                setInvalidInput((currentState) => ({
                    ...currentState,
                    [name]: true,
                }));
            }
            if (inputType === "text" && name === "platformName"){
                setInvalidInput((currentState) => ({
                    ...currentState,
                    [name]: existingPlatformNames.includes(value.toLowerCase()),
                }));
            }
            if (inputType === "number" && !hasBadInput && value !== "" && Number(value) > 0) {
                setInvalidInput((currentState) => ({
                    ...currentState,
                    [name]: false,
                }));
            }
        };

    return (
        <div className="flex flex-col gap-1 min-w-68">
            <label className={`text-sm ${themeState ? "text-violet-900" : "text-yellow-500"}`}>{labelText}</label>
            <input
                key={defaultValue}
                required
                name={name}
                type={inputType}
                defaultValue={defaultValue}
                step={inputType === "number" ? "any" : undefined}
                disabled={disabled}
                onInput={(event) => handleChange(event.currentTarget.value, event.currentTarget.validity.badInput)}
                onChange={onChange}
                className={`w-full rounded-md border ${themeState ? "border-gray-300 bg-white text-gray-900 focus:ring-violet-500" : "border-gray-600 bg-gray-800 text-gray-100 focus:ring-yellow-500"} px-3 py-2 focus:outline-none focus:ring-2 ${disabled ? "opacity-30 cursor-not-allowed" : ""} ${invalidInput?.[name] && !disabled ? "border-red-500" : ""}`}
            />
            {invalidInput?.[name] && inputType === "number" && !disabled &&<span className="text-red-500 text-sm">{translations[language].modals.inputErrors.amountPositive}</span>}
            {invalidInput?.[name] && name === "platformName" && <span className="text-red-500 text-sm">{translations[language].modals.inputErrors.platformExists}</span>}
        </div>
    )
}