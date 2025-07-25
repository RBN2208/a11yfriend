import { WCAGAuditFormType } from '@/types/audit/types';

export function getCriteriaLengths(conformance: 'A' | 'AA' | 'AAA'){
  const map = {
    A: 31,
    AA: 55, // A + 24 for AA
    AAA: 86 // AA + 31 for AAA
  }
  return map[conformance];
}

export type WCAGCriteriaType = Pick<WCAGAuditFormType, 'id' | 'category' | 'guideLine' | 'name' | 'level' | 'referenceLink'>;

export const WCAGCriterias: WCAGCriteriaType[] = [
  {
    id: '1-1-1-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.1 – Text Alternatives',
    name: '1.1.1 Non-text Content',
    level: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#non-text-content',
  },
  {
    id: '1-2-1-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.2 – Time-based media',
    name: '1.2.1 Audio-only and Video-only (prerecorded)',
    level: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#audio-only-and-video-only-prerecorded'
  },
  {
    id: '1-2-2-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.2 – Time-based media',
    name: '1.2.2 Captions (Prerecorded)',
    level: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#captions-prerecorded'
  },
  {
    id: '1-2-3-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.2 – Time-based media',
    name: '1.2.3 Audio Description or Media Alternative (Prerecorded)',
    level: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#audio-description-or-media-alternative-prerecorded'
  },
  {
    id: '1-2-4-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.2 – Time-based media',
    name: '1.2.4 Captions (live)',
    level: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#captions-live'
  },
  {
    id: '1-2-5-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.2 – Time-based media',
    name: '1.2.5 Audio Description (Prerecorded)',
    level: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#audio-description-prerecorded'
  },
  {
    id: '1-2-6-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.2 – Time-based media',
    name: '1.2.6 Sign Language (Prerecorded)',
    level: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#sign-language-prerecorded'
  },
  {
    id: '1-2-7-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.2 – Time-based media',
    name: '1.2.7 Extended Audio Description (Prerecorded)',
    level: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#extended-audio-description-prerecorded'
  },
  {
    id: '1-2-8-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.2 – Time-based media',
    name: '1.2.8 Media Alternative (Prerecorded)',
    level: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#media-alternative-prerecorded'
  },
  {
    id: '1-2-9-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.2 – Time-based media',
    name: '1.2.9 Audio-only (live)',
    level: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#audio-only-live'
  },
  {
    id: '1-3-1-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.3 – Adaptable',
    name: '1.3.1 Info and Relationship',
    level: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#info-and-relationshipsd'
  },
  {
    id: '1-3-2-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.3 – Adaptable',
    name: '1.3.2 Meaningful sequence',
    level: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#meaningful-sequence'
  },
  {
    id: '1-3-3-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.3 – Adaptable',
    name: '1.3.3 Sensory characteristics',
    level: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#sensory-characteristics'
  },
  {
    id: '1-3-4-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.3 – Adaptable',
    name: '1.3.4 Orientation',
    level: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#orientation'
  },
  {
    id: '1.3-5-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.3 – Adaptable',
    name: '1.3.5 Identify Input Purpose',
    level: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#identify-input-purpose'
  },
  {
    id: '1-3-6-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.3 – Adaptable',
    name: '1.3.6 Identify Purpose',
    level: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#identify-purpose'
  },
  {
    id: '1-4-1-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.4 – Distinguishable',
    name: '1.4.1 Use of color',
    level: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#use-of-color'
  },
  {
    id: '1-4-2-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.4 – Distinguishable',
    name: '1.4.2 Audio Control',
    level: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#audio-control'
  },
  {
    id: '1-4-3-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.4 – Distinguishable',
    name: '1.4.3 Contrast (minimum)',
    level: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#contrast-minimum'
  },
  {
    id: '1-4-4-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.4 – Distinguishable',
    name: '1.4.4 Resize text',
    level: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#resize-text'
  },
  {
    id: '1-4-5-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.4 – Distinguishable',
    name: '1.4.5 Images of Text',
    level: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#images-of-text'
  },
  {
    id: '1-4-6-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.4 – Distinguishable',
    name: '1.4.6 Contrast (Enhanced)',
    level: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#contrast-enhanced'
  },
  {
    id: '1-4-7-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.4 – Distinguishable',
    name: '1.4.7 Low or No Background Audio',
    level: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#low-or-no-background-audio'
  },
  {
    id: '1-4-8-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.4 – Distinguishable',
    name: '1.4.8 Visual Presentation',
    level: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#visual-presentation'
  },
  {
    id: '1-4-9-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.4 – Distinguishable',
    name: '1.4.9 Images of Text (no exception)',
    level: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#images-of-text-no-exception'
  },
  {
    id: '1-4-10-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.4 – Distinguishable',
    name: '1.4.10 Reflow',
    level: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#reflow'
  },
  {
    id: '1-4-11-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.4 – Distinguishable',
    name: '1.4.11 Non-text Contrast',
    level: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#non-text-contrast'
  },
  {
    id: '1-4-12-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.4 – Distinguishable',
    name: '1.4.12 Text Spacing',
    level: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#text-spacing'
  },
  {
    id: '1-4-13-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.4 – Distinguishable',
    name: '1.4.13 Content on Hover or Focus',
    level: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#content-on-hover-or-focus'
  },
  {
    id: '2-1-1-operable',
    category: "Operable",
    guideLine: 'Guideline 2.1 – Keyboard Accessible',
    name: '2.1.1 Keyboard',
    level: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#keyboard'
  },
  {
    id: '2-1-2-operable',
    category: "Operable",
    guideLine: 'Guideline 2.1 – Keyboard Accessible',
    name: '2.1.2 No Keyboard Trap',
    level: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#no-keyboard-trap'
  },
  {
    id: '2-1-3-operable',
    category: "Operable",
    guideLine: 'Guideline 2.1 – Keyboard Accessible',
    name: '2.1.3 Keyboard (No Exception)',
    level: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#keyboard-no-exception'
  },
  {
    id: '2-1-4-operable',
    category: "Operable",
    guideLine: 'Guideline 2.1 – Keyboard Accessible',
    name: '2.1.4 Character Key Shortcuts',
    level: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#character-key-shortcuts'
  },
  {
    id: '2-2-1-operable',
    category: "Operable",
    guideLine: 'Guideline 2.2 – Enough Time',
    name: '2.2.1 Timing Adjustable',
    level: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#timing-adjustable'
  },
  {
    id: '2-2-2-operable',
    category: "Operable",
    guideLine: 'Guideline 2.2 – Enough Time',
    name: '2.2.2 Pause, Stop, Hide',
    level: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#pause-stop-hide'
  },
  {
    id: '2-2-3-operable',
    category: "Operable",
    guideLine: 'Guideline 2.2 – Enough Time',
    name: '2.2.3 No Timing',
    level: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#no-timing'
  },
  {
    id: '2-2-4-operable',
    category: "Operable",
    guideLine: 'Guideline 2.2 – Enough Time',
    name: '2.2.4 Interruptions',
    level: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#interruptions'
  },
  {
    id: '2-2-5-operable',
    category: "Operable",
    guideLine: 'Guideline 2.2 – Enough Time',
    name: '2.2.5 Re-Authenticating',
    level: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#re-authenticating'
  },
  {
    id: '2-2-6-operable',
    category: "Operable",
    guideLine: 'Guideline 2.2 – Enough Time',
    name: '2.2.6 Timeouts',
    level: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#timeouts'
  },
  {
    id: '2-3-1-operable',
    category: "Operable",
    guideLine: 'Guideline 2.3 – Seizures and Physical Reactions',
    name: '2.3.1 Three Flashes or Below Treshold',
    level: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#three-flashes-or-below-threshold'
  },
  {
    id: '2-3-2-operable',
    category: "Operable",
    guideLine: 'Guideline 2.3 – Seizures and Physical Reactions',
    name: '2.3.2 Three Flashes',
    level: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#three-flashes'
  },
  {
    id: '2-3-3-operable',
    category: "Operable",
    guideLine: 'Guideline 2.3 – Seizures and Physical Reactions',
    name: '2.3.3 Animation from Interactions',
    level: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#animation-from-interactions'
  },
  {
    id: '2-4-1-operable',
    category: "Operable",
    guideLine: 'Guideline 2.4 – Navigable',
    name: '2.4.1 Bypass Blocks',
    level: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#bypass-blocks'
  },
  {
    id: '2-4-2-operable',
    category: "Operable",
    guideLine: 'Guideline 2.4 – Navigable',
    name: '2.4.2 Page Titled',
    level: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#page-titled'
  },
  {
    id: '2-4-3-operable',
    category: "Operable",
    guideLine: 'Guideline 2.4 – Navigable',
    name: '2.4.3 Focus Order',
    level: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#focus-order'
  },
  {
    id: '2-4-4-operable',
    category: "Operable",
    guideLine: 'Guideline 2.4 – Navigable',
    name: '2.4.4 Link Purpose (In Context)',
    level: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#link-purpose-in-context'
  },
  {
    id: '2-4-5-operable',
    category: "Operable",
    guideLine: 'Guideline 2.4 – Navigable',
    name: '2.4.5 Multiple Ways',
    level: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#multiple-ways'
  },
  {
    id: '2-4-6-operable',
    category: "Operable",
    guideLine: 'Guideline 2.4 – Navigable',
    name: '2.4.6 Headings and Labels',
    level: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#headings-and-labels'
  },
  {
    id: '2-4-7-operable',
    category: "Operable",
    guideLine: 'Guideline 2.4 – Navigable',
    name: '2.4.7 Focus Visbible',
    level: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#focus-visible'
  },
  {
    id: '2-4-8-operable',
    category: "Operable",
    guideLine: 'Guideline 2.4 – Navigable',
    name: '2.4.8 Location',
    level: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#location'
  },
  {
    id: '2-4-9-operable',
    category: "Operable",
    guideLine: 'Guideline 2.4 – Navigable',
    name: '2.4.9 Link Purpose (Link-only)',
    level: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#link-purpose-link-only'
  },
  {
    id: '2-4-10-operable',
    category: "Operable",
    guideLine: 'Guideline 2.4 – Navigable',
    name: '2.4.10 Section Headings',
    level: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#section-headings'
  },
  {
    id: '2-4-11-operable',
    category: "Operable",
    guideLine: 'Guideline 2.4 – Navigable',
    name: '2.4.11 Focus not Obscured (Minium)',
    level: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#focus-not-obscured-minimum'
  },
  {
    id: '2-4-12-operable',
    category: "Operable",
    guideLine: 'Guideline 2.4 – Navigable',
    name: '2.4.12 Focus not Obscured (Enhanced)',
    level: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#focus-not-obscured-enhanced'
  },
  {
    id: '2-4-13-operable',
    category: "Operable",
    guideLine: 'Guideline 2.4 – Navigable',
    name: '2.4.13 Focus Appearance',
    level: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#focus-appearance'
  },
  {
    id: '2-5-1-operable',
    category: "Operable",
    guideLine: 'Guideline 2.5 – Input Modalities',
    name: '2.5.1 Pointer Gestures',
    level: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#pointer-gestures'
  },
  {
    id: '2-5-2-operable',
    category: "Operable",
    guideLine: 'Guideline 2.5 – Input Modalities',
    name: '2.5.2 Pointer Cancellation',
    level: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#pointer-cancellation'
  },
  {
    id: '2-5-3-operable',
    category: "Operable",
    guideLine: 'Guideline 2.5 – Input Modalities',
    name: '2.5.3 Label in Name',
    level: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#label-in-name'
  },
  {
    id: '2-5-4-operable',
    category: "Operable",
    guideLine: 'Guideline 2.5 – Input Modalities',
    name: '2.5.4 Motion Actuation',
    level: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#motion-actuation'
  },
  {
    id: '2-5-5-operable',
    category: "Operable",
    guideLine: 'Guideline 2.5 – Input Modalities',
    name: '2.5.5 Target Site (Enhanced)',
    level: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#target-size-enhanced'
  },
  {
    id: '2-5-6-operable',
    category: "Operable",
    guideLine: 'Guideline 2.5 – Input Modalities',
    name: '2.5.6 Concurrent Input Mechanisms',
    level: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#concurrent-input-mechanisms'
  },
  {
    id: '2-5-7-operable',
    category: "Operable",
    guideLine: 'Guideline 2.5 – Input Modalities',
    name: '2.5.7 Dragging Movements',
    level: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#dragging-movements'
  },
  {
    id: '2-5-8-operable',
    category: "Operable",
    guideLine: 'Guideline 2.5 – Input Modalities',
    name: '2.5.8 Target Size (Minimum)',
    level: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#target-size-minimum'
  },
  {
    id: '3-1-1-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.1 – Readable',
    name: '3.1.1 Language of Page',
    level: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#language-of-page'
  },
  {
    id: '3-1-2-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.1 – Readable',
    name: '3.1.2 Language of Parts',
    level: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#language-of-parts'
  },
  {
    id: '3-1-3-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.1 – Readable',
    name: '3.1.3 Unusual Words',
    level: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#unusual-words'
  },
  {
    id: '3-1-4-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.1 – Readable',
    name: '3.1.4 Abbreviations',
    level: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#abbreviations'
  },
  {
    id: '3-1-5-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.1 – Readable',
    name: '3.1.5 Reading Level',
    level: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#reading-level'
  },
  {
    id: '3-1-6-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.1 – Readable',
    name: '3.1.6 Pronunciation',
    level: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#pronunciation'
  },
  {
    id: '3-2-1-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.2 – Predictable',
    name: '3.2.1 On Focus',
    level: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#on-focus'
  },
  {
    id: '3-2-2-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.2 – Predictable',
    name: '3.2.2 On Input',
    level: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#on-input'
  },
  {
    id: '3-2-3-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.2 – Predictable',
    name: '3.2.3 Consistent Navigation',
    level: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#consistent-navigation'
  },
  {
    id: '3-2-4-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.2 – Predictable',
    name: '3.2.4 Consistent Identification',
    level: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#consistent-identification'
  },
  {
    id: '3-2-5-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.2 – Predictable',
    name: '3.2.5 Change on Request',
    level: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#change-on-request'
  },
  {
    id: '3-2-6-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.2 – Predictable',
    name: '3.2.6 Consistent Help',
    level: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#consistent-help'
  },
  {
    id: '3-3-1-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.3 – Input Assistance',
    name: '3.3.1 Error Identification',
    level: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#error-identification'
  },
  {
    id: '3-3-2-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.3 – Input Assistance',
    name: '3.3.2 Labels or Instructions',
    level: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#labels-or-instructions'
  },
  {
    id: '3-3-3-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.3 – Input Assistance',
    name: '3.3.3 Error Suggestion',
    level: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#error-suggestion'
  },
  {
    id: '3-3-4-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.3 – Input Assistance',
    name: '3.3.4 Error Prevention (Legal, Financial, Data)',
    level: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#error-prevention-legal-financial-data'
  },
  {
    id: '3-3-5-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.3 – Input Assistance',
    name: '3.3.5 Help',
    level: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#help'
  },
  {
    id: '3-3-6-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.3 – Input Assistance',
    name: '3.3.6 Error Prevention (all)',
    level: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#error-prevention-all'
  },
  {
    id: '3-3-7-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.3 – Input Assistance',
    name: '3.3.7 Redundant Entry',
    level: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#redundant-entry'
  },
  {
    id: '3-3-8-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.3 – Input Assistance',
    name: '3.3.8 Accessible Authentication (Minimum)',
    level: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#accessible-authentication-minimum'
  },
  {
    id: '3-3-9-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.3 – Input Assistance',
    name: '3.3.9 Accessible Authentication (Enhanced)',
    level: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#accessible-authentication-enhanced'
  },
  {
    id: '4-1-2-robust',
    category: "Robust",
    guideLine: 'Guideline 4.1 – Compatible',
    name: '4.1.2 Name, Role, Value',
    level: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#name-role-value'
  },
  {
    id: '4-1-3-robust',
    category: "Robust",
    guideLine: 'Guideline 4.1 – Compatible',
    name: '4.1.3 Status Messages',
    level: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#status-messages'
  }
]
