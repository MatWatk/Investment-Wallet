import { Form, redirect, useActionData, useNavigation } from 'react-router-dom'
import Card from '../components/Card'

import AuthHeader from '../components/Auth_components/AuthHeader';
import InputFieldsWrapper from '../components/Auth_components/InputFieldsWrapper';
import InputField from '../components/Auth_components/InputField';
import SubmitButton from '../components/Auth_components/SubmitButton';
import AuthSwitch from '../components/Auth_components/AuthSwitch';

import { useLanguage } from "../hooks/useLanguage";
import { translations } from "../constants/translations";
import { useEffect, useState } from 'react';
import authSingup from '../services/api/authSingup';

export default function SignupPage() {
    const language = useLanguage();
    const [providedValue, setProvidedValue] = useState<string>('');
    const [confirmedValue, setConfirmedValue] = useState<string>('');
    const actionData = useActionData() as { errorKey?: "emailInUse" | "invalidEmail" | "weakPassword" | "network" | "generic" } | undefined;
    const navigation = useNavigation();

    const [hideError, setHideError] = useState(false);

        useEffect(() => {
        setHideError(false);
    }, [actionData])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        setHideError(true);
        if (id === "password") {
            setProvidedValue(e.target.value);
        } else if (id === "confirm-password") {
            setConfirmedValue(e.target.value);
        }
    }

    const isSubmitting = navigation.state === 'submitting';

    const valuesDoesntMatch = providedValue !== confirmedValue && providedValue !== '' && confirmedValue !== '';
    const backendErrorVisible = actionData?.errorKey && !hideError;

    const signupErrorMessage =
        actionData?.errorKey === "emailInUse"
            ? translations[language].signup.emailInUseError
            : actionData?.errorKey === "invalidEmail"
                ? translations[language].signup.invalidEmailError
                : actionData?.errorKey === "weakPassword"
                    ? translations[language].signup.weakPasswordError
                    : actionData?.errorKey === "network"
                        ? translations[language].signup.networkError
                        : actionData?.errorKey === "generic"
                            ? translations[language].signup.genericError
                            : "";

    return (
        <Card>
            <AuthHeader title={translations[language].signup.title} />

            <Form method="post" className="flex w-full flex-col items-center gap-4">

                <InputFieldsWrapper>
                    <InputField id="email" type="email" label={translations[language].signup.emailPlaceholder} />
                    <InputField onChange={(e) => handleInputChange(e, "password")} id="password" type="password" label={translations[language].signup.passwordPlaceholder} />
                    <InputField onChange={(e) => handleInputChange(e, "confirm-password")} id="confirm-password" type="password" label={translations[language].signup.confirmPasswordPlaceholder} />
                    {(valuesDoesntMatch || backendErrorVisible) && 
                    <div className="flex min-h-10 w-full max-w-sm items-center justify-center px-1">
                        <div className="w-3/4 text-center">
                            {valuesDoesntMatch && <p className="wrap-break-word text-sm leading-5 text-red-500">{translations[language].signup.valuesDoNotMatch}</p>}
                            {backendErrorVisible && <p className="wrap-break-word text-sm leading-5 text-red-500">{signupErrorMessage}</p>}
                        </div>
                    </div>}
                </InputFieldsWrapper>

                <SubmitButton disabled={valuesDoesntMatch || isSubmitting} text={isSubmitting ? translations[language].signup.submittingText : translations[language].signup.submitButton} />
                <AuthSwitch link="/login" />

            </Form>
        </Card>
    )
}

export async function action({ request }: { request: Request }) {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    try {
        await authSingup(email, password);
        return redirect('/login');
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('auth/email-already-in-use')) {
                return { errorKey: 'emailInUse' };
            }
            else if (error.message.includes('auth/invalid-email')) {
                return { errorKey: 'invalidEmail' };
            }
            else if (error.message.includes('auth/weak-password')) {
                return { errorKey: 'weakPassword' };
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