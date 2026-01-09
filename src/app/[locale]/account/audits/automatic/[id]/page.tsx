import {getReport} from "@/features/audit/automatic/actions/actions";
import ReportOverviewPage from "@/features/audit/automatic/components/report-overview-page";
import {AutomaticAudit} from "@/features/audit/automatic/types/types";

export default async function ReportDetailPage({params}: { params: Promise<{ id: string }> }) {
  const pageParams = await params;

  const response = await getReport(pageParams.id);

  if (!response.data) return (
    <div>
      Loading...
    </div>
  )

  const report = response.data as AutomaticAudit;

  return (
      <>
        <ReportOverviewPage report={report} />
      </>
  )
}
