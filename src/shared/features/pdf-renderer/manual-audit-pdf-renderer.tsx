import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { AuditResult } from "@/features/audit/manual/types/types";
import {
    TipTapDoc,
    TipTapText,
    TipTapParagraph,
    TipTapBulletList,
    TipTapOrderedList,
    TipTapListItem,
    TipTapBlockquote,
    TipTapCodeBlock,
    TipTapHeading
} from "@/shared/components/tiptap/types";
import { getStaticCriteriaById } from "@/shared/staticData/audit/criteria";
import {ManualAuditPDFExportProps, PDFTranslations} from "@/shared/features/pdf-renderer/types/types";

// Create styles
const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 11,
        fontFamily: 'Helvetica',
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#333',
        paddingBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold' as const,
        marginBottom: 8,
        color: '#1a1a1a',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    conformanceBadge: {
        fontSize: 12,
        backgroundColor: '#e0e0e0',
        padding: 4,
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginTop: 8,
    },
    section: {
        marginTop: 16,
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: 4,
    },
    finding: {
        marginBottom: 12,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 4,
        borderLeftWidth: 3,
    },
    findingPassed: {
        borderLeftColor: '#22c55e',
    },
    findingFailed: {
        borderLeftColor: '#ef4444',
    },
    findingNotChecked: {
        borderLeftColor: '#f59e0b',
    },
    findingNotApplicable: {
        borderLeftColor: '#6b7280',
    },
    findingHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    findingName: {
        fontSize: 12,
        fontWeight: 'bold',
        flex: 1,
    },
    findingStatus: {
        fontSize: 10,
        padding: 2,
        borderRadius: 2,
    },
    statusPassed: {
        backgroundColor: '#dcfce7',
        color: '#166534',
    },
    statusFailed: {
        backgroundColor: '#fee2e2',
        color: '#991b1b',
    },
    statusNotChecked: {
        backgroundColor: '#fef3c7',
        color: '#92400e',
    },
    statusNotApplicable: {
        backgroundColor: '#f3f4f6',
        color: '#374151',
    },
    findingContent: {
        fontSize: 10,
        color: '#444',
        marginTop: 4,
    },
    paragraph: {
        marginBottom: 4,
    },
    bold: {
        fontWeight: 'bold',
    },
    italic: {
        fontStyle: 'italic',
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        fontSize: 9,
        color: '#999',
        textAlign: 'center',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 10,
    },
    // Additional styles for TipTap content
    contentParagraph: {
        marginBottom: 4,
    },
    blockquote: {
        marginLeft: 10,
        paddingLeft: 8,
        borderLeftWidth: 2,
        borderLeftColor: '#ccc',
        fontStyle: 'italic',
        marginBottom: 4,
    },
    codeBlock: {
        backgroundColor: '#f4f4f4',
        padding: 6,
        fontFamily: 'Courier',
        fontSize: 9,
        marginBottom: 4,
    },
    listItem: {
        flexDirection: 'row',
        marginBottom: 2,
        paddingLeft: 8,
    },
    listBullet: {
        width: 12,
    },
    listContent: {
        flex: 1,
    },
    headingText: {
        fontWeight: 'bold',
        fontSize: 11,
        marginBottom: 4,
    },
});

const getStatusStyle = (status: AuditResult['status'], variant: 'state' | 'border') => {
    switch (status) {
        case 'checked':
            return variant === 'border' ? styles.findingPassed : styles.statusPassed;
        case 'failed':
            return variant === 'border' ? styles.findingFailed : styles.statusFailed;
        case 'not_checked':
            return variant === 'border' ? styles.findingNotChecked : styles.statusNotChecked;
        case 'not_applicable':
            return variant === 'border' ? styles.findingNotApplicable : styles.statusNotApplicable;
        default:
            return {};
    }
};

/**
 * Renders a TipTap text node with marks (bold, italic, strike) as React-PDF Text elements
 */
