'use client';

import React from 'react';
import { SupaBaseAudit } from '@/types/audit/types';
import { Headline } from '@/components/ui-elements/text/Headline';

interface AuditDetailBaseDetailsProps {
  audit: SupaBaseAudit;
}

export default function AuditDetailBaseDetails({ audit }: AuditDetailBaseDetailsProps) {

  return (
    <>
      <Headline title="Audit Overview" level={2} />
      <section className="bg-gray-100 p-4 rounded mb-6 shadow-sm">
        <h3 className="text-xl font-semibold mb-2">Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
          <p><strong>ID:</strong> {audit.id}</p>
          <p><strong>Name:</strong> {audit.name}</p>
          <p><strong>State:</strong> {audit.status}</p>
          <p><strong>Created:</strong> {audit.created_at}</p>
          <p><strong>Customer:</strong> {audit.customer}</p>
          <p><strong>Project:</strong> {audit.project_name}</p>
          <p><strong>Module:</strong> {audit.module}</p>
          <p><strong>Version:</strong> {audit.version}</p>
          <p><strong>Conformance:</strong> {audit.conformance}</p>
          <p><strong>Miscellaneous:</strong> {audit.miscellaneous}</p>
        </div>
      </section>
    </>
  );
}
