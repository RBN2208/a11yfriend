import LoginForm from "@/features/auth/components/login-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/shadcn-components/ui/card";
import { getTranslations } from "next-intl/server";

export default async function InvalidPage({ searchParams }: { searchParams: Promise<{ message?: string }> }) {
    const params = await searchParams;
    const message = params.message

    const t = await getTranslations();

    return (
        <main className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4">
            <Card>
                <div>
                    <CardHeader>
                        <CardTitle>
                            {t(`error.${message}`)}
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <LoginForm />
                    </CardContent>
                </div>
            </Card>
        </main>
    );
}