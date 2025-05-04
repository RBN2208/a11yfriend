'use client';

import React from 'react';
import { Headline } from '@/components/ui-elements/text/Headline';
import { WCAGCriteriaType } from '@/staticData/criteria';

interface AuditDetailReferenceDetailsProps {
  reference: WCAGCriteriaType;
}

export default function AuditDetailReferenceDetails({ reference }: AuditDetailReferenceDetailsProps) {

  return (
    <section>
      <Headline title="Reference for criteria" level={3} />
      <div className="bg-gray-50 border border-gray-200 rounded p-4 mb-4 text-sm">
        <ul className="space-y-1">
          <li><strong>Kategorie:</strong> {reference.category}</li>
          <li><strong>Guideline:</strong> {reference.guideLine}</li>
          <li><strong>Name:</strong> {reference.name}</li>
          <li><strong>Level:</strong> {reference.level}</li>
          <li>
            <strong>Referenz:</strong>{' '}
            <a
              href={reference.referenceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {reference.referenceLink}
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
