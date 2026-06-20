import type { InputFieldProps } from "../../types/AuthTypes";
import { useTheme } from "../../hooks/useTheme";

export default function InputField({ id, type, placeholder, label }: InputFieldProps) {
    const themeState = useTheme();

    return (
        <div className="flex flex-col items-start gap-1 w-full">
        {label && <label htmlFor={id} className="text-sm">{label}</label>}
        <input
            id={id}
            className={`rounded-md border-2 px-4 py-2 text-center focus:placeholder-transparent ${themeState ? "text-violet-900 border-violet-900 placeholder-violet-900" : "text-yellow-600 border-yellow-600 placeholder-yellow-600"}`}
            type={type}
            placeholder={label ? "" : placeholder}
            required
        />
        </div>
    );
}