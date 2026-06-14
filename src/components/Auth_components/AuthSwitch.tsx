import { Link } from "react-router-dom";
import type { AuthSwitchProps } from "../../types/AuthTypes";

import { useSelector } from "react-redux";
import { translations } from "../../constants/translations";

export default function AuthSwitch({ link }: AuthSwitchProps) {
    const language = useSelector((state: { language: { language: keyof typeof translations } }) => state.language.language);
    return (
        <>
            <p className="text-sm  flex justify-center">
                {link === "/signup" ? translations[language].login.dontHaveAccount : translations[language].signup.alreadyHaveAccount}
            </p>
            <Link className="flex justify-center" to={link}>
                <strong>{link === "/signup" ? translations[language].login.register : translations[language].signup.login}</strong>
            </Link>
        </>

    )
}