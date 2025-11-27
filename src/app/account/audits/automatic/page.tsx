import {UITable} from "@/components/table/UITable";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import {Label} from "@/components/shadcn-components/ui/label";
import {Input} from "@/components/shadcn-components/ui/input";
import {reportColumns} from "@/components/table/columns/reportColumns";
import CreateAxeReportModal from "@/components/modals/create-report-modal";
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
