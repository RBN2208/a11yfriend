import {NodeResult} from "axe-core";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {TypographyP} from "@/components/typography/typography-elements";

type AxeReportNodeProps = {
    node: NodeResult
}

export function AxeReportNode(props: AxeReportNodeProps) {
    return (
        <div className="SyntaxHighlighterWrapper">
            {props.node.target.map((target, index) => (
                <SyntaxHighlighter
                    key={index}
                    language="css"
                    wrapLongLines={false}
                >
                    {target}
                </SyntaxHighlighter>
            ))}
            <SyntaxHighlighter
                language="html"
                wrapLongLines={true}
            >
                {props.node.html}
            </SyntaxHighlighter>
        </div>
    )
}