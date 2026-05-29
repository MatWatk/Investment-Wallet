import { Form, Link } from 'react-router-dom'
import Card from '../../components/Card'

export default function SignupPage() {
    return (
        <Card>
            <h1 className="text-3xl font-bold text-violet-900 mb-3">
                Sign Up
            </h1>

            <Form className="flex flex-col gap-4">

                <div className="flex flex-col items-center gap-2">
                    <div className="flex flex-col items-start gap-1 w-full">
                        <label htmlFor="name" className="text-sm text-black">Name</label>
                        <input
                            id="name"
                            className="rounded-md border-2 border-violet-900 px-4 py-2 text-center focus:placeholder-transparent"
                            type="text"
                            required
                        />
                    </div>
                    <div className="flex flex-col items-start gap-1 w-full">
                        <label htmlFor="email" className="text-sm text-black">Email</label>
                        <input
                            id="email"
                            className="rounded-md border-2 border-violet-900 px-4 py-2 text-center focus:placeholder-transparent"
                            type="email"
                            required
                        />
                    </div>
                    <div className="flex flex-col items-start gap-1 w-full">
                        <label htmlFor="password" className="text-sm text-black">Password</label>
                    <input
                        id="password"
                        className="rounded-md border-2 border-violet-900 px-4 py-2 text-center focus:placeholder-transparent"
                        type="password"
                        required
                    />
                    </div>
                    <div className="flex flex-col items-start gap-1 w-full">
                    <label htmlFor="confirm-password" className="text-sm text-black">Confirm Password</label>
                    <input
                        id="confirm-password"
                        className="rounded-md border-2 border-violet-900 px-4 py-2 text-center focus:placeholder-transparent"
                        type="password"
                        required
                    />
                    </div>
                </div>

                <button className="rounded-md bg-violet-900 py-2 text-white w-[70%] m-auto text-center">
                    Sign Up
                </button>
                <p className="text-sm text-black flex justify-center">
                    Already have an account?
                </p>
                <Link className="text-violet-900 flex justify-center" to="/login">
                    <strong>Login</strong>
                </Link>
            </Form>
        </Card>
    )
}