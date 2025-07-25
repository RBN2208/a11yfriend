'use client'

import React, {useEffect, useState} from "react";
import UISelect from "@/components/common/ui-elements/UISelect";
import { SelectItem } from "@/components/shadcn-components/ui/select";
import { Label } from "@/components/shadcn-components/ui/label";
import Tiptap from "@/components/tiptap/Tiptap";

interface CriteriaFindingProps {
  findings: string;
  state: string;
}

interface AuditFindingsFormProps {
  referenceId: string;
  criteriaFinding: CriteriaFindingProps;
  updateAction: (findings: string, status: 'checked' | 'not_checked' | 'not_applicable') => void;
}

export default function AuditFindingsForm({referenceId, criteriaFinding, updateAction}: AuditFindingsFormProps) {
  const [text, setText] = useState(criteriaFinding.findings);

  useEffect(() => {
    setText(criteriaFinding.findings);
  }, [criteriaFinding.findings]);

  return (
      <div className="grid grid-cols-12 gap-4 w-full mt-4">
        <div className="col-span-12 md:col-span-2 mb-4">
          <UISelect placeholder="Select a state"
                    label="State"
                    id={`findings-state-${referenceId}`}
                    onChange={(value) => updateAction(criteriaFinding.findings, value)}
                    value={criteriaFinding.state || 'not_checked'}
          >
            <SelectItem key={1} value="not_checked">Not checked</SelectItem>
            <SelectItem key={2} value="checked">Checked</SelectItem>
            <SelectItem key={3} value="not_applicable">Not applicable</SelectItem>
          </UISelect>
        </div>

        <div className="col-span-12 md:col-span-10">
          <Label htmlFor={`findings-${referenceId}`}
                 className="font-bold"
          >
            Findings
          </Label>
          <Tiptap data={text}
                  updateAction={(value) =>
                    updateAction(value, criteriaFinding.state as 'checked' | 'not_checked' | 'not_applicable')
                  }
          />
        </div>
      </div>
  );
}