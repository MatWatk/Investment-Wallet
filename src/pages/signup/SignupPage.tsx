import { Form } from 'react-router-dom'
import Card from '../../components/Card'

import AuthHeader from '../../components/Auth_components/AuthHeader';
import InputFieldsWrapper from '../../components/Auth_components/InputFieldsWrapper';
import InputField from '../../components/Auth_components/InputField';
import SubmitButton from '../../components/Auth_components/SubmitButton';
import AuthSwitch from '../../components/Auth_components/AuthSwitch';

import { useSelector } from 'react-redux';
import { translations } from '../../constants/translations';

export default function SignupPage() {
    const language = useSelector((state: { language: { language: keyof typeof translations } }) => state.language.language);
    return (
        <Card>
            <AuthHeader title={translations[language].signup.title} />

            <Form className="flex flex-col gap-4">

                <InputFieldsWrapper>
                    <InputField id="email" type="email" label={translations[language].signup.emailPlaceholder} />
                    <InputField id="email-confirm" type="email" label={translations[language].signup.confirmEmailPlaceholder} />
                    <InputField id="password" type="password" label={translations[language].signup.passwordPlaceholder} />
                    <InputField id="confirm-password" type="password" label={translations[language].signup.confirmPasswordPlaceholder} />
                </InputFieldsWrapper>

                <SubmitButton text={translations[language].signup.submitButton} />
                <AuthSwitch link="/login" />
                
            </Form>
        </Card>
    )
}