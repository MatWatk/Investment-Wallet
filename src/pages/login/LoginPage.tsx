import { Form, redirect, useActionData, useNavigation } from 'react-router-dom'
import Card from '../../components/Card'

import InputField from '../../components/Auth_components/InputField';
import SubmitButton from '../../components/Auth_components/SubmitButton';
import AuthSwitch from '../../components/Auth_components/AuthSwitch';
import AuthHeader from '../../components/Auth_components/AuthHeader';
import InputFieldsWrapper from '../../components/Auth_components/InputFieldsWrapper';

import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../constants/translations";
import login from '../../services/api/authLogin';
import { useEffect, useState } from 'react';

export default function LoginPage() {
    const language = useLanguage();
    const navigation = useNavigation();
    const [hideError, setHideError] = useState(false);
    const actionData = useActionData();

    useEffect(() => {
        setHideError(false);
    },[actionData])

    const isSubmitting = navigation.state === 'submitting';
    return (
        <Card>
            <AuthHeader title={translations[language].login.title} />

            <Form method="post" className="flex flex-col gap-4">
                <InputFieldsWrapper>
                    <InputField id="email" type="email" placeholder={translations[language].login.emailPlaceholder} />
                    <InputField id="password" type="password" placeholder={translations[language].login.passwordPlaceholder} />
                </InputFieldsWrapper>
                {actionData?.error && !hideError && (
                    <div className="text-red-500">{actionData.error}</div>
                )}
                <SubmitButton disabled={isSubmitting} text={isSubmitting ? translations[language].login.loginProcessing : translations[language].login.submitButton} />
                <AuthSwitch link="/signup" />
            </Form>
        </Card>
    )
}

export async function action({ request }: { request: Request }) {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    try{
        await login(email, password);
        return redirect('/');
    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('auth/user-not-found')) {
                return { error: 'User not found.' };
            }
            else if (error.message.includes('auth/wrong-password')) {
                return { error: 'Incorrect password.' };
            }
            else if (error.message.includes('auth/invalid-email')) {
                return { error: 'Invalid email address.' };
            }
            else if (error.message.includes('auth/network-request-failed')) {
                return { error: 'Network error. Please check your internet connection and try again.' };
            }
            else {
                return { error: 'Failed to log in. Please try again.' };
            }
        }
    }
}