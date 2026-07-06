import { Form, redirect, useActionData } from 'react-router-dom'
import Card from '../../components/Card'

import AuthHeader from '../../components/Auth_components/AuthHeader';
import InputFieldsWrapper from '../../components/Auth_components/InputFieldsWrapper';
import InputField from '../../components/Auth_components/InputField';
import SubmitButton from '../../components/Auth_components/SubmitButton';
import AuthSwitch from '../../components/Auth_components/AuthSwitch';

import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../constants/translations";
import { useEffect, useState } from 'react';
import authSingup from '../../services/api/authSingup';

export default function SignupPage() {
    const language = useLanguage();
    const [providedValue, setProvidedValue] = useState<string>('');
    const [confirmedValue, setConfirmedValue] = useState<string>('');
    const actionData = useActionData();

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

    const valuesDoesntMatch = providedValue !== confirmedValue && providedValue !== '' && confirmedValue !== '';
    const backendErrorVisible = actionData?.error && !hideError;
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
                            {valuesDoesntMatch && <p className="wrap-break-word text-sm leading-5 text-red-500">Values do not match</p>}
                            {backendErrorVisible && <p className="wrap-break-word text-sm leading-5 text-red-500">{actionData.error}</p>}
                        </div>
                    </div>}
                </InputFieldsWrapper>

                <SubmitButton disabled={valuesDoesntMatch} text={translations[language].signup.submitButton} />
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
                return { error: 'Email already in use. Please use a different email.' };
            }
            else if (error.message.includes('auth/invalid-email')) {
                return { error: 'Invalid email address. Please enter a valid email.' };
            }
            else if (error.message.includes('auth/weak-password')) {
                return { error: 'Weak password. Please use a stronger password with at least 6 characters.' };
            }
            else if (error.message.includes('auth/network-request-failed')) {
                return { error: 'Network error. Please check your internet connection and try again.' };
            }
            else {
            return { error: 'Failed to sign up. Please try again.' };
            }
        }
    }
}