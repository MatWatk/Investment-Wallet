import type { Dispatch, SetStateAction } from "react";

export default function ModalInput({
    themeState,
    labelText,
    inputType = "text",
    defaultValue,
    name, disabled,
    invalidInput,
    setInvalidInput,
    }: {
        themeState: boolean,
        labelText: string,
        inputType?: "text" | "number" | "date",
        defaultValue?: string | number,
        name: string,
        disabled?: boolean,
        invalidInput?: Record<string, boolean>,
        setInvalidInput?: Dispatch<SetStateAction<Record<string, boolean>>>,
    }) {

        const handleChange = (value: string, hasBadInput: boolean) => {
            if (!setInvalidInput) {
                return;
            }

            setInvalidInput((currentState) => ({
                ...currentState,
                [name]: inputType === "number" && (hasBadInput || value === "" || Number(value) <= 0),
            }));
        };

    return (
        <div className="flex flex-col gap-1 min-w-68">
            <label className={`text-sm ${themeState ? "text-violet-900" : "text-yellow-500"}`}>{labelText}</label>
            <input
                required
                name={name}
                type={inputType}
                defaultValue={defaultValue}
                step={inputType === "number" ? "any" : undefined}
                disabled={disabled}
                onInput={(event) => handleChange(event.currentTarget.value, event.currentTarget.validity.badInput)}
                className={`w-full rounded-md border ${themeState ? "border-gray-300 bg-white text-gray-900 focus:ring-violet-500" : "border-gray-600 bg-gray-800 text-gray-100 focus:ring-yellow-500"} px-3 py-2 focus:outline-none focus:ring-2 ${disabled ? "opacity-30 cursor-not-allowed" : ""} ${invalidInput?.[name] ? "border-red-500" : ""}`}
            />
            {invalidInput?.[name] && <span className="text-red-500 text-sm">Amount must be greater than 0</span>}
        </div>
    )
}