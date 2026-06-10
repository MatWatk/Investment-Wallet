import { Link } from "react-router-dom";
import type { AuthSwitchProps } from "../../types/AuthTypes";

export default function AuthSwitch({ link }: AuthSwitchProps) {
    return (
        <>
            <p className="text-sm text-black flex justify-center">
                {link === "/signup" ? "Don't have an account?" : "Already have an account?"}
            </p>
            <Link className="text-violet-900 flex justify-center" to={link}>
                <strong>{link === "/signup" ? "Register" : "Login"}</strong>
            </Link>
        </>

    )
}