import { Form, Link } from 'react-router-dom'
import Card from '../../components/Card'

export default function LoginPage() {
    return (
        <Card>
            <h1 className="text-3xl font-bold text-violet-900 mb-3">
                Login
            </h1>

            <Form className="flex flex-col gap-4">

                <div className="flex flex-col items-center gap-4">
                    <input
                        id="email"
                        className="rounded-md border-2 border-violet-900 px-4 py-2 text-center focus:placeholder-transparent"
                        type="email"
                        placeholder="Email address"
                        required
                    />
                    <input
                        id="password"
                        className="rounded-md border-2 border-violet-900 px-4 py-2 text-center focus:placeholder-transparent"
                        type="password"
                        placeholder="Password"
                        required
                    />
                </div>

                <button className="rounded-md bg-violet-900 py-2 text-white w-[70%] m-auto text-center">
                    Login
                </button>
                <p className="text-sm text-black flex justify-center">
                    Don't have an account?
                </p>
                <Link className="text-violet-900 flex justify-center" to="/signup">
                    <strong>Register</strong>
                </Link>
            </Form>
        </Card>
    )
}