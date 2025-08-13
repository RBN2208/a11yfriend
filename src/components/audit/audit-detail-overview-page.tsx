'use client'
import {AuditResult, SupaBaseAudit} from "@/types/audit/types";
import React, {useState} from "react";
import AuditFindingsForm from "@/components/audit/audit-findings-form";
import AuditImageViewUploadForm from "@/components/audit/audit-image-view-upload-form";
import UIAccordion from "@/components/common/ui-elements/UIAccordion";
import {Loader2} from "lucide-react";
import {Button} from "@/components/shadcn-components/ui/button";
import {updateAuditResults} from "@/actions/audit";
import {getCriteriasForSelectedConformanceLevel} from "@/lib/utils";
import {TypographyH2, TypographyP} from "@/components/typography/typography-elements";

interface AuditDetailOverviewPageProps {
  audit: SupaBaseAudit;
}

export default function AuditDetailOverviewPage({ audit }: AuditDetailOverviewPageProps) {
  const filteredResults = getCriteriasForSelectedConformanceLevel(audit.conformance, audit.auditResults);

  const [auditResultFormData, setAuditResultFormData] = useState<AuditResult[]>(filteredResults);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUpdated, setHasUpdated] = useState(false);

  const updateCriteriaResult = (data: AuditResult) => {
    setHasUpdated(true);
    setAuditResultFormData(prevData =>
        prevData.map(item =>
            item.id === data.id ? { ...item, ...data } : item
        )
    );
  };

  const handleSave = async () => {
    await saveToSupabase(auditResultFormData, audit.id)
  }

  const saveToSupabase = async (data: AuditResult[], auditId: string) => {
    setIsSaving(true);
    try {
      const response = await updateAuditResults(data, auditId);
      if (response.error) throw response.error;
    } catch (error) {
      // TODO: how to display errors here?
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsSaving(false);
        setHasUpdated(false);
      }, 1000)
    }
  };
//console.log(audit)
  return (
      <>
        <div>
          <TypographyH2>
            {audit.name}
          </TypographyH2>
          <UIAccordion triggerLabel="Audit overview">
            <div className="flex gap-4 p-4 border border-transparent border-b-gray-300">
              <TypographyP className="font-bold min-w-24">
                Description
              </TypographyP>
              <TypographyP className="m-0">{audit.description}</TypographyP>
            </div>
            <div className="flex gap-4 p-4 border border-transparent border-b-gray-300">
              <TypographyP className="font-bold min-w-24">
                Module
              </TypographyP>
              <TypographyP className="m-0">{audit.module}</TypographyP>
            </div>
            <div className="flex gap-4 p-4 border border-transparent border-b-gray-300">
              <TypographyP className="font-bold min-w-24">
                Customer
              </TypographyP>
              <TypographyP className="m-0">{audit.customer}</TypographyP>
            </div>
            <div className="flex gap-4 p-4 border border-transparent border-b-gray-300">
              <TypographyP className="font-bold min-w-24">
                Project Name
              </TypographyP>
              <TypographyP className="m-0">{audit.project_name}</TypographyP>
            </div>
            <div className="flex gap-4 p-4">
              <TypographyP className="font-bold min-w-24">
                Miscellaneous
              </TypographyP>
              <TypographyP className="m-0">{audit.miscellaneous}</TypographyP>
            </div>
          </UIAccordion>
        </div>
        <div className="mb-4">
          <UIAccordion triggerLabel="Images">
            <AuditImageViewUploadForm
                images={audit.images}
                auditId={audit.id}
            />
          </UIAccordion>
        </div>
        <div className="w-full flex justify-end gap-4 mb-4">
          <Button disabled={isSaving || !hasUpdated}
                  className="relative w-max"
                  variant="outline"
                  onClick={handleSave}
          >
            {hasUpdated &&
                <span className="absolute -top-1 -right-1 flex size-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
                    <span className="relative inline-flex size-3 rounded-full bg-emerald-700"></span>
                </span>
            }
            {isSaving && <Loader2 className="animate-spin"/>}
            {isSaving ? 'Saving audit...' : 'Save audit'}
          </Button>
        </div>
        {auditResultFormData.map(result => {
          const isCheckedClass = result.status === 'checked' ? 'bg-green-100' : '' ;
          const isFailedClass = result.status === 'failed' ? 'bg-red-100' : '';
          const isNotApplicableClass = result.status === 'not_applicable' ? 'bg-gray-100' : '';

          return (
              <UIAccordion key={result.id}
                         triggerLabel={result.name}
                         triggerMarkerClass={`${isCheckedClass} ${isFailedClass} ${isNotApplicableClass}`}
            >
              <AuditFindingsForm
                  formData={result}
                  updateAction={(data: AuditResult) => {
                    updateCriteriaResult(data)
                  }}
              />
            </UIAccordion>
          )
        })}
      </>
  )
}
