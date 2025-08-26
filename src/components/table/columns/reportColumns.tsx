"use client"

import {ColumnDef} from "@tanstack/react-table"
import Link from 'next/link';
import {buttonVariants} from "@/components/shadcn-components/ui/button"
import {Separator} from "@/components/shadcn-components/ui/separator";
import {View} from "lucide-react";
import DeleteReportModal from "@/components/modals/delete-report-modal";
import {SupabaseReport} from "@/types/report/types";


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
