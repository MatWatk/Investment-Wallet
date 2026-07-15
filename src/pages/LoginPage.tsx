import { Form, redirect, useActionData, useNavigation } from 'react-router-dom'
import Card from '../components/Card'

import InputField from '../components/Auth_components/InputField';
import SubmitButton from '../components/Auth_components/SubmitButton';
import AuthSwitch from '../components/Auth_components/AuthSwitch';
import AuthHeader from '../components/Auth_components/AuthHeader';
import InputFieldsWrapper from '../components/Auth_components/InputFieldsWrapper';

import { useLanguage } from "../hooks/useLanguage";
import { translations } from "../constants/translations";
import login from '../services/api/authLogin';
import { useEffect, useState } from 'react';
import { auth } from '../services/firebase/config';

export default function LoginPage() {
    const language = useLanguage();
    const navigation = useNavigation();
    const [hideError, setHideError] = useState(false);
    const actionData = useActionData() as { errorKey?: "invalidCredentials" | "network" | "generic" } | undefined;

    useEffect(() => {
        setHideError(false);
    }, [actionData])

    const isSubmitting = navigation.state === 'submitting';
    const idleState = navigation.state === 'idle';

    const loginErrorMessage =
        actionData?.errorKey === "invalidCredentials"
            ? translations[language].login.invalidCredentialsError
            : actionData?.errorKey === "network"
                ? translations[language].login.networkError
                : actionData?.errorKey === "generic"
                    ? translations[language].login.genericError
                    : "";

    return (
        <Card>
            <AuthHeader title={translations[language].login.title} />

            <Form method="post" className="flex flex-col gap-4">
                <InputFieldsWrapper>
                    <InputField onChange={() => setHideError(true)} id="email" type="email" placeholder={translations[language].login.emailPlaceholder} />
                    <InputField onChange={() => setHideError(true)} id="password" type="password" placeholder={translations[language].login.passwordPlaceholder} />
                </InputFieldsWrapper>
                {actionData?.errorKey && !hideError && idleState && (
                    <div className="flex justify-center text-red-500">{loginErrorMessage}</div>
                )}

                {auth.currentUser && (
                    <div className="text-center text-sm text-green-600">
                        {translations[language].login.successMessage}
                    </div>
                )}
                <SubmitButton disabled={isSubmitting || !!auth.currentUser} text={isSubmitting ? translations[language].login.loginProcessing : translations[language].login.submitButton} />
                <AuthSwitch link="/signup" />
            </Form>
        </Card>
    )
}

export async function action({ request }: { request: Request }) {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    try {
        await login(email, password);
        return redirect('/');
    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('auth/invalid-credential')) {
                return { errorKey: 'invalidCredentials' };
            }
            else if (error.message.includes('auth/network-request-failed')) {
                return { errorKey: 'network' };
            }
            else {
                return { errorKey: 'generic' };
            }
        }
        throw error;
    }
}