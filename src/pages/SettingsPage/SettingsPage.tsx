import { useState, type FormEvent } from "react";
import { FirebaseError } from "firebase/app";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import PageHeader from "../../components/PageHeader";
import { translations } from "../../constants/translations";
import { useLanguage } from "../../hooks/useLanguage";
import { useTheme } from "../../hooks/useTheme";
import { auth } from '../../services/firebase/config';

export default function SettingsPage() {
    const language = useLanguage();
    const themeState = useTheme();
    const text = translations[language].settingsPage;
    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [message, setMessage] = useState<"success" | "mismatch" | "noUser" | "noEmail" | "invalidPassword" | "recentLogin" | "weakPassword" | "network" | "generic" | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
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
    }

    const inputClass = `w-full rounded-md border-2 px-4 py-2 ${themeState ? "text-violet-900 border-violet-900" : "text-yellow-500 border-yellow-600"}`;

    return (
        <div>
            <PageHeader title={text.title} />
            <p>{auth.currentUser?.email}</p>
            <form onSubmit={handleSubmit} className="mt-6 flex w-full max-w-sm flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label htmlFor="current-password">{text.currentPassword}</label>
                    <input id="current-password" type="password" autoComplete="current-password" required
                        className={inputClass} value={currentPassword} disabled={isSubmitting}
                        onChange={(event) => { setCurrentPassword(event.target.value); setMessage(null); }} />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="new-password">{text.newPassword}</label>
                    <input id="new-password" type="password" autoComplete="new-password" required minLength={6}
                        className={inputClass} value={password} disabled={isSubmitting}
                        onChange={(event) => { setPassword(event.target.value); setMessage(null); }} />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="confirm-new-password">{text.confirmPassword}</label>
                    <input id="confirm-new-password" type="password" autoComplete="new-password" required minLength={6}
                        className={inputClass} value={confirmation} disabled={isSubmitting}
                        onChange={(event) => { setConfirmation(event.target.value); setMessage(null); }} />
                </div>
                {message && (
                    <p role={message === "success" ? "status" : "alert"} className={message === "success" ? "text-green-600" : "text-red-500"}>
                        {text[message]}
                    </p>
                )}
                <button type="submit" disabled={isSubmitting}
                    className={`rounded-md px-4 py-2 ${themeState ? "bg-violet-900 text-white hover:bg-violet-800" : "bg-yellow-600 text-black hover:bg-yellow-700"} disabled:cursor-not-allowed disabled:opacity-50`}>
                    {isSubmitting ? text.submitting : text.changePassword}
                </button>
            </form>
        </div>
    );
}