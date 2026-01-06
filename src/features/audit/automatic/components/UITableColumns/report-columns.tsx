"use client"

import {ColumnDef} from "@tanstack/react-table"
import {ReportActionsCell} from "./report-actions-cell";
import {AutomaticAudit} from "@/features/audit/automatic/types/types";

type Translations = {
    name: string;
    actions: string
};

export const getReportColumns = (t: Translations): ColumnDef<AutomaticAudit>[] => [
    {
        accessorKey: "name",
        header: t.name,
        size: 220
    },
    {
        id: "actions",
        accessorKey: "actions",
        header: t.actions,
        size: 100,
        cell: ({row}) => <ReportActionsCell report={row.original} />,
    }
];
