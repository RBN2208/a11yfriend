'use client'

import React, {useEffect, useState} from "react";
import UISelect from "@/components/common/ui-elements/UISelect";
import { SelectItem } from "@/components/shadcn-components/ui/select";
import { Label } from "@/components/shadcn-components/ui/label";
import Tiptap from "@/components/tiptap/Tiptap";
import {AuditResult} from "@/features/audit/manual/types/types";

interface AuditFindingsFormProps {
  formData: AuditResult;
  updateAction: (data: AuditResult) => void;
}

export default function AuditFindingsForm({formData, updateAction}: AuditFindingsFormProps) {
  const [tipTapContent, setTipTapContent] = useState(formData?.findings);

  const selectItemBaseClass = "border-transparent border focus:border-black";
  useEffect(() => {
    setTipTapContent(formData.findings);
  }, [formData.findings]);

  return (
      <div className="grid grid-cols-12 gap-4 w-full p-4">
        <div className="col-span-12 md:col-span-2">
          <UISelect placeholder="Select a state"
                    label="State"
                    id={`findings-state-${formData.id}`}
                    onChange={(value) => updateAction({...formData, status: value})}
                    value={formData?.status || 'not_checked'}
          >
            <SelectItem key={1} value="not_checked" className={`${selectItemBaseClass} focus:bg-white`}>Not checked</SelectItem>
            <SelectItem key={2} value="checked" className={`${selectItemBaseClass} bg-green-100 focus:bg-green-100`}>Checked</SelectItem>
            <SelectItem key={3} value="not_applicable" className={`${selectItemBaseClass} bg-slate-100 focus:bg-slate-100`}>Not applicable</SelectItem>
            <SelectItem key={4} value="failed" className={`${selectItemBaseClass} bg-red-100 focus:bg-red-100`}>Failed</SelectItem>
          </UISelect>
        </div>

        <div className="col-span-12 md:col-span-10">
          <Label htmlFor={`findings-${formData.id}`}
                 className="font-bold"
          >
            Findings
          </Label>
          <Tiptap data={tipTapContent}
                  updateAction={(value) => updateAction({...formData, findings: value})}
          />
        </div>
      </div>
  );
}