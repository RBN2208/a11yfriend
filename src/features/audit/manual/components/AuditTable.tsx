"use client"

import {ManualAudit} from "@/features/audit/manual/types/types";
import {TableWrapper} from "@/shared/components/shadn-wrappers/TableWrapper";
import {getAuditColumns} from "./UITableColumns/audit-columns";
import {useTranslations} from "next-intl";
import React, {ReactNode, useEffect, useState} from "react";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import {Label} from "@/shared/components/shadcn-components/ui/label";
import {Input} from "@/shared/components/shadcn-components/ui/input";
import CreateAuditModal from "@/features/audit/manual/components/modals/create-audit-modal";

interface AuditTableProps {
  audits: ManualAudit[];
}

export function AuditTable({ audits }: AuditTableProps) {
  const t = useTranslations();
  const [filteredAudits, setFilteredAudits] = useState<ManualAudit[]>(audits);
  const [searchQuery, setSearchQuery] = useState("");

  const columns = getAuditColumns({
    conformance: t('audit.conformance'),
    name: t('audit.name'),
    actions: t('audit.action'),
  });

  function filterAudits(query: string) {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = audits.filter(audit =>
      audit.name.toLowerCase().includes(lowerCaseQuery) ||
      (audit.conformance && audit.conformance.toLowerCase().includes(lowerCaseQuery))
    );
    setFilteredAudits(filtered);
  }

  function handleSearch(query: string) {
    setSearchQuery(query);
    filterAudits(query);
  }

  useEffect(() => {
    if (searchQuery) {
      filterAudits(searchQuery);
    } else {
      setFilteredAudits(audits);
    }
  }, [audits]);

  return (
    <TableWrapper
        columns={columns}
        data={filteredAudits}
    >
      <VisuallyHidden>
        <Label htmlFor="searchAuditsInput">
          {t('audit.search')}
        </Label>
      </VisuallyHidden>
      <Input
          id="searchAuditsInput"
          placeholder={t('audit.search')}
          onInput={(e) => handleSearch((e.target as HTMLInputElement).value)}
      />
      <CreateAuditModal isEditModal={false} />
    </TableWrapper>
  );
}

