export type InputType = "email" | "password" | "text";

export interface InputFieldProps {
    id: string;
    type: InputType;
    placeholder?: string;
    label?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface AuthSwitchProps {
    link: "/signup" | "/login";
}