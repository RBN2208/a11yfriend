'use client'

import Link from 'next/link'
import { SupaBaseAudit } from '@/types/audit/types';
import { Headline } from '@/components/ui-elements/text/Headline';
import DeleteAuditModal from '@/components/audit/modals/DeleteAuditModal';

interface AuditCardProps {
  audit: SupaBaseAudit
}

export default function AuditCard({ audit }: AuditCardProps) {

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start">
        <Link href={`/account/audits/${audit.id}`} className="block flex-grow">
          <Headline title={audit.name} level={3} />
          <div className="mt-1 text-sm text-gray-500">
            <span>Created at {formatDate(audit.created_at)}</span>
            {audit.updated_at && audit.updated_at !== audit.created_at && (
              <span> • Updated at {formatDate(audit.updated_at)}</span>
            )}
          </div>
          {audit.description && (
            <p className="mt-2 text-sm text-gray-700">{audit.description}</p>
          )}
        </Link>

        <DeleteAuditModal auditId={audit.id} auditName={audit.name} />

      </div>
    </div>
  )
}
