import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/shadcn-components/ui/card";
import { Button } from "@/shared/components/shadcn-components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function ConfirmSuccessPage() {
  const t = await getTranslations();

  return (
    <main className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="pb-4">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-2xl">{t('auth.emailVerified')}</CardTitle>
          <CardDescription className="text-base">
            {t('auth.emailVerifiedDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {t('auth.emailVerifiedInfo')}
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/account">
              {t('navigation.accountOverview')}
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
