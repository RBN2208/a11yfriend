'use client'
import {SupaBaseAudit, WCAGAuditFormType} from "@/types/audit/types";
import {Headline} from "@/components/ui-elements/text/Headline";
import React, {useEffect, useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import UIProgressbar from "@/components/common/ui-elements/UIProgressbar";
import {WCAGCriterias} from "@/staticData/criteria";
import {SelectItem,} from "@/components/ui/select";
import {Card, CardContent} from "@/components/ui/card";
import AuditFindingsForm from "@/components/audit/audit-findings-form";
import {createClient} from "@/utils/supabase/client";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";

import UISelect from "@/components/common/ui-elements/UISelect";
import UIAccordion from "@/components/common/ui-elements/UIAccordion";

interface AuditDetailOverviewPageProps {
  audit: SupaBaseAudit;
}

export default function AuditDetailOverviewPage({ audit }: AuditDetailOverviewPageProps) {
  const supabase = createClient();

  const [auditData, setAuditData] = useState<SupaBaseAudit>(audit);
  const [criteriaResults, setCriteriaResults] = useState<Record<string, Pick<WCAGAuditFormType, 'findings' | 'status'>>>({});
  const [activeCriteriaId, setActiveCriteriaId] = useState<string>(WCAGCriterias[0]?.id || '');
  const [savedStatus, setSavedStatus] = useState<'saved' | 'unsaved' | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const criteriaResult = criteriaResults[activeCriteriaId] || { findings: '', status: 'not_checked' as const };

  const currentIndex = WCAGCriterias.findIndex(criteria => criteria.id === activeCriteriaId);
  const isFirstCriteria = currentIndex === 0;
  const isLastCriteria = currentIndex === WCAGCriterias.length - 1;

  const getActiveCriteria = () => {
    return WCAGCriterias.find(criteria => criteria.id === activeCriteriaId) || WCAGCriterias[0];
  };

  const activeCriteria = getActiveCriteria();

  const updateCriteriaResult = (criteriaId: string, findings: string, status: 'checked' | 'not_checked' | 'not_applicable') => {
    setCriteriaResults(prevResults => ({
      ...prevResults,
      [criteriaId]: { findings, status }
    }));
    setSavedStatus('unsaved');
  };

  const handleNext = () => {
    const currentIndex = WCAGCriterias.findIndex(criteria => criteria.id === activeCriteriaId);
    if (currentIndex < WCAGCriterias.length - 1) {
      setActiveCriteriaId(WCAGCriterias[currentIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    const currentIndex = WCAGCriterias.findIndex(criteria => criteria.id === activeCriteriaId);
    if (currentIndex > 0) {
      setActiveCriteriaId(WCAGCriterias[currentIndex - 1].id);
    }
  };

  const saveToSupabase = async () => {
    setIsSaving(true);
    console.log(criteriaResults);
    try {
      const { error } = await supabase
          .from('audits')
          .update({ criteria_results: criteriaResults })
          .eq('id', auditData.id);

      if (error) throw error;

      setSavedStatus('saved');
      setTimeout(() => setSavedStatus(null), 3000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (audit.criteria_results) {
      setCriteriaResults(audit.criteria_results);

      const firstCriteriaWithResults = Object.keys(audit.criteria_results)[0];
      if (firstCriteriaWithResults) {
        setActiveCriteriaId(firstCriteriaWithResults);
      }
    }
  }, [audit]);

  return (
      <>
        <Headline title="Audit Overview" level={2} />

        <UIProgressbar partial={criteriaResult}
                       base={WCAGCriterias}
                       headline="Audit progress"
                       label="criterias finished"
        />

        <div className="flex flex-wrap gap-4 justify-between mt-4">
          <div className="flex flex-wrap sm:flex-nowrap gap-4 w-full lg:w-8/12">
            <Button onClick={handlePrevious}
                    disabled={isFirstCriteria}
                    className="w-full sm:w-max order-1 md:order-none"
            >
              Previous criteria
            </Button>

            <UISelect placeholder="Select a criteria"
                      onChange={(value) => setActiveCriteriaId(value)}
                      value={activeCriteriaId}
            >
              {WCAGCriterias.map((criteria, index) => (
                  <SelectItem key={criteria.id} value={criteria.id}>{criteria.name} {criteria.level}</SelectItem>
              ))}
            </UISelect>

            <Button onClick={handleNext}
                    disabled={isLastCriteria}
                    className="w-full sm:w-max order-2 md:order-none"
            >
              Next criteria
            </Button>
          </div>
          <Button variant={savedStatus === 'unsaved' ? 'destructive' : 'outline'}
                  onClick={saveToSupabase}
          >
            {savedStatus === 'unsaved' ? 'Save changes' : 'Everything saved'}
          </Button>
        </div>

        <Card className="my-4">
          <CardContent className="px-4 py-3">
            <UIAccordion triggerLabel="Audit details">
              <Table className="flex flex-row border border-primary p-4 rounded-md">
                <TableHeader>
                  <TableRow className="flex flex-col">
                    <TableHead className="h-full py-2">ID</TableHead>
                    <TableHead className="h-full py-2">Name</TableHead>
                    <TableHead className="h-full py-2">State</TableHead>
                    <TableHead className="h-full py-2">Created</TableHead>
                    <TableHead className="h-full py-2">Customer</TableHead>
                    <TableHead className="h-full py-2">Project</TableHead>
                    <TableHead className="h-full py-2">Module</TableHead>
                    <TableHead className="h-full py-2">Version</TableHead>
                    <TableHead className="h-full py-2">Conformance</TableHead>
                    <TableHead className="h-full py-2">Miscellaneous</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="flex flex-col">
                    <TableCell className="h-full py-2">{audit.id || "-"}</TableCell>
                    <TableCell className="h-full py-2">{audit.name || "-"}</TableCell>
                    <TableCell className="h-full py-2">{audit.status || "-"}</TableCell>
                    <TableCell className="h-full py-2">{audit.created_at || "-"}</TableCell>
                    <TableCell className="h-full py-2">{audit.customer || "-"}</TableCell>
                    <TableCell className="h-full py-2">{audit.project_name || "-"}</TableCell>
                    <TableCell className="h-full py-2">{audit.module || "-"}</TableCell>
                    <TableCell className="h-full py-2">{audit.version || "-"}</TableCell>
                    <TableCell className="h-full py-2">{audit.conformance || "-"}</TableCell>
                    <TableCell className="h-full py-2">{audit.miscellaneous || "-"}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </UIAccordion>
            <UIAccordion triggerLabel="Reference for criteria">
              <Table className="flex flex-row border border-primary p-4 rounded-md">
                <TableHeader>
                  <TableRow className="flex flex-col">
                    <TableHead className="h-full py-2">Category:</TableHead>
                    <TableHead className="h-full py-2">Guideline:</TableHead>
                    <TableHead className="h-full py-2">Name:</TableHead>
                    <TableHead className="h-full py-2">Level:</TableHead>
                    <TableHead className="h-full py-2">Reference:</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="flex flex-col">
                    <TableCell className="h-full py-2">{activeCriteria.category || "-"}</TableCell>
                    <TableCell className="h-full py-2">{activeCriteria.guideLine || "-"}</TableCell>
                    <TableCell className="h-full py-2">{activeCriteria.name || "-"}</TableCell>
                    <TableCell className="h-full py-2">{activeCriteria.level || "-"}</TableCell>
                    <TableCell className="h-full py-2">{activeCriteria.referenceLink || "-"}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </UIAccordion>
          </CardContent>
        </Card>

        <AuditFindingsForm referenceId={activeCriteria.id}
                           criteriaFinding={{
                             findings: criteriaResult.findings,
                             state: criteriaResult.status
                           }}
                           onChange={(findings, status) => {
                             updateCriteriaResult(activeCriteria.id, findings, status)
                           }}
        />
      </>
  )
}