"use client"

import {ColumnDef} from "@tanstack/react-table"
import Link from 'next/link';
import {SupabaseAudit} from '@/features/audit/manual/types/types';
import DeleteAuditModal from "@/features/audit/components/delete-audit-modal";
import {buttonVariants} from "@/shared/components/shadcn-components/ui/button"
import {Separator} from "@/shared/components/shadcn-components/ui/separator";
import {Edit, View} from "lucide-react";
import {getCriteriaLengths} from "@/staticData/criteria";
import {TypographyP} from "@/shared/components/typography/typography-elements";
import CreateAuditModal from "@/features/audit/components/create-audit-modal";
import ExportAuditModal from "@/features/audit/components/export-audit-modal";


/**
 * columns for the audit tables
 */
export const auditColumns: ColumnDef<SupabaseAudit>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "version",
    header: "Version",
  },
  {
    accessorKey: "conformance",
    header: "Conformance",
  },
  {
    id: "actions",
    accessorKey: "actions",
    header: "Actions",
    cell: ({row}) => {
      const solvedCriterias = row.original.auditResults.filter(result => {
        if (result.status !== 'not_checked') {
          return true
        }
      });
      return (
        <div className="flex justify-start items-center gap-2 h-8">
          <Link className={buttonVariants({variant: "outline", size: "icon"})}
                href={`/account/audits/${row.original.id}`}
                title="View audit"
          >
            <View/>
          </Link>
          <CreateAuditModal isEditModal={true} auditData={row.original}/>
          <ExportAuditModal auditData={row.original}/>
          <Separator orientation="vertical"/>
          <DeleteAuditModal auditId={row.original.id} auditName={row.original.name}/>
          <Separator orientation="vertical"/>
          <TypographyP aria-label="Completed criteria:" className="m-0">
            {solvedCriterias.length} / {getCriteriaLengths(row.original.conformance)}
          </TypographyP>
        </div>
      )
    },
  }
]
