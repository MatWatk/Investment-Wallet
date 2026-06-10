import { Form } from 'react-router-dom'
import Card from '../../components/Card'

import AuthHeader from '../../components/Auth_components/AuthHeader';
import InputFieldsWrapper from '../../components/Auth_components/InputFieldsWrapper';
import InputField from '../../components/Auth_components/InputField';
import SubmitButton from '../../components/Auth_components/SubmitButton';
import AuthSwitch from '../../components/Auth_components/AuthSwitch';

export default function SignupPage() {
    return (
        <Card>
            <AuthHeader title="Sign Up" />

            <Form className="flex flex-col gap-4">

                <InputFieldsWrapper>
                    <InputField id="name" type="text" placeholder="Name" label="Name" />
                    <InputField id="email" type="email" placeholder="Email" label="Email" />
                    <InputField id="password" type="password" placeholder="Password" label="Password" />
                    <InputField id="confirm-password" type="password" placeholder="Confirm Password" label="Confirm Password" />
                </InputFieldsWrapper>

                <SubmitButton text="Sign Up" />
                <AuthSwitch link="/login" />
                
            </Form>
        </Card>
    )
}