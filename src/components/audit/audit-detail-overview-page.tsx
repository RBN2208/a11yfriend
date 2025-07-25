'use client'
import {SupaBaseAudit, WCAGAuditFormType} from "@/types/audit/types";
import React, {useEffect, useState} from "react";
import UIProgressbar from "@/components/common/ui-elements/UIProgressbar";
import {WCAGCriterias} from "@/staticData/criteria";
import {SelectItem,} from "@/components/shadcn-components/ui/select";
import AuditFindingsForm from "@/components/audit/audit-findings-form";
import {createClient} from "@/utils/supabase/client";
import {Button} from "@/components/shadcn-components/ui/button";

import UISelect from "@/components/common/ui-elements/UISelect";
import {TypographyH2, TypographyH3, TypographyP} from "@/components/typography/typography-elements";

interface AuditDetailOverviewPageProps {
  audit: SupaBaseAudit;
}

export default function AuditDetailOverviewPage({ audit }: AuditDetailOverviewPageProps) {
  const supabase = createClient();
  const CONFORMANCE_FILTERED = WCAGCriterias.filter(criteria => {
    if (audit.conformance === 'A') {
      return criteria.level === 'A';
    } else if (audit.conformance === 'AA') {
      return criteria.level === 'A' || criteria.level === 'AA';
    } else if (audit.conformance === 'AAA') {
      return true;
    }
    return false;
  })

  const [auditData, setAuditData] = useState<SupaBaseAudit>(audit);
  const [criteriaResults, setCriteriaResults] = useState<Record<string, Pick<WCAGAuditFormType, 'findings' | 'status'>>>({});
  const [activeCriteriaId, setActiveCriteriaId] = useState<string>(CONFORMANCE_FILTERED[0]?.id || '');
  const [savedStatus, setSavedStatus] = useState<'saved' | 'unsaved' | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const criteriaResult = criteriaResults[activeCriteriaId] || { findings: '', status: 'not_checked' as const };

  const currentIndex = CONFORMANCE_FILTERED.findIndex(criteria => criteria.id === activeCriteriaId);
  const isFirstCriteria = currentIndex === 0;
  const isLastCriteria = currentIndex === CONFORMANCE_FILTERED.length - 1;

  const getActiveCriteria = () => {
    return CONFORMANCE_FILTERED.find(criteria => criteria.id === activeCriteriaId) || CONFORMANCE_FILTERED[0];
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
    const currentIndex = CONFORMANCE_FILTERED.findIndex(criteria => criteria.id === activeCriteriaId);
    if (currentIndex < CONFORMANCE_FILTERED.length - 1) {
      setActiveCriteriaId(CONFORMANCE_FILTERED[currentIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    const currentIndex = CONFORMANCE_FILTERED.findIndex(criteria => criteria.id === activeCriteriaId);
    if (currentIndex > 0) {
      setActiveCriteriaId(CONFORMANCE_FILTERED[currentIndex - 1].id);
    }
  };

  const saveToSupabase = async () => {
    setIsSaving(true);
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
        <TypographyH2>
          Audit: {audit.name}
        </TypographyH2>

        <UIProgressbar partial={criteriaResults}
                       baseSize={CONFORMANCE_FILTERED.length}
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
              {CONFORMANCE_FILTERED.map((criteria, index) => (
                  <SelectItem key={criteria.id} value={criteria.id}>{criteria.name} ({criteria.level})</SelectItem>
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

        <div className="mt-4">
          <TypographyH3>
            {activeCriteria.category}
          </TypographyH3>
          <a href={activeCriteria.referenceLink} className="underline text-blue-500 w-max inline-block">
            <TypographyP>{activeCriteria.guideLine} --- {activeCriteria.name} ({activeCriteria.level})</TypographyP>
          </a>
        </div>

        <AuditFindingsForm referenceId={activeCriteria.id}
                           criteriaFinding={{
                             findings: criteriaResult.findings,
                             state: criteriaResult.status
                           }}
                           updateAction={(findings, status) => {
                             updateCriteriaResult(activeCriteria.id, findings, status)
                           }}
        />
      </>
  )
}