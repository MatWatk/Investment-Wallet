import { Form } from 'react-router-dom'
import Card from '../../components/Card'

import InputField from '../../components/Auth_components/InputField';
import SubmitButton from '../../components/Auth_components/SubmitButton';
import AuthSwitch from '../../components/Auth_components/AuthSwitch';
import AuthHeader from '../../components/Auth_components/AuthHeader';
import InputFieldsWrapper from '../../components/Auth_components/InputFieldsWrapper';

import { useLanguage } from "../../hooks/useLanguage";
import { translations } from "../../constants/translations";

export default function LoginPage() {
    const language = useLanguage();
    return (
        <Card>
            <AuthHeader title={translations[language].login.title} />

            <Form className="flex flex-col gap-4">
                <InputFieldsWrapper>
                    <InputField id="email" type="email" placeholder={translations[language].login.emailPlaceholder} />
                    <InputField id="password" type="password" placeholder={translations[language].login.passwordPlaceholder} />
                </InputFieldsWrapper>
                <SubmitButton text={translations[language].login.submitButton} />
                <AuthSwitch link="/signup" />
            </Form>
        </Card>
    )
}