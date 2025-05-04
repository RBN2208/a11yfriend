'use client'

import AuditCard from './AuditCard'
import { SupaBaseAudit } from '@/types/audit/types'

interface AuditListProps {
  audits: SupaBaseAudit[]
}

export default function AuditOverviewList({ audits }: AuditListProps) {
  return (
    <div className="space-y-4">
      { audits.length ?
        <>
          {audits.map((audit) => (
            <AuditCard
              key={audit.id}
              audit={audit}
            />
          ))}
        </> :
        <p>You currently have no audits</p>
      }
    </div>
  )
}
