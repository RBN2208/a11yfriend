'use client'

import AuditCard from './AuditCard'
import { SupaBaseAudit } from '@/types/audit/types';

interface AuditListProps {
  audits: SupaBaseAudit[]
}

export default function AuditList({ audits }: AuditListProps) {
  return (
    <div className="space-y-4">
      {audits.map((audit) => (
        <AuditCard
          key={audit.id}
          audit={audit}
        />
      ))}
    </div>
  )
}
