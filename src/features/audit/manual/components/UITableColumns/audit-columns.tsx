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
    },
    {
        accessorKey: "conformance",
        header: t.conformance,
    },
    {
        id: "actions",
        accessorKey: "actions",
        header: t.actions,
        cell: ({row}) => <AuditActionsCell audit={row.original} />,
    }
];
