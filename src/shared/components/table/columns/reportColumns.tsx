"use client"

import {ColumnDef} from "@tanstack/react-table"
import Link from 'next/link';
import {buttonVariants} from "@/shared/components/shadcn-components/ui/button"
import {Separator} from "@/shared/components/shadcn-components/ui/separator";
import {View} from "lucide-react";
import DeleteReportModal from "@/features/audit/automatic/components/delete-report-modal";
import {SupabaseReport} from "@/features/audit/automatic/types/types";


/**
 * columns for the audit tables
 */
export const reportColumns: ColumnDef<SupabaseReport>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        id: "actions",
        accessorKey: "actions",
        header: "Actions",
        cell: ({row}) => {
            return (
                <div className="flex justify-start items-center gap-2 h-8">
                    <Link className={buttonVariants({variant: "outline", size: "icon"})}
                          href={`/account/reports/${row.original.id}`}
                          title="View report"
                    >
                        <View/>
                    </Link>
                    <Separator orientation="vertical"/>
                    <DeleteReportModal reportId={row.original.id} reportName={row.original.name}/>
                </div>
            )
        },
    }
]
