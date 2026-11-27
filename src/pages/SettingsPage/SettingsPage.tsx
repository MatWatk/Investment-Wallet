import { useState, type SubmitEvent } from "react";
import { FirebaseError } from "firebase/app";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import PageHeader from "../../components/PageHeader";
import { translations } from "../../constants/translations";
import { useLanguage } from "../../hooks/useLanguage";
import { auth } from '../../services/firebase/config';
import InputField from "../../components/Auth_components/InputField";
import SubmitButton from "../../components/Auth_components/SubmitButton";
import useLogout from "../../hooks/useLogout";

export default function SettingsPage() {
    const language = useLanguage();
    const text = translations[language].settingsPage;

    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [message, setMessage] = useState<"success" | "mismatch" | "noUser" | "noEmail" | "invalidPassword" | "recentLogin" | "weakPassword" | "network" | "generic" | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { handleLogout } = useLogout();

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        if (isSubmitting) return;

        if (password !== confirmation) {
            setMessage("mismatch");
            return;
        }
        const user = auth.currentUser;

        if (!user) {
            setMessage("noUser");
            return;
        }
        if (!user.email) {
            setMessage("noEmail");
            return;
        }

        setMessage(null);
        setIsSubmitting(true);

        try {
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, password);

            setCurrentPassword("");
            setPassword("");
            setConfirmation("");
            setMessage("success");
            setTimeout(() => handleLogout(), 2000);
        } catch (error) {
            const code = error instanceof FirebaseError ? error.code : "Something went wrong. Please try again later.";
            setMessage(
                code === "auth/invalid-credential" || code === "auth/wrong-password" || code === "auth/user-not-found" ? "invalidPassword" :
                    code === "auth/requires-recent-login" ? "recentLogin" :
                        code === "auth/weak-password" || code === "auth/password-does-not-meet-requirements" ? "weakPassword" :
                            code === "auth/network-request-failed" ? "network" : "generic"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <PageHeader title={text.title} />
            <div className='flex flex-row gap-2'>
                <h2 className='flex text-lg'>Account name:</h2>
                <h2 className='flex text-lg font-bold'>{auth.currentUser?.email}</h2>
            </div>
            <form onSubmit={handleSubmit} className="mt-6 flex w-full max-w-sm flex-col gap-4">
                <InputField
                    id="current-password"
                    label={text.currentPassword}
                    type="password"
                    onChange={(event) => { setCurrentPassword(event.target.value); setMessage(null); }}
                />
                <InputField
                    id="new-password"
                    label={text.newPassword}
                    type="password"
                    onChange={(event) => { setPassword(event.target.value); setMessage(null); }}
                />
                <InputField
                    id="confirm-new-password"
                    label={text.confirmPassword}
                    type="password"
                    onChange={(event) => { setConfirmation(event.target.value); setMessage(null); }}
                />
                {message && (
                    <p role={message === "success" ? "status" : "alert"} className={message === "success" ? "text-green-600" : "text-red-500"}>
                        {text[message]}
                    </p>
                )}
                <SubmitButton
                    disabled={isSubmitting}
                    text={text.changePassword}
                />
            </form>
        </div>
    );
}