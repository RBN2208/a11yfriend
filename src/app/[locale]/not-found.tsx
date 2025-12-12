import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/shadcn-components/ui/card";
import { Button } from "@/shared/components/shadcn-components/ui/button";
import { FileQuestion } from "lucide-react";
import { getTranslations } from "next-intl/server";
import {Link} from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations();

  return (
    <main className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="pb-4">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <FileQuestion className="h-10 w-10 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl">
              404: {t('notFound.title')}
          </CardTitle>
          <CardDescription className="text-base">
            {t('notFound.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {t('notFound.info')}
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/">
              {t('notFound.backHome')}
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
