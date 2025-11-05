'use client'
import {getReport} from "@/features/report/actions/actions";
import {SupabaseReport} from "@/features/report/types/types";
import {TypographyH1, TypographyH2, TypographyP} from "@/components/typography/typography-elements";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/shadcn-components/ui/accordion";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/shadcn-components/ui/card";
import {UIDivider} from "@/components/common/ui-elements/UIDivider";
import {AxeReportDetails} from "@/features/report/components/axe-report-details";
import LazyAccordionItem from "@/components/shadn-wrappers/LazyAccordionItem";
import {useEffect, useState} from "react";
import {Loader2} from "lucide-react";

export default function AuditsDetailPage({params}: { params: Promise<{ id: string }> }) {
    const [report, setReport] = useState<SupabaseReport>({
        id: "",
        name: "",
        axeReports: [],
        urls: ""
    });
    const [loading, setLoading] = useState(true);

    /**
     * the json report can reach up to several thousand lines of json. the accordions are already using a lazy variant where
     * content is only rendered when open, since shadcn initially renders everything and just switches css classes.
     *
     * despite from that, the loading of the report from supabase can also take quite some time
     */
    useEffect(() => {
        const loadReport = async () => {
            try {
                const pageParams = await params;
                const response = await getReport(pageParams.id);
                if (!response.data) {
                    return
                }
                setReport(response.data as SupabaseReport)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        loadReport()
    }, [getReport])


    if (loading) return (
        <div className="flex gap-4">
            <Loader2 className="animate-spin" />
            Loading report...
        </div>
    )

    //const report = response.data as SupabaseReport;

    return (
        <>
            <TypographyH1 className="!text-left !mb-4">
                {report.name}
            </TypographyH1>

            <TypographyH2>
                URLs accessed in this report
            </TypographyH2>
            <Accordion type="single" collapsible>
                {report.axeReports.map(axeReport => {
                    return (
                        <LazyAccordionItem
                            key={axeReport.url}
                            value={axeReport.url}
                            title={axeReport.url}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        <UIDivider label="Base Information" />
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Accordion type="single" collapsible>
                                        <AccordionItem value="base-details">
                                            <AccordionTrigger className="AccordionTrigger px-4 font-bold">
                                                Base informations about report
                                            </AccordionTrigger>
                                            <AccordionContent className="p-4">
                                                <TypographyP>
                                                    Test Engine: {axeReport.testEngine.name} (v{axeReport.testEngine.version})
                                                </TypographyP>
                                                <TypographyP>
                                                    Timestamp: {axeReport.timestamp}
                                                </TypographyP>
                                                <TypographyP>
                                                    URL: {axeReport.url}
                                                </TypographyP>
                                                <TypographyP>
                                                    Test Environment Agent: {axeReport.testEnvironment.userAgent}
                                                </TypographyP>
                                                <TypographyP>
                                                    Test Environment Dimension: {axeReport.testEnvironment.windowWidth} x {axeReport.testEnvironment.windowHeight}
                                                </TypographyP>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>

                                    <UIDivider label="Details for specific categories" />
                                    <Accordion type="single" collapsible>
                                        <AxeReportDetails
                                            details={axeReport.passes}
                                            label="Passed"
                                        />
                                        <AxeReportDetails
                                            details={axeReport.inapplicable}
                                            label="Inapplicable"
                                        />
                                        <AxeReportDetails
                                            details={axeReport.incomplete}
                                            label="Incomplete"
                                        />
                                        <AxeReportDetails
                                            details={axeReport.violations}
                                            label="Failed"
                                        />
                                    </Accordion>
                                </CardContent>
                            </Card>
                        </LazyAccordionItem>
                    )
                })}
            </Accordion>
        </>
    )
}
