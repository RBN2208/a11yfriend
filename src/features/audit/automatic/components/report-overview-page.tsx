'use client'
import React from "react";
import {AutomaticAudit} from "@/features/audit/automatic/types/types";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/shared/components/shadcn-components/ui/card";

interface ReportDetailOverviewPageProps {
    report: AutomaticAudit;
}

export default function ReportOverviewPage({report}: ReportDetailOverviewPageProps) {
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

            TODO
            <ul>
                <li>settings to create a report</li>
                <li>same table as before list reports</li>
                <li>each table entry links to detail page of a run</li>
            </ul>
        </>
    )
}
