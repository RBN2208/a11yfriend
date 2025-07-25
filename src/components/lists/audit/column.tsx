"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from 'next/link';
import { SupaBaseAudit } from '@/types/audit/types';
import DeleteAuditModal from "@/components/modals/delete-audit-modal";
import { buttonVariants } from "@/components/shadcn-components/ui/button"
import {Separator} from "@/components/shadcn-components/ui/separator";
import {Edit, View} from "lucide-react";
import {getCriteriaLengths} from "@/staticData/criteria";
import {TypographyP} from "@/components/typography/typography-elements";
import CreateAuditModal from "@/components/modals/create-audit-modal";


export const columns: ColumnDef<SupaBaseAudit>[] = [
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
    cell: ({ row }) => {
      console.log(row)
      return (
        <div className="flex justify-start items-center gap-2 h-8">
          <Link className={buttonVariants({ variant: "outline", size: "icon" })}
                href={`/account/audits/${row.original.id}`}
                title="View audit"
          >
            <View />
          </Link>
          <CreateAuditModal triggerAsEditIcon auditData={row.original} />
          <Separator orientation="vertical" />
          <DeleteAuditModal auditId={row.original.id} auditName={row.original.name} />
          <Separator orientation="vertical" />
          <TypographyP aria-label="Completed criteria:" className="m-0">
            { Object.keys(row.original.criteria_results).length } / {getCriteriaLengths(row.original.conformance)}
          </TypographyP>
        </div>
      )
    },
  }
]
