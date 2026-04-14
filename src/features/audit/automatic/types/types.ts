/**
 * Automatic interface, represents an own table in the database.
 * {id} is primary key.
 * {user_id} is foreign key relating to
 * {created_at} and {updated_at} are Dates from Supabase.
 */
export interface AutomaticAudit {
  id: string;
  user_id: string;
  name: string;
  description: string;
  urls: { url: string }[];
  findings: AuditResult[];
  created_at: string;
  updated_at: string;
}

export type AuditResult = {
  axe_results: AutomaticAuditAxeResults | null,
  created_at: string
}

export type AutomaticAuditAxeResults = {
  url: string,
  timestamp: string,
  violations: Result[],
  passes: Result[],
  incomplete: IncompleteResult[],
  inapplicable: Result[],
  testEngine: {
    name: string
    version: string
  },
  testRunner: {
    name: string
  },
  testEnvironment: {
    userAgent: string
    windowWidth: number
    windowHeight: number
    orientationAngle?: number
    orientationType?: string
  }
}

export interface Result {
  description: string
  help: string
  helpUrl: string
  id: string
  impact?: ImpactValue
  tags: string[]
  nodes: NodeResult[]
}

export interface SerialError {
  message: string;
  stack: string;
  name: string;
  cause?: SerialError;
}

export interface SerialDqElement {
  source: string;
  nodeIndexes: number[];
  selector: string;
  xpath: string[];
  ancestry: string;
}

export interface RuleError {
  name: string;
  message: string;
  stack: string;
  ruleId?: string;
  method?: string;
  cause?: SerialError;
  errorNode?: SerialDqElement;
}

export interface IncompleteResult extends Result {
  error?: Omit<RuleError, "errorNode">
}

export type ImpactValue = "minor" | "moderate" | "serious" | "critical" | null;

export interface RelatedNode {
  html: string;
  target: string;
  xpath?: string[];
  ancestry?: string;
  element?: HTMLElement;
}

export interface CheckResult {
  id: string;
  impact: string;
  message: string;
  data: any;
  relatedNodes?: RelatedNode[];
}

export interface NodeResult {
  html: string;
  impact?: ImpactValue;
  target: UnlabelledFrameSelector;
  xpath?: string[];
  ancestry?: UnlabelledFrameSelector;
  any: CheckResult[];
  all: CheckResult[];
  none: CheckResult[];
  failureSummary?: string;
  element?: HTMLElement;
}

type UnlabelledFrameSelector = CrossTreeSelector[];
type CrossTreeSelector = BaseSelector | ShadowDomSelector;
type BaseSelector = string;
type ShadowDomSelector = MultiArray<BaseSelector>;
type MultiArray<T> = [T, T, ...T[]];
