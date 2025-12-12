"use client"

import {ManualAudit} from "@/features/audit/manual/types/types";
import {TableWrapper} from "@/shared/components/shadn-wrappers/TableWrapper";
import {getAuditColumns} from "./UITableColumns/audit-columns";
import {useTranslations} from "next-intl";
import {ReactNode} from "react";

interface AuditTableProps {
  audits: ManualAudit[];
  children?: ReactNode;
}

export function AuditTable({ audits, children }: AuditTableProps) {
  const t = useTranslations();

  const columns = getAuditColumns({
    conformance: t('audit.conformance'),
    name: t('audit.name'),
    actions: t('audit.action'),
  });

  return (
    <TableWrapper columns={columns} data={audits}>
      {children}
    </TableWrapper>
  );
}

