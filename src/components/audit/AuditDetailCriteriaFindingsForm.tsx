import React from 'react';
import TextAreaInputField from '@/components/forms/elements/TextAreaInputField';
import SelectField from '@/components/forms/elements/SelectField';

interface CriteriaFindingProps {
  findings: string;
  state: string;
}

interface AuditDetailCriteriaFindingsFormProps {
  referenceId: string;
  criteriaFinding: CriteriaFindingProps;
  onChange: (findings: string, status: 'checked' | 'not_checked' | 'not_applicable') => void;
}

export default function AuditDetailCriteriaFindingsForm({referenceId, criteriaFinding, onChange}: AuditDetailCriteriaFindingsFormProps) {
  return (
    <div className="mt-4">
      <div className="mb-4">
        <SelectField id={`state-findings-${referenceId}`}
                     label="State"
                     placeholder="Select state"
                     value={criteriaFinding.state || 'not_checked'}
                     onChange={(e) => onChange(criteriaFinding.findings, e.target.value as 'checked' | 'not_checked' | 'not_applicable')}
        >
          <option value="not_checked">Not checked</option>
          <option value="checked">Checked</option>
          <option value="not_applicable">Not applicable</option>
        </SelectField>

      </div>

      <div>
        <TextAreaInputField id={`findings-result-${referenceId}`}
                            label="Results"
                            value={criteriaFinding.findings || ''}
                            onChange={(e) => onChange(e.target.value, criteriaFinding.state as 'checked' | 'not_checked' | 'not_applicable')}
                            placeholder="Write your findings here..."

        />
      </div>
    </div>
  );
}
