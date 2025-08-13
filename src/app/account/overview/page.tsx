import {getAudit} from "@/actions/audit/actions";

export default async function OverviewPage() {
  const response = await getAudit(null,5);
  if (!response.data) return null;

  const audits = response.data;

  return (
    <div>
      TODO: DASHBOARD
    </div>
  )
}
