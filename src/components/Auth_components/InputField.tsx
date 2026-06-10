import type { InputFieldProps } from "../../types/AuthTypes";

export default function InputField({ id, type, placeholder, label }: InputFieldProps) {
    return (
        <div className="flex flex-col items-start gap-1 w-full">
        {label && <label htmlFor={id} className="text-sm text-black">{label}</label>}
        <input
            id={id}
            className="rounded-md border-2 border-violet-900 px-4 py-2 text-center focus:placeholder-transparent"
            type={type}
            placeholder={label ? "" : placeholder}
            required
        />
        </div>
    );
}