import {AxeReport} from "@/features/audit/automatic/types/types";
import {Accordion} from "@/components/shadcn-components/ui/accordion";
import {TypographyP} from "@/components/typography/typography-elements";
import {Button} from "@/components/shadcn-components/ui/button";
import Link from "next/link";
import {ExternalLink} from "lucide-react";
import React from "react";
import {AxeReportNode} from "@/features/audit/automatic/components/axe-report-node";
import {UIDivider} from "@/components/common/ui-elements/UIDivider";
import LazyAccordionItem from "@/components/shadn-wrappers/LazyAccordionItem";

type AxeReportDetailsProps = {
    details: AxeReport['inapplicable' | 'incomplete' | 'passes' | 'violations'],
    label: string
}
export function AxeReportDetails(props: AxeReportDetailsProps) {
    return (
        <LazyAccordionItem
            value={props.label}
            title={`${props.label} Categories - ${props.details.length}`}
        >
            <Accordion type="single" collapsible className="pl-4">
                {props.details.map((detail,index) => {
                    return (
                        <LazyAccordionItem
                            key={detail.id}
                            value={detail.id}
                            title={detail.description}
                        >
                            <TypographyP>
                                {detail.help}
                            </TypographyP>
                            <Button asChild variant="outline">
                                <Link href={detail.helpUrl}>
                                    See more informations about this topic
                                    <ExternalLink />
                                </Link>
                            </Button>

                            {detail.nodes && detail.nodes[0] && detail.nodes[0].failureSummary &&
                                <p className="my-4 whitespace-pre">
                                    {detail.nodes[0].failureSummary}
                                </p>
                            }
                            {detail.nodes && detail.nodes.map((node, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <AxeReportNode node={node} />
                                        <UIDivider />
                                    </React.Fragment>
                                )
                            })}
                        </LazyAccordionItem>
                    )
                })}
            </Accordion>
        </LazyAccordionItem>
    )
}


