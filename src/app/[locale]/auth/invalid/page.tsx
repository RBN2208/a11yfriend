import LoginForm from "@/features/auth/components/login-form";

export default async function InvalidPage({ searchParams }: { searchParams: { message?: string } }) {
    const params = await searchParams;
    const message = params.message

    return (
        <div>
            {message === 'session_expired' && (
                <div className="info-alert">
                    Deine Sitzung ist abgelaufen. Bitte melde dich erneut an.
                </div>
            )}
            {message === 'auth_error' && (
                <div className="error-alert">
                    Es gibt einen Fehler in der Authentifizierung.
                </div>
            )}

            <LoginForm />
        </div>
    );
}