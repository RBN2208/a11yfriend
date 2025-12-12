"use client"

import {ColumnDef} from "@tanstack/react-table"
import {ManualAudit} from '@/features/audit/manual/types/types';
import {AuditActionsCell} from "./audit-actions-cell";

type Translations = {
    conformance: string;
    name: string;
    actions: string
};

export const getAuditColumns = (t: Translations): ColumnDef<ManualAudit>[] => [
    {
        accessorKey: "name",
        header: t.name,
        size: 220
    },
    {
        accessorKey: "conformance",
        header: t.conformance,
        size: 220
    },
    {
        id: "actions",
        accessorKey: "actions",
        header: t.actions,
        size: 100,
        cell: ({row}) => <AuditActionsCell audit={row.original} />,
    }
];
