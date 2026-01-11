'use client'
import React, { useState } from "react";
import {AutomaticAudit} from "@/features/audit/automatic/types/types";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/shared/components/shadcn-components/ui/card";
import {Button} from "@/shared/components/shadcn-components/ui/button";
import {runAxeReport} from "@/features/audit/automatic/actions/actions";
import {Loader2} from "lucide-react";

interface ReportDetailOverviewPageProps {
    report: AutomaticAudit;
}

export default function ReportOverviewPage({report}: ReportDetailOverviewPageProps) {
    const [isRunning, setIsRunning] = useState(false);

    console.log(report);

    const handleRunJob = async () => {
        setIsRunning(true);
        try {
            const result = await runAxeReport(report.id);
            if (result.success) {
                console.log('Axe report completed successfully');
                // TODO: Show success message or refresh data
            } else {
                console.error('Axe report failed:', result.globalError);
                // TODO: Show error message
            }
        } catch (error) {
            console.error('Error running Axe report:', error);
            // TODO: Show error message
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>
                        {report.name}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>
                        {report.description}
                    </CardDescription>
                </CardContent>
            </Card>

            <Button onClick={handleRunJob} disabled={isRunning}>
                {isRunning ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Bitte warten
                    </>
                ) : (
                    'Run Job'
                )}
            </Button>
            TODO
            <ul>
                <li>settings to create a report</li>
                <li>same table as before list reports</li>
                <li>each table entry links to detail page of a run</li>
            </ul>
        </>
    )
}
