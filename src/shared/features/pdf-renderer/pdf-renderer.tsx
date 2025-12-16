import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { ManualAudit, AuditResult } from "@/features/audit/manual/types/types";
import { TipTapDoc, TipTapText } from "@/shared/components/tiptap/types";
import { getStaticCriteriaById } from "@/staticData/audit/criteria";

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
});

const statusLabels: Record<AuditResult['status'], string> = {
    checked: 'Bestanden',
    failed: 'Fehlgeschlagen',
    not_checked: 'Nicht geprüft',
    not_applicable: 'Nicht anwendbar',
};

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

const renderTipTapContent = (doc: TipTapDoc | null): string => {
    if (!doc || !doc.content) return '';

    const extractText = (content: unknown[]): string => {
        return content.map((node: unknown) => {
            const typedNode = node as { type: string; content?: unknown[]; text?: string };
            if (typedNode.type === 'paragraph' && typedNode.content) {
                return (typedNode.content as TipTapText[])
                    .map((textNode) => textNode.text || '')
                    .join('');
            }
            if (typedNode.type === 'text') {
                return typedNode.text || '';
            }
            if (typedNode.content) {
                return extractText(typedNode.content);
            }
            return '';
        }).join('\n');
    };

    return extractText(doc.content as unknown[]);
};

const FindingItem = ({ finding }: { finding: AuditResult }) => {
    const criteria = getStaticCriteriaById(finding.id);
    const criteriaName = criteria?.name || finding.id;
    const findingsText = renderTipTapContent(finding.findings);

    return (
        <View style={[styles.finding, getStatusStyle(finding.status, 'border')]}>
            <View style={styles.findingHeader}>
                <Text style={styles.findingName}>{criteriaName}</Text>
                <Text style={[styles.findingStatus, getStatusStyle(finding.status, 'state')]}>
                    {statusLabels[finding.status]}
                </Text>
            </View>
            {findingsText && (
                <Text style={styles.findingContent}>{findingsText}</Text>
            )}
        </View>
    );
};

export const ManualAuditPDFDocument = ({ audit }: { audit: ManualAudit }) => {
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
                    <Text style={styles.sectionTitle}>Zusammenfassung</Text>
                    <Text style={styles.paragraph}>
                        Bestanden: {passedFindings.length} |
                        Fehlgeschlagen: {failedFindings.length} |
                        Nicht geprüft: {notCheckedFindings.length} |
                        Nicht anwendbar: {notApplicableFindings.length}
                    </Text>
                </View>

                {failedFindings.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            Fehlgeschlagene Prüfungen ({failedFindings.length})
                        </Text>
                        {failedFindings.map((finding) => (
                            <FindingItem key={finding.id} finding={finding} />
                        ))}
                    </View>
                )}

                {passedFindings.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            Bestandene Prüfungen ({passedFindings.length})
                        </Text>
                        {passedFindings.map((finding) => (
                            <FindingItem key={finding.id} finding={finding} />
                        ))}
                    </View>
                )}

                {notApplicableFindings.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            Nicht anwendbar ({notApplicableFindings.length})
                        </Text>
                        {notApplicableFindings.map((finding) => (
                            <FindingItem key={finding.id} finding={finding} />
                        ))}
                    </View>
                )}

                <Text style={styles.footer}>
                    Erstellt am {new Date().toLocaleDateString('de-DE')} | A11yFriend Accessibility Audit
                </Text>
            </Page>
        </Document>
    );
};
