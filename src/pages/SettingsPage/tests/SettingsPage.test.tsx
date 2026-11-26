import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FirebaseError } from "firebase/app";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { Provider } from "react-redux";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { store } from "../../../store";
import SettingsPage from "../SettingsPage";

const { auth } = vi.hoisted(() => ({
    auth: { currentUser: { email: "test@example.com" } as { email: string | null } | null },
}));

vi.mock("../../../services/firebase/config", () => ({ auth }));
vi.mock("firebase/auth", async (importOriginal) => ({
    ...await importOriginal<typeof import("firebase/auth")>(),
    reauthenticateWithCredential: vi.fn(),
    updatePassword: vi.fn(),
}));

describe("SettingsPage password change", () => {
    beforeEach(() => {
        vi.resetAllMocks();
        auth.currentUser = { email: "test@example.com" };
    });

    function renderPage() {
        render(<Provider store={store}><SettingsPage /></Provider>);
    }

    async function fillPasswords(password: string, confirmation: string) {
        const user = userEvent.setup();
        await user.type(screen.getByLabelText(/^current password$/i), "oldpassword");
        await user.type(screen.getByLabelText(/^new password$/i), password);
        await user.type(screen.getByLabelText(/confirm new password/i), confirmation);
        await user.click(screen.getByRole("button", { name: /^change password$/i }));
    }

    test("updates the current user's password and clears the fields on success", async () => {
        vi.mocked(updatePassword).mockResolvedValue(undefined);
        renderPage();
        await fillPasswords("newpassword", "newpassword");

        expect(reauthenticateWithCredential).toHaveBeenCalledWith(
            auth.currentUser,
            EmailAuthProvider.credential("test@example.com", "oldpassword")
        );
        expect(updatePassword).toHaveBeenCalledWith(auth.currentUser, "newpassword");
        expect(vi.mocked(reauthenticateWithCredential).mock.invocationCallOrder[0])
            .toBeLessThan(vi.mocked(updatePassword).mock.invocationCallOrder[0]);
        expect(await screen.findByRole("status")).toHaveTextContent(/password changed successfully/i);
        expect(screen.getByLabelText(/^current password$/i)).toHaveValue("");
        expect(screen.getByLabelText(/^new password$/i)).toHaveValue("");
        expect(screen.getByLabelText(/confirm new password/i)).toHaveValue("");
    });

    test("does not submit mismatched passwords", async () => {
        renderPage();
        await fillPasswords("newpassword", "differentpassword");

        expect(updatePassword).not.toHaveBeenCalled();
        expect(screen.getByRole("alert")).toHaveTextContent(/passwords do not match/i);
    });

    test("requires a logged-in user", async () => {
        auth.currentUser = null;
        renderPage();
        await fillPasswords("newpassword", "newpassword");

        expect(updatePassword).not.toHaveBeenCalled();
        expect(reauthenticateWithCredential).not.toHaveBeenCalled();
        expect(screen.getByRole("alert")).toHaveTextContent(/must be logged in/i);
    });

    test("requires an email address for reauthentication", async () => {
        auth.currentUser = { email: null };
        renderPage();
        await fillPasswords("newpassword", "newpassword");

        expect(reauthenticateWithCredential).not.toHaveBeenCalled();
        expect(updatePassword).not.toHaveBeenCalled();
        expect(screen.getByRole("alert")).toHaveTextContent(/email address is required/i);
    });

    test.each(["auth/invalid-credential", "auth/wrong-password", "auth/user-not-found"])(
        "does not change the password if reauthentication fails with %s", async (code) => {
            vi.mocked(reauthenticateWithCredential).mockRejectedValue(new FirebaseError(code, "error"));
            renderPage();
            await fillPasswords("newpassword", "newpassword");

            expect(await screen.findByRole("alert")).toHaveTextContent(/current password is incorrect/i);
            expect(updatePassword).not.toHaveBeenCalled();
        }
    );

    test("reports a network error during reauthentication without updating the password", async () => {
        vi.mocked(reauthenticateWithCredential).mockRejectedValue(new FirebaseError("auth/network-request-failed", "error"));
        renderPage();
        await fillPasswords("newpassword", "newpassword");

        expect(await screen.findByRole("alert")).toHaveTextContent(/network error/i);
        expect(updatePassword).not.toHaveBeenCalled();
    });

    test("waits for reauthentication before attempting the password change", async () => {
        let rejectAuthentication: (reason: Error) => void = () => {};
        vi.mocked(reauthenticateWithCredential).mockReturnValue(new Promise((_, reject) => {
            rejectAuthentication = reject;
        }));
        renderPage();
        await fillPasswords("newpassword", "newpassword");

        expect(updatePassword).not.toHaveBeenCalled();
        expect(screen.getByRole("button", { name: /changing password/i })).toBeDisabled();
        rejectAuthentication(new FirebaseError("auth/invalid-credential", "error"));
        expect(await screen.findByRole("alert")).toHaveTextContent(/current password is incorrect/i);
        expect(updatePassword).not.toHaveBeenCalled();
    });

    test.each([
        ["auth/requires-recent-login", /verification expired/i],
        ["auth/weak-password", /password does not meet/i],
        ["auth/password-does-not-meet-requirements", /password does not meet/i],
        ["auth/network-request-failed", /network error/i],
        ["auth/unknown", /failed to change password/i],
    ])("displays Firebase error %s without reporting success", async (code, expected) => {
        vi.mocked(updatePassword).mockRejectedValue(new FirebaseError(code, "error"));
        renderPage();
        await fillPasswords("newpassword", "newpassword");

        expect(await screen.findByRole("alert")).toHaveTextContent(expected);
        expect(screen.queryByRole("status")).not.toBeInTheDocument();
        expect(screen.getByLabelText(/^new password$/i)).toHaveValue("newpassword");
    });

    test("prevents resubmission while Firebase is processing", async () => {
        let resolveUpdate: () => void = () => {};
        vi.mocked(updatePassword).mockReturnValue(new Promise<void>((resolve) => { resolveUpdate = resolve; }));
        renderPage();
        await fillPasswords("newpassword", "newpassword");

        expect(screen.getByRole("button", { name: /changing password/i })).toBeDisabled();
        expect(screen.getByLabelText(/^current password$/i)).toBeDisabled();
        expect(screen.getByLabelText(/^new password$/i)).toBeDisabled();
        resolveUpdate();
        expect(await screen.findByRole("status")).toHaveTextContent(/password changed successfully/i);
        expect(updatePassword).toHaveBeenCalledTimes(1);
    });
});
