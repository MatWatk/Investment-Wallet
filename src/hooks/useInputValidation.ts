import { useState } from "react";

export default function useInputValidation() {
    const [isInputInvalid, setIsInputInvalid] = useState(false);

    const handleChange = (value: number) => {
        if (typeof value === "number" && value <= 0) {
            setIsInputInvalid(true);
        } else {
            setIsInputInvalid(false);
        }
    }

    return { isInputInvalid, setIsInputInvalid, handleChange };
}
