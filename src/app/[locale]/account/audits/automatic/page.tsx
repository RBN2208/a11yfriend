import {getReport} from "@/features/audit/automatic/actions/actions";
import {ManualAudit} from "@/features/audit";
import {getTranslations} from "next-intl/server";
import {Card, CardContent, CardHeader, CardTitle} from "@/shared/components/shadcn-components/ui/card";
import {ReportTable} from "@/features/audit/automatic/components/ReportTable";
import {AutomaticAudit} from "@/features/audit/automatic/types/types";

export default async function ReportPage() {
    const response = await getReport(null, 20);
    if (!response.data) return null;

    const reports = response.data as AutomaticAudit[];

    const t = await getTranslations();

    return (
        <div>
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>
                        <h1>
                            {t('report.overview')}
                        </h1>
                    </CardTitle>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>
                        <h2>
                            {t('report.manage')}
                        </h2>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ReportTable reports={reports} />
                </CardContent>
            </Card>
        </div>
    )
}
