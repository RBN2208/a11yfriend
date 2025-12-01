'use client'
import {AuditResult, ManualAudit} from "@/features/audit/manual/types/types";
import React, {useState} from "react";
import AuditFindingsForm from "@/features/audit/manual/components/audit-findings-form";
import UIAccordion from "@/shared/components/common/ui-elements/UIAccordion";
import {Loader2, Info, ExternalLink, ChevronsDownUp, ChevronsUpDown} from "lucide-react";
import {Button} from "@/shared/components/shadcn-components/ui/button";
import {updateAuditResults} from "@/features/audit/manual/actions/actions";
import {getCriteriasForSelectedConformanceLevel} from "@/features/audit/utils";
import {TypographyH2, TypographyP} from "@/shared/components/typography/typography-elements";
import {toast} from "sonner";
import {MessageCodes} from "@/shared/message-codes";
import AlertWrapper from "@/shared/components/shadn-wrappers/AlertWrapper";
import {UIDivider} from "@/shared/components/common/ui-elements/UIDivider";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/shared/components/shadcn-components/ui/accordion";

interface AuditDetailOverviewPageProps {
    audit: ManualAudit;
}

export default function AuditDetailOverviewPage({audit}: AuditDetailOverviewPageProps) {
    const filteredResults = getCriteriasForSelectedConformanceLevel(audit.conformance, audit.findings);

    const [auditResultFormData, setAuditResultFormData] = useState<AuditResult[]>(filteredResults);
    const [isSaving, setIsSaving] = useState(false);
    const [hasUpdated, setHasUpdated] = useState(false);
    const [accordionValues, setAccordionValues] = useState<string[]>([]);

    const updateCriteriaResult = (data: AuditResult) => {
        setHasUpdated(true);
        setAuditResultFormData(prevData =>
            prevData.map(item =>
                item.id === data.id ? {...item, ...data} : item
            )
        );
    };

    const handleSave = async () => {
        await saveToSupabase(auditResultFormData, audit.id)
    }

    const saveToSupabase = async (data: AuditResult[], auditId: string) => {
        setIsSaving(true);
        try {
            const {success, message, globalError} = await updateAuditResults(data, auditId);
            if (success) {
                toast.success(message);
            } else {
                toast.error(message, {description: globalError});
            }
        } catch (error) {
            toast.error(MessageCodes.GENERIC_UNEXPECTED_ERROR);
            console.error(error);
        } finally {
            setTimeout(() => {
                setIsSaving(false);
                setHasUpdated(false);
            }, 1000)
        }
    };

    return (
        <>
            <div className="flex flex-col mb-4">
                <TypographyH2>
                    {audit.name}
                </TypographyH2>
                <UIDivider label="General Informations" />
                {/* audit informations */}
                <UIAccordion triggerLabel="Audit overview">
                    <div className="flex gap-4 p-4 border border-transparent border-b-gray-300">
                        <TypographyP className="font-bold min-w-24">
                            Description
                        </TypographyP>
                        <TypographyP className="m-0">
                            {audit.description}
                        </TypographyP>
                    </div>
                </UIAccordion>
            </div>

            <UIDivider label="Audit" />

            <div className="w-full flex justify-between gap-4 mb-4">
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        title="Collapse all"
                        onClick={() => setAccordionValues([])}
                    >
                        <ChevronsDownUp />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        title="Expand all"
                        onClick={() => setAccordionValues(auditResultFormData.map(result => result.id))}
                    >
                        <ChevronsUpDown />
                    </Button>
                </div>
                <div>
                    <Button
                        disabled={isSaving || !hasUpdated}
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
            </div>
            <Accordion
                type="multiple"
                value={accordionValues}
                onValueChange={setAccordionValues}
            >
                {auditResultFormData.map(result => {
                    const isCheckedClass = result.status === 'checked' ? 'bg-green-100' : '';
                    const isFailedClass = result.status === 'failed' ? 'bg-red-100' : '';
                    const isNotApplicableClass = result.status === 'not_applicable' ? 'bg-gray-100' : '';
                    const stateClass = `${isCheckedClass} ${isFailedClass} ${isNotApplicableClass}`;

                    return (
                        <AccordionItem
                            key={result.id}
                            value={result.id}
                        >
                            <AccordionTrigger className={`AccordionTrigger px-4 font-bold ${stateClass}`}>
                                {result.name}
                            </AccordionTrigger>
                            <AccordionContent>
                                <AlertWrapper
                                    alertClass="mt-4"
                                    title="Further informations on this criteria"
                                    variant="default"
                                    icon={<Info/>}
                                >
                                    <Button variant="outline" asChild>
                                        <a href={result.referenceLink}>
                                            {result.name}
                                            <ExternalLink />
                                        </a>
                                    </Button>
                                </AlertWrapper>
                                <AuditFindingsForm
                                    formData={result}
                                    updateAction={(data: AuditResult) => {
                                        updateCriteriaResult(data)
                                    }}
                                />
                            </AccordionContent>
                        </AccordionItem>
                    )
                })}
            </Accordion>
        </>
    )
}
