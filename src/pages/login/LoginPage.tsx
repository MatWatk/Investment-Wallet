import { Form } from 'react-router-dom'
import Card from '../../components/Card'

import InputField from '../../components/Auth_components/InputField';
import SubmitButton from '../../components/Auth_components/SubmitButton';
import AuthSwitch from '../../components/Auth_components/AuthSwitch';
import AuthHeader from '../../components/Auth_components/AuthHeader';
import InputFieldsWrapper from '../../components/Auth_components/InputFieldsWrapper';

export default function LoginPage() {
    return (
        <Card>
            <AuthHeader title="Login" />

            <Form className="flex flex-col gap-4">
                <InputFieldsWrapper>
                    <InputField id="email" type="email" placeholder="Email address" />
                    <InputField id="password" type="password" placeholder="Password" />
                </InputFieldsWrapper>
                <SubmitButton text="Login" />
                <AuthSwitch link="/signup" />
            </Form>
        </Card>
    )
}