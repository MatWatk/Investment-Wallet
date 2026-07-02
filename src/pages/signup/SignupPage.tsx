import { Form, redirect, useActionData } from 'react-router-dom'
import Card from '../../components/Card'

import AuthHeader from '../../components/Auth_components/AuthHeader';
import InputFieldsWrapper from '../../components/Auth_components/InputFieldsWrapper';
import InputField from '../../components/Auth_components/InputField';
import SubmitButton from '../../components/Auth_components/SubmitButton';
import AuthSwitch from '../../components/Auth_components/AuthSwitch';

import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../constants/translations";
import { useState } from 'react';
import authSingup from '../../services/api/authSingup';

export default function SignupPage() {
    const language = useLanguage();
    const [providedValue, setProvidedValue] = useState<string | null>(null);
    const [confirmedValue, setConfirmedValue] = useState<string | null>(null);
    const actionData = useActionData() as { error?: string } | null;

    const valuesDoesntMatch = providedValue !== confirmedValue && (providedValue !== null && confirmedValue !== null);

    return (
        <Card>
            <AuthHeader title={translations[language].signup.title} />

            <Form method="post" className="flex w-full flex-col items-center gap-4">

                <InputFieldsWrapper>
                    <InputField id="email" type="email" label={translations[language].signup.emailPlaceholder} />
                    <InputField onChange={(e) => setProvidedValue(e.target.value)} id="password" type="password" label={translations[language].signup.passwordPlaceholder} />
                    <InputField onChange={(e) => setConfirmedValue(e.target.value)} id="confirm-password" type="password" label={translations[language].signup.confirmPasswordPlaceholder} />
                    <div className="flex min-h-10 w-full max-w-sm items-center justify-center px-1">
                        <div className="w-full text-center">
                            {valuesDoesntMatch && <p className="wrap-break-word text-sm leading-5 text-red-500">Values do not match</p>}
                            {actionData?.error && <p className="wrap-break-word text-sm leading-5 text-red-500">{actionData.error}</p>}
                        </div>
                    </div>
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
        console.error('Error signing up:', error);
        return { error: `Failed to sign up. Please try again. ${error}` };//TODO handle error
    }
}