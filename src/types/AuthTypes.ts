export type InputType = "email" | "password" | "text";

export interface InputFieldProps {
    id: string;
    type: InputType;
    placeholder: string;
    label?: string;
}

export interface AuthSwitchProps {
    link: "/signup" | "/login";
}