const renderTextWithMarks = (textNode: TipTapText, index: number): React.ReactNode => {
    const text = textNode.text || '';
    if (!textNode.marks || textNode.marks.length === 0) {
        return <Text key={index}>{text}</Text>;
    }

    const hasBold = textNode.marks.some(m => m.type === 'bold');
    const hasItalic = textNode.marks.some(m => m.type === 'italic');
    const hasStrike = textNode.marks.some(m => m.type === 'strike');

    // Build style object based on marks
    const textStyle: Record<string, string> = {};
    if (hasBold) textStyle.fontWeight = 'bold';
    if (hasItalic) textStyle.fontStyle = 'italic';
    // Note: @react-pdf/renderer doesn't support textDecoration for strikethrough natively
    // We'll represent it with ~text~ notation
    const displayText = hasStrike ? `~${text}~` : text;

    return (
        <Text key={index} style={textStyle}>
            {displayText}
        </Text>
    );
};

/**
 * Renders paragraph content (array of TipTapText nodes)
 */
const renderParagraphContent = (content: TipTapText[] | undefined): React.ReactNode => {
    if (!content || content.length === 0) return null;
    return content.map((textNode, index) => renderTextWithMarks(textNode, index));
};

/**
 * Renders a single TipTap paragraph
 */
const renderParagraph = (paragraph: TipTapParagraph, index: number): React.ReactNode => {
    return (
        <Text key={`p-${index}`} style={styles.contentParagraph}>
            {renderParagraphContent(paragraph.content)}
        </Text>
    );
};

/**
 * Renders a bullet list
 */
const renderBulletList = (list: TipTapBulletList, index: number): React.ReactNode => {
    return (
        <View key={`ul-${index}`}>
            {list.content.map((listItem: TipTapListItem, itemIndex: number) => (
                <View key={`li-${itemIndex}`} style={styles.listItem}>
                    <Text style={styles.listBullet}>•</Text>
                    <View style={styles.listContent}>
                        {listItem.content.map((para, paraIndex) => renderParagraph(para, paraIndex))}
                    </View>
                </View>
            ))}
        </View>
    );
};

/**
 * Renders an ordered list
 */
const renderOrderedList = (list: TipTapOrderedList, index: number): React.ReactNode => {
    return (
        <View key={`ol-${index}`}>
            {list.content.map((listItem: TipTapListItem, itemIndex: number) => (
                <View key={`li-${itemIndex}`} style={styles.listItem}>
                    <Text style={styles.listBullet}>{itemIndex + 1}.</Text>
                    <View style={styles.listContent}>
                        {listItem.content.map((para, paraIndex) => renderParagraph(para, paraIndex))}
                    </View>
                </View>
            ))}
        </View>
    );
};

/**
 * Renders a blockquote
 */
const renderBlockquote = (blockquote: TipTapBlockquote, index: number): React.ReactNode => {
    return (
        <View key={`bq-${index}`} style={styles.blockquote}>
            {blockquote.content.map((para, paraIndex) => renderParagraph(para, paraIndex))}
        </View>
    );
};

/**
 * Renders a code block
 */
const renderCodeBlock = (codeBlock: TipTapCodeBlock, index: number): React.ReactNode => {
    const codeText = codeBlock.content
        .map((textNode) => textNode.text || '')
        .join('');

    return (
        <View key={`code-${index}`} style={styles.codeBlock}>
            <Text>{codeText}</Text>
        </View>
    );
};

/**
 * Renders a heading
 */
const renderHeading = (heading: TipTapHeading, index: number): React.ReactNode => {
    return (
        <View key={`h-${index}`}>
            {heading.content.map((para, paraIndex) => (
                <Text key={`hp-${paraIndex}`} style={styles.headingText}>
                    {renderParagraphContent(para.content)}
                </Text>
            ))}
        </View>
    );
};

// Type guard functions for TipTap nodes
type TipTapNode = TipTapParagraph | TipTapBulletList | TipTapOrderedList | TipTapBlockquote | TipTapCodeBlock | TipTapHeading;

const isParagraph = (node: TipTapNode): node is TipTapParagraph => node.type === 'paragraph';
const isBulletList = (node: TipTapNode): node is TipTapBulletList => node.type === 'bulletList';
const isOrderedList = (node: TipTapNode): node is TipTapOrderedList => node.type === 'orderedList';
const isBlockquote = (node: TipTapNode): node is TipTapBlockquote => node.type === 'blockquote';
const isCodeBlock = (node: TipTapNode): node is TipTapCodeBlock => node.type === 'codeBlock';
const isHeading = (node: TipTapNode): node is TipTapHeading => node.type === 'heading';

