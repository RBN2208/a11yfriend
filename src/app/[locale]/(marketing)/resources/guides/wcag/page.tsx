import {TypographyH1, TypographyP} from "@/shared/components/typography/typography-elements";

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function WcagGuidePage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <>
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-18 sm:py-28 lg:py-36">
          <div className="text-center">
            <TypographyH1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl dark:text-white">
              H1 TBD
            </TypographyH1>
            <TypographyP className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">
              Intro TBD
            </TypographyP>
          </div>
        </div>
      </div>
      tbd
    </>
  );
}

