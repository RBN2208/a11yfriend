"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from 'next/link';
import { SupaBaseAudit } from '@/types/audit/types';
import DeleteAuditModal from "@/components/audit/modals/delete-audit-modal";
import { buttonVariants } from "@/components/ui/button"
import {Separator} from "@/components/ui/separator";
import {View} from "lucide-react";

export const columns: ColumnDef<Pick<SupaBaseAudit, 'id' | 'name' | 'version' | 'conformance'>>[] = [
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
      return (
        <div className="flex justify-start items-center gap-2 h-8">
          <Link className={buttonVariants({ variant: "outline", size: "icon" })}
                href={`/account/audits/${row.original.id}`}
                title="View audit"
          >
            <View />
          </Link>
          <Separator orientation="vertical" />
          <DeleteAuditModal auditId={row.original.id} auditName={row.original.name} />
        </div>
      )
    },
  }
]
