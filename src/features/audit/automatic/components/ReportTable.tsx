"use client"

import {TableWrapper} from "@/shared/components/shadn-wrappers/TableWrapper";
import {getReportColumns} from "./UITableColumns/report-columns";
import {useTranslations} from "next-intl";
import React, {useEffect, useState} from "react";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import {Label} from "@/shared/components/shadcn-components/ui/label";
import {Input} from "@/shared/components/shadcn-components/ui/input";
import CreateReportModal from "@/features/audit/automatic/components/modals/create-report-modal";
import {AutomaticAudit} from "@/features/audit/automatic/types/types";

interface ReportTableProps {
  reports: AutomaticAudit[]
}

export function ReportTable({ reports }: ReportTableProps) {
  const t = useTranslations();
  const [filteredReports, setFilteredReports] = useState<AutomaticAudit[]>(reports);
  const [searchQuery, setSearchQuery] = useState("");

  const columns = getReportColumns({
    name: t('report.name'),
    actions: t('report.action')
  });

  function filterReports(query: string) {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = reports.filter(report =>
      report.name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredReports(filtered);
  }

  function handleSearch(query: string) {
    setSearchQuery(query);
    filterReports(query);
  }

  useEffect(() => {
    if (searchQuery) {
      filterReports(searchQuery);
    } else {
      setFilteredReports(reports);
    }
  }, [reports]);

  return (
    <TableWrapper
        columns={columns}
        data={filteredReports}
    >
      <VisuallyHidden>
        <Label htmlFor="searchAuditsInput">
          {t('report.search')}
        </Label>
      </VisuallyHidden>
      <Input
          id="searchAuditsInput"
          placeholder={t('report.search')}
          onInput={(e) => handleSearch((e.target as HTMLInputElement).value)}
      />
      <CreateReportModal isEditModal={false} />
    </TableWrapper>
  );
}

