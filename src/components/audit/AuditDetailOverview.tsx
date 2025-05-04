'use client';

import React, { useState, useEffect } from 'react';
import { SupaBaseAudit, WCAGAuditFormType } from '@/types/audit/types';
import AuditDetailBaseDetails from '@/components/audit/AuditDetailBaseDetails';
import AuditDetailReferenceDetails from '@/components/audit/AuditDetailReferenceDetails';
import { WCAGCriterias } from '@/staticData/criteria';
import AuditDetailCriteriaFindingsForm from '@/components/audit/AuditDetailCriteriaFindingsForm';
import { createClient } from '@/utils/supabase/client';
import ProgressBar from '@/components/ui-elements/ProgressBar';
import UIButton from '@/components/ui-elements/UIButton';
import SelectField from '@/components/forms/elements/SelectField';
import { Button } from "@/components/ui/button"


interface AuditsDetailProps {
  audit: SupaBaseAudit;
}

export default function AuditDetailOverview({ audit }: AuditsDetailProps) {
  const supabase = createClient();

  const [auditData, setAuditData] = useState<SupaBaseAudit>(audit);
  const [activeCriteriaId, setActiveCriteriaId] = useState<string>(WCAGCriterias[0]?.id || '');
  const [criteriaResults, setCriteriaResults] = useState<Record<string, Pick<WCAGAuditFormType, 'findings' | 'status'>>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [savedStatus, setSavedStatus] = useState<'saved' | 'unsaved' | null>(null);

  useEffect(() => {
    if (audit.criteria_results) {
      setCriteriaResults(audit.criteria_results);

      const firstCriteriaWithResults = Object.keys(audit.criteria_results)[0];
      if (firstCriteriaWithResults) {
        setActiveCriteriaId(firstCriteriaWithResults);
      }
    }
  }, [audit]);

  const getActiveCriteria = () => {
    return WCAGCriterias.find(criteria => criteria.id === activeCriteriaId) || WCAGCriterias[0];
  };

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

  const activeCriteria = getActiveCriteria();
  const criteriaResult = criteriaResults[activeCriteriaId] || { findings: '', status: 'not_checked' as const };

  const currentIndex = WCAGCriterias.findIndex(criteria => criteria.id === activeCriteriaId);
  const isFirstCriteria = currentIndex === 0;
  const isLastCriteria = currentIndex === WCAGCriterias.length - 1;

  return (
    <>
      <AuditDetailBaseDetails audit={audit}/>

      <div className="flex mb-6">
        <UIButton label={savedStatus === 'saved' || savedStatus === null ? 'Save changes' : 'Unsaved changes'}
                  isLoading={isSaving}
                  type="button"
                  btnClass={`w-max h-max self-center ${savedStatus === 'saved' || savedStatus === null ? 'bg-blue-900' : 'bg-amber-600'}`}
                  callBackAction={saveToSupabase}
        />
      </div>

      <div className="flex gap-10 mb-6">
        <ProgressBar partial={criteriaResults} base={WCAGCriterias}/>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="mb-6">
          <SelectField id="select-criteria"
                       label="Select criteria"
                       value={activeCriteriaId}
                       onChange={(e) => setActiveCriteriaId(e.target.value)}
          >
            {WCAGCriterias.map((criteria, index) => (
              <option key={criteria.id} value={criteria.id}>
                {criteria.name} - Level {criteria.level}
              </option>
            ))}
          </SelectField>
        </div>
        <AuditDetailReferenceDetails reference={activeCriteria}/>

        <AuditDetailCriteriaFindingsForm
          referenceId={activeCriteria.id}
          criteriaFinding={{
            findings: criteriaResult.findings,
            state: criteriaResult.status
          }}
          onChange={(findings, status) => {
            updateCriteriaResult(activeCriteria.id, findings, status)
          }}
        />

        <div className="flex justify-between gap-12 mt-6 ">

          <UIButton label="← Previous"
                    callBackAction={handlePrevious}
                    type="button"
                    btnClass={isFirstCriteria ? 'opacity-50 cursor-not-allowed' : ''}
          />

          <UIButton label="Next →"
                    callBackAction={handleNext}
                    type="button"
                    btnClass={isLastCriteria ? 'opacity-50 cursor-not-allowed' : ''}
          />

        </div>
      </div>
    </>
  );
}
