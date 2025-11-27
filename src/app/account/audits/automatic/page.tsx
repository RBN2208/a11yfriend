import {UITable} from "@/shared/components/table/UITable";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import {Label} from "@/shared/components/shadcn-components/ui/label";
import {Input} from "@/shared/components/shadcn-components/ui/input";
import {reportColumns} from "@/shared/components/table/columns/reportColumns";
import CreateAxeReportModal from "@/features/audit/automatic/components/create-report-modal";
import {getReport} from "@/features/audit/automatic/actions/actions";
import {SupabaseReport} from "@/features/audit/automatic/types/types";

export default async function ReportPage() {
    const response = await getReport(null, 20);
    if (!response.data) return null;

    const reports = response.data as SupabaseReport[];
    return (
        <div>
            <UITable columns={reportColumns} data={reports}>
                <VisuallyHidden>
                    <Label htmlFor="searchReportsInput">
                        Search reports
                    </Label>
                </VisuallyHidden>
                <Input id="searchReportsInput" placeholder="Search reports"/>
                <CreateAxeReportModal />
            </UITable>
        </div>
    )
}
