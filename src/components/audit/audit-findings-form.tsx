'use client'

import React, {useEffect, useState} from "react";
import { SelectItem } from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import UISelect from "@/components/common/ui-elements/UISelect";
import {Label} from "@/components/ui/label";

interface CriteriaFindingProps {
  findings: string;
  state: string;
}

interface AuditFindingsFormProps {
  referenceId: string;
  criteriaFinding: CriteriaFindingProps;
  onChange: (findings: string, status: 'checked' | 'not_checked' | 'not_applicable') => void;
}

export default function AuditFindingsForm({referenceId, criteriaFinding, onChange}: AuditFindingsFormProps) {
  const [text, setText] = useState(criteriaFinding.findings);

  useEffect(() => {
    setText(criteriaFinding.findings);
  }, [criteriaFinding.findings]);

  return (
      <div className="mt-4">
        <div className="mb-4">
          <Label htmlFor={`findings-state-${referenceId}`}
                 className="font-bold"
          >
            State
          </Label>
          <UISelect placeholder="Select a state"
                    id={`findings-state-${referenceId}`}
                    onChange={(value) => onChange(criteriaFinding.findings, value)}
                    value={criteriaFinding.state || 'not_checked'}
          >
            <SelectItem key={1} value="not_checked">Not checked</SelectItem>
            <SelectItem key={2} value="checked">Checked</SelectItem>
            <SelectItem key={3} value="not_applicable">Not applicable</SelectItem>
          </UISelect>
        </div>

        <div>
          <Label htmlFor={`findings-${referenceId}`}
                 className="font-bold"
          >
            Findings
          </Label>
          <Textarea placeholder="Write down your findings..."
                    value={text}
                    id={`findings-${referenceId}`}
                    rows={10}
                    onChange={(e) => setText(e.target.value)}
                    onBlur={(e) => {
                      onChange(e.target.value, criteriaFinding.state as 'checked' | 'not_checked' | 'not_applicable')
                    }}
          />
        </div>
      </div>
  );
}