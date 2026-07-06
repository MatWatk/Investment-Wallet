import type { InputFieldProps } from "../../types/AuthTypes";
import { useTheme } from "../../hooks/useTheme";

export default function InputField({ id, type, placeholder, label, onChange }: InputFieldProps) {
    const themeState = useTheme();

    return (
        <div className="flex min-w-60 flex-col items-center gap-1">
        {label && <label htmlFor={id} className="text-center text-sm">{label}</label>}
        <input
            id={id}
            name={id}
            className={`w-full max-w-sm rounded-md border-2 px-4 py-2 text-center focus:placeholder-transparent ${themeState ? "text-violet-900 border-violet-900 placeholder-violet-900" : "text-yellow-600 border-yellow-600 placeholder-yellow-600"}`}
            type={type}
            placeholder={label ? "" : placeholder}
            required
            onChange={onChange}
        />
        </div>
    );
}