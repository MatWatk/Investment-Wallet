export default function loginAction({request, params}: {request: Request, params: Record<string, string | undefined>}) {
    request.formData().then((formData) => {
        const email = formData.get('email')
        const password = formData.get('password')
    })
}