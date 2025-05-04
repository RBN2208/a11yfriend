import { createClient } from '@/utils/supabase/server';
import { Headline } from '@/components/ui-elements/text/Headline';
import AuditOverviewList from '@/components/audit/parts/AuditOverviewList';
import CreateAuditModal from '@/components/audit/modals/CreateAuditModal';
import { getAudits } from '@/app/account/audits/actions';

export default async function AuditsPage() {
  const response = await getAudits(20);
  if (!response.data) return null;

  const audits = response.data;

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <Headline level={2} title="Audits" />
          <p className="text-gray-600 mt-1">Handle all your audits in one place.</p>
        </div>
        <CreateAuditModal />
      </div>

      <div className="bg-white shadow sm:rounded-lg p-6">
        {audits && audits.length > 0 && (
            <AuditOverviewList audits={audits} />
          )
        }
      </div>
    </div>
  )
}
