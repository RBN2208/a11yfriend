import {AxeResults} from "axe-core";

export type AxeReport = AxeResults;

export type SupabaseReport = {
    id: string,
    name: string,
    urls: string,
    axeReports: AxeReport[]
}
export type AxeReportConfig = {
    urls: string,
    /*
      TODO:
       - add option to enable / disable rules => https://github.com/dequelabs/axe-core/blob/master/doc/rule-descriptions.md
       - withTags => add option to enable / disable specific tags
       - disableFrame => add option to specify ids to content which should be excluded
     */
}