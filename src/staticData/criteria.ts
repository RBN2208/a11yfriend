import { WCAGAuditFormType } from '@/features/audit/types/types';

export function getCriteriaLengths(conformance: 'A' | 'AA' | 'AAA'){
  const map = {
    A: 31,
    AA: 55, // A + 24 for AA
    AAA: 86 // AA + 31 for AAA
  }
  return map[conformance];
}

export type WCAGCriteriaType = Pick<WCAGAuditFormType, 'id' | 'category' | 'guideLine' | 'name' | 'conformance' | 'referenceLink'>;

export const WCAGCriterias: WCAGCriteriaType[] = [
  {
    id: '1-1-1-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.1 – Text Alternatives',
    name: '1.1.1 Non-text Content',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#non-text-content',
  },
  {
    id: '1-2-1-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.2 – Time-based media',
    name: '1.2.1 Audio-only and Video-only (prerecorded)',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#audio-only-and-video-only-prerecorded'
  },
  {
    id: '1-2-2-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.2 – Time-based media',
    name: '1.2.2 Captions (Prerecorded)',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#captions-prerecorded'
  },
  {
    id: '1-2-3-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.2 – Time-based media',
    name: '1.2.3 Audio Description or Media Alternative (Prerecorded)',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#audio-description-or-media-alternative-prerecorded'
  },
  {
    id: '1-2-4-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.2 – Time-based media',
    name: '1.2.4 Captions (live)',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#captions-live'
  },
  {
    id: '1-2-5-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.2 – Time-based media',
    name: '1.2.5 Audio Description (Prerecorded)',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#audio-description-prerecorded'
  },
  {
    id: '1-2-6-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.2 – Time-based media',
    name: '1.2.6 Sign Language (Prerecorded)',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#sign-language-prerecorded'
  },
  {
    id: '1-2-7-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.2 – Time-based media',
    name: '1.2.7 Extended Audio Description (Prerecorded)',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#extended-audio-description-prerecorded'
  },
  {
    id: '1-2-8-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.2 – Time-based media',
    name: '1.2.8 Media Alternative (Prerecorded)',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#media-alternative-prerecorded'
  },
  {
    id: '1-2-9-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.2 – Time-based media',
    name: '1.2.9 Audio-only (live)',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#audio-only-live'
  },
  {
    id: '1-3-1-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.3 – Adaptable',
    name: '1.3.1 Info and Relationship',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#info-and-relationships'
  },
  {
    id: '1-3-2-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.3 – Adaptable',
    name: '1.3.2 Meaningful sequence',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#meaningful-sequence'
  },
  {
    id: '1-3-3-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.3 – Adaptable',
    name: '1.3.3 Sensory characteristics',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#sensory-characteristics'
  },
  {
    id: '1-3-4-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.3 – Adaptable',
    name: '1.3.4 Orientation',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#orientation'
  },
  {
    id: '1.3-5-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.3 – Adaptable',
    name: '1.3.5 Identify Input Purpose',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#identify-input-purpose'
  },
  {
    id: '1-3-6-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.3 – Adaptable',
    name: '1.3.6 Identify Purpose',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#identify-purpose'
  },
  {
    id: '1-4-1-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.4 – Distinguishable',
    name: '1.4.1 Use of color',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#use-of-color'
  },
  {
    id: '1-4-2-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.4 – Distinguishable',
    name: '1.4.2 Audio Control',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#audio-control'
  },
  {
    id: '1-4-3-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.4 – Distinguishable',
    name: '1.4.3 Contrast (minimum)',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#contrast-minimum'
  },
  {
    id: '1-4-4-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.4 – Distinguishable',
    name: '1.4.4 Resize text',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#resize-text'
  },
  {
    id: '1-4-5-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.4 – Distinguishable',
    name: '1.4.5 Images of Text',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#images-of-text'
  },
  {
    id: '1-4-6-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.4 – Distinguishable',
    name: '1.4.6 Contrast (Enhanced)',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#contrast-enhanced'
  },
  {
    id: '1-4-7-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.4 – Distinguishable',
    name: '1.4.7 Low or No Background Audio',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#low-or-no-background-audio'
  },
  {
    id: '1-4-8-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.4 – Distinguishable',
    name: '1.4.8 Visual Presentation',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#visual-presentation'
  },
  {
    id: '1-4-9-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.4 – Distinguishable',
    name: '1.4.9 Images of Text (no exception)',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#images-of-text-no-exception'
  },
  {
    id: '1-4-10-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.4 – Distinguishable',
    name: '1.4.10 Reflow',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#reflow'
  },
  {
    id: '1-4-11-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.4 – Distinguishable',
    name: '1.4.11 Non-text Contrast',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#non-text-contrast'
  },
  {
    id: '1-4-12-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.4 – Distinguishable',
    name: '1.4.12 Text Spacing',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#text-spacing'
  },
  {
    id: '1-4-13-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.4 – Distinguishable',
    name: '1.4.13 Content on Hover or Focus',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#content-on-hover-or-focus'
  },
  {
    id: '2-1-1-operable',
    category: "Operable",
    guideLine: 'Guideline 2.1 – Keyboard Accessible',
    name: '2.1.1 Keyboard',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#keyboard'
  },
  {
    id: '2-1-2-operable',
    category: "Operable",
    guideLine: 'Guideline 2.1 – Keyboard Accessible',
    name: '2.1.2 No Keyboard Trap',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#no-keyboard-trap'
  },
  {
    id: '2-1-3-operable',
    category: "Operable",
    guideLine: 'Guideline 2.1 – Keyboard Accessible',
    name: '2.1.3 Keyboard (No Exception)',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#keyboard-no-exception'
  },
  {
    id: '2-1-4-operable',
    category: "Operable",
    guideLine: 'Guideline 2.1 – Keyboard Accessible',
    name: '2.1.4 Character Key Shortcuts',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#character-key-shortcuts'
  },
  {
    id: '2-2-1-operable',
    category: "Operable",
    guideLine: 'Guideline 2.2 – Enough Time',
    name: '2.2.1 Timing Adjustable',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#timing-adjustable'
  },
  {
    id: '2-2-2-operable',
    category: "Operable",
    guideLine: 'Guideline 2.2 – Enough Time',
    name: '2.2.2 Pause, Stop, Hide',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#pause-stop-hide'
  },
  {
    id: '2-2-3-operable',
    category: "Operable",
    guideLine: 'Guideline 2.2 – Enough Time',
    name: '2.2.3 No Timing',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#no-timing'
  },
  {
    id: '2-2-4-operable',
    category: "Operable",
    guideLine: 'Guideline 2.2 – Enough Time',
    name: '2.2.4 Interruptions',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#interruptions'
  },
  {
    id: '2-2-5-operable',
    category: "Operable",
    guideLine: 'Guideline 2.2 – Enough Time',
    name: '2.2.5 Re-Authenticating',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#re-authenticating'
  },
  {
    id: '2-2-6-operable',
    category: "Operable",
    guideLine: 'Guideline 2.2 – Enough Time',
    name: '2.2.6 Timeouts',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#timeouts'
  },
  {
    id: '2-3-1-operable',
    category: "Operable",
    guideLine: 'Guideline 2.3 – Seizures and Physical Reactions',
    name: '2.3.1 Three Flashes or Below Treshold',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#three-flashes-or-below-threshold'
  },
  {
    id: '2-3-2-operable',
    category: "Operable",
    guideLine: 'Guideline 2.3 – Seizures and Physical Reactions',
    name: '2.3.2 Three Flashes',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#three-flashes'
  },
  {
    id: '2-3-3-operable',
    category: "Operable",
    guideLine: 'Guideline 2.3 – Seizures and Physical Reactions',
    name: '2.3.3 Animation from Interactions',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#animation-from-interactions'
  },
  {
    id: '2-4-1-operable',
    category: "Operable",
    guideLine: 'Guideline 2.4 – Navigable',
    name: '2.4.1 Bypass Blocks',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#bypass-blocks'
  },
  {
    id: '2-4-2-operable',
    category: "Operable",
    guideLine: 'Guideline 2.4 – Navigable',
    name: '2.4.2 Page Titled',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#page-titled'
  },
  {
    id: '2-4-3-operable',
    category: "Operable",
    guideLine: 'Guideline 2.4 – Navigable',
    name: '2.4.3 Focus Order',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#focus-order'
  },
  {
    id: '2-4-4-operable',
    category: "Operable",
    guideLine: 'Guideline 2.4 – Navigable',
    name: '2.4.4 Link Purpose (In Context)',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#link-purpose-in-context'
  },
  {
    id: '2-4-5-operable',
    category: "Operable",
    guideLine: 'Guideline 2.4 – Navigable',
    name: '2.4.5 Multiple Ways',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#multiple-ways'
  },
  {
    id: '2-4-6-operable',
    category: "Operable",
    guideLine: 'Guideline 2.4 – Navigable',
    name: '2.4.6 Headings and Labels',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#headings-and-labels'
  },
  {
    id: '2-4-7-operable',
    category: "Operable",
    guideLine: 'Guideline 2.4 – Navigable',
    name: '2.4.7 Focus Visbible',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#focus-visible'
  },
  {
    id: '2-4-8-operable',
    category: "Operable",
    guideLine: 'Guideline 2.4 – Navigable',
    name: '2.4.8 Location',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#location'
  },
  {
    id: '2-4-9-operable',
    category: "Operable",
    guideLine: 'Guideline 2.4 – Navigable',
    name: '2.4.9 Link Purpose (Link-only)',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#link-purpose-link-only'
  },
  {
    id: '2-4-10-operable',
    category: "Operable",
    guideLine: 'Guideline 2.4 – Navigable',
    name: '2.4.10 Section Headings',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#section-headings'
  },
  {
    id: '2-4-11-operable',
    category: "Operable",
    guideLine: 'Guideline 2.4 – Navigable',
    name: '2.4.11 Focus not Obscured (Minium)',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#focus-not-obscured-minimum'
  },
  {
    id: '2-4-12-operable',
    category: "Operable",
    guideLine: 'Guideline 2.4 – Navigable',
    name: '2.4.12 Focus not Obscured (Enhanced)',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#focus-not-obscured-enhanced'
  },
  {
    id: '2-4-13-operable',
    category: "Operable",
    guideLine: 'Guideline 2.4 – Navigable',
    name: '2.4.13 Focus Appearance',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#focus-appearance'
  },
  {
    id: '2-5-1-operable',
    category: "Operable",
    guideLine: 'Guideline 2.5 – Input Modalities',
    name: '2.5.1 Pointer Gestures',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#pointer-gestures'
  },
  {
    id: '2-5-2-operable',
    category: "Operable",
    guideLine: 'Guideline 2.5 – Input Modalities',
    name: '2.5.2 Pointer Cancellation',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#pointer-cancellation'
  },
  {
    id: '2-5-3-operable',
    category: "Operable",
    guideLine: 'Guideline 2.5 – Input Modalities',
    name: '2.5.3 Label in Name',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#label-in-name'
  },
  {
    id: '2-5-4-operable',
    category: "Operable",
    guideLine: 'Guideline 2.5 – Input Modalities',
    name: '2.5.4 Motion Actuation',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#motion-actuation'
  },
  {
    id: '2-5-5-operable',
    category: "Operable",
    guideLine: 'Guideline 2.5 – Input Modalities',
    name: '2.5.5 Target Site (Enhanced)',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#target-size-enhanced'
  },
  {
    id: '2-5-6-operable',
    category: "Operable",
    guideLine: 'Guideline 2.5 – Input Modalities',
    name: '2.5.6 Concurrent Input Mechanisms',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#concurrent-input-mechanisms'
  },
  {
    id: '2-5-7-operable',
    category: "Operable",
    guideLine: 'Guideline 2.5 – Input Modalities',
    name: '2.5.7 Dragging Movements',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#dragging-movements'
  },
  {
    id: '2-5-8-operable',
    category: "Operable",
    guideLine: 'Guideline 2.5 – Input Modalities',
    name: '2.5.8 Target Size (Minimum)',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#target-size-minimum'
  },
  {
    id: '3-1-1-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.1 – Readable',
    name: '3.1.1 Language of Page',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#language-of-page'
  },
  {
    id: '3-1-2-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.1 – Readable',
    name: '3.1.2 Language of Parts',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#language-of-parts'
  },
  {
    id: '3-1-3-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.1 – Readable',
    name: '3.1.3 Unusual Words',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#unusual-words'
  },
  {
    id: '3-1-4-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.1 – Readable',
    name: '3.1.4 Abbreviations',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#abbreviations'
  },
  {
    id: '3-1-5-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.1 – Readable',
    name: '3.1.5 Reading conformance',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#reading-conformance'
  },
  {
    id: '3-1-6-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.1 – Readable',
    name: '3.1.6 Pronunciation',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#pronunciation'
  },
  {
    id: '3-2-1-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.2 – Predictable',
    name: '3.2.1 On Focus',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#on-focus'
  },
  {
    id: '3-2-2-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.2 – Predictable',
    name: '3.2.2 On Input',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#on-input'
  },
  {
    id: '3-2-3-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.2 – Predictable',
    name: '3.2.3 Consistent Navigation',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#consistent-navigation'
  },
  {
    id: '3-2-4-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.2 – Predictable',
    name: '3.2.4 Consistent Identification',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#consistent-identification'
  },
  {
    id: '3-2-5-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.2 – Predictable',
    name: '3.2.5 Change on Request',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#change-on-request'
  },
  {
    id: '3-2-6-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.2 – Predictable',
    name: '3.2.6 Consistent Help',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#consistent-help'
  },
  {
    id: '3-3-1-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.3 – Input Assistance',
    name: '3.3.1 Error Identification',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#error-identification'
  },
  {
    id: '3-3-2-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.3 – Input Assistance',
    name: '3.3.2 Labels or Instructions',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#labels-or-instructions'
  },
  {
    id: '3-3-3-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.3 – Input Assistance',
    name: '3.3.3 Error Suggestion',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#error-suggestion'
  },
  {
    id: '3-3-4-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.3 – Input Assistance',
    name: '3.3.4 Error Prevention (Legal, Financial, Data)',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#error-prevention-legal-financial-data'
  },
  {
    id: '3-3-5-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.3 – Input Assistance',
    name: '3.3.5 Help',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#help'
  },
  {
    id: '3-3-6-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.3 – Input Assistance',
    name: '3.3.6 Error Prevention (all)',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#error-prevention-all'
  },
  {
    id: '3-3-7-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.3 – Input Assistance',
    name: '3.3.7 Redundant Entry',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#redundant-entry'
  },
  {
    id: '3-3-8-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.3 – Input Assistance',
    name: '3.3.8 Accessible Authentication (Minimum)',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#accessible-authentication-minimum'
  },
  {
    id: '3-3-9-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.3 – Input Assistance',
    name: '3.3.9 Accessible Authentication (Enhanced)',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#accessible-authentication-enhanced'
  },
  {
    id: '4-1-2-robust',
    category: "Robust",
    guideLine: 'Guideline 4.1 – Compatible',
    name: '4.1.2 Name, Role, Value',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#name-role-value'
  },
  {
    id: '4-1-3-robust',
    category: "Robust",
    guideLine: 'Guideline 4.1 – Compatible',
    name: '4.1.3 Status Messages',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#status-messages'
  }
]
