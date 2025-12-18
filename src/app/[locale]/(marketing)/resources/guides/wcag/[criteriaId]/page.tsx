interface PageProps {
  params: Promise<{
    locale: string;
    criteriaId: string;
  }>;
}

export default async function WcagCriteriaDetailPage({ params }: PageProps) {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      tbd
    </div>
  );
}