/**
 * Renders TipTap document content as React-PDF elements
 * Supports paragraphs, bullet lists, ordered lists, blockquotes, code blocks, and headings
 * Also handles text marks (bold, italic, strikethrough)
 */
const renderTipTapContent = (doc: TipTapDoc | null): React.ReactNode => {
    if (!doc || !doc.content) return null;

    return (doc.content as TipTapNode[]).map((node: TipTapNode, index: number) => {
        if (isParagraph(node)) {
            return renderParagraph(node, index);
        }
        if (isBulletList(node)) {
            return renderBulletList(node, index);
        }
        if (isOrderedList(node)) {
            return renderOrderedList(node, index);
        }
        if (isBlockquote(node)) {
            return renderBlockquote(node, index);
        }
        if (isCodeBlock(node)) {
            return renderCodeBlock(node, index);
        }
        if (isHeading(node)) {
            return renderHeading(node, index);
        }
        return null;
    });
};

const FindingItem = ({ finding, translations }: { finding: AuditResult, translations: PDFTranslations }) => {
    const criteria = getStaticCriteriaById(finding.id);
    const criteriaName = criteria?.name || finding.id;
    const findingsContent = renderTipTapContent(finding.findings);

    return (
        <View style={[styles.finding, getStatusStyle(finding.status, 'border')]}>
            <View style={styles.findingHeader}>
                <Text style={styles.findingName}>
                    {criteriaName}
                </Text>
                <Text style={[styles.findingStatus, getStatusStyle(finding.status, 'state')]}>
                    {translations[finding.status]}
                </Text>
            </View>
            {findingsContent && (
                <View style={styles.findingContent}>
                    {findingsContent}
                </View>
            )}
        </View>
    );
};

/**
 * PDF Document component for ManualAudit export.
 * basic structure like showcased in the react-pdf documentation.
 * @param audit
 * @param translations
 * @constructor
 */
export const ManualAuditPDFDocument = ({audit, translations}: ManualAuditPDFExportProps) => {
    const passedFindings = audit.findings.filter(f => f.status === 'checked');
    const failedFindings = audit.findings.filter(f => f.status === 'failed');
    const notCheckedFindings = audit.findings.filter(f => f.status === 'not_checked');
    const notApplicableFindings = audit.findings.filter(f => f.status === 'not_applicable');

    return (
        <Document>
            <Page size="A4" style={styles.page}>

                <View style={styles.header}>
                    <Text style={styles.title}>{audit.name}</Text>
                    {audit.description && (
                        <Text style={styles.subtitle}>{audit.description}</Text>
                    )}
                    <Text style={styles.conformanceBadge}>
                        WCAG 2.2 Level {audit.conformance}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        {translations.summary}
                    </Text>
                    <Text style={styles.paragraph}>
                        {translations.checked}: {passedFindings.length} |
                        {translations.failed}: {failedFindings.length} |
                        {translations.not_checked}: {notCheckedFindings.length} |
                        {translations.not_applicable}: {notApplicableFindings.length}
                    </Text>
                </View>

                {failedFindings.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            {translations.failedTests} ({failedFindings.length})
                        </Text>
                        {failedFindings.map((finding) => (
                            <FindingItem
                                key={finding.id}
                                finding={finding}
                                translations={translations}
                            />
                        ))}
                    </View>
                )}

                {passedFindings.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            {translations.successTests} ({passedFindings.length})
                        </Text>
                        {passedFindings.map((finding) => (
                            <FindingItem
                                key={finding.id}
                                finding={finding}
                                translations={translations}
                            />
                        ))}
                    </View>
                )}

                {notApplicableFindings.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            {translations.notApplicableTests} ({notApplicableFindings.length})
                        </Text>
                        {notApplicableFindings.map((finding) => (
                            <FindingItem
                                key={finding.id}
                                finding={finding}
                                translations={translations}
                            />
                        ))}
                    </View>
                )}

                {notCheckedFindings.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            {translations.notCheckedTests} ({notCheckedFindings.length})
                        </Text>
                        {notCheckedFindings.map((finding) => (
                            <FindingItem
                                key={finding.id}
                                finding={finding}
                                translations={translations}
                            />
                        ))}
                    </View>
                )}

                <Text style={styles.footer}>
                    {translations.footerText}
                </Text>
            </Page>
        </Document>
    );
};
