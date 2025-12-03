import {CriteriaDefinition} from "@/staticData/types/types";

export function getCriteriaLengths(conformance: 'A' | 'AA' | 'AAA'){
  const map = {
    A: 31,
    AA: 55, // A + 24 for AA
    AAA: 86 // AA + 31 for AAA
  }
  return map[conformance];
}

export function getStaticCriteriaById(id: string): CriteriaDefinition {
    return WCAGCriterias.filter(c => c.id === id)[0];
}

export const WCAGCriterias: CriteriaDefinition[] = [
  {
    id: '1-1-1-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.1 – Text Alternatives',
    name: '1.1.1 Non-text Content',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#non-text-content',
    userGuide: {
      description: "How to test: 1) Identify all non-text content (images, icons, logos, charts, input buttons, SVGs, canvas). 2) Decorative items are hidden from AT (alt=\"\" or aria-hidden=\"true\"). 3) Meaningful images have concise, purpose-focused alt text. 4) Complex images provide a nearby long description. 5) Image links/buttons describe action/destination. 6) CAPTCHAs have an accessible alternative. 7) Verify with a screen reader that announcements match intent."
    }
  },
  {
    id: '1-2-1-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.2 – Time-based media',
    name: '1.2.1 Audio-only and Video-only (prerecorded)',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#audio-only-and-video-only-prerecorded',
    userGuide: {
      description: "How to test: 1) Find prerecorded audio-only or video-only media. 2) Audio-only: a complete transcript is provided. 3) Video-only: a text or audio description covers essential visuals. 4) Alternatives are on the same page or clearly linked. 5) Confirm keyboard access to media and alternative."
    }
  },
  {
    id: '1-2-2-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.2 – Time-based media',
    name: '1.2.2 Captions (Prerecorded)',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#captions-prerecorded',
    userGuide: {
      description: "How to test: 1) Play video muted. 2) Captions exist, are synchronized, and include dialogue, speakers, and meaningful sounds. 3) Captions are readable (size/contrast) and toggleable via keyboard. 4) For third-party players, confirm captions accessibility."
    }
  },
  {
    id: '1-2-3-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.2 – Time-based media',
    name: '1.2.3 Audio Description or Media Alternative (Prerecorded)',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#audio-description-or-media-alternative-prerecorded',
    userGuide: {
      description: "How to test: 1) If understanding depends on visuals, provide either an audio description track or a full descriptive transcript. 2) The description covers on-screen text, scene changes, and visual cues. 3) Controls to enable audio description are labeled and keyboard accessible. 4) If using a transcript, place/link it adjacent and ensure completeness."
    }
  },
  {
    id: '1-2-4-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.2 – Time-based media',
    name: '1.2.4 Captions (live)',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#captions-live',
    userGuide: {
      description: "How to test: 1) For live video with audio, verify real-time captions (human or high-quality ASR). 2) Captions are synchronized and sufficiently accurate. 3) Users can enable them via keyboard; control is labeled for SR. 4) Observe latency/accuracy in a live segment. 5) Ensure captions do not obscure critical content."
    }
  },
  {
    id: '1-2-5-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.2 – Time-based media',
    name: '1.2.5 Audio Description (Prerecorded)',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#audio-description-prerecorded',
    userGuide: {
      description: "How to test: 1) For prerecorded video, provide audio description for essential visuals. 2) Player exposes a clearly labeled AD control usable by keyboard and SR. 3) Verify that visual-only segments are covered by narration. 4) Alternative described versions are acceptable if equivalent."
    }
  },
  {
    id: '1-2-6-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.2 – Time-based media',
    name: '1.2.6 Sign Language (Prerecorded)',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#sign-language-prerecorded',
    userGuide: {
      description: "How to test: 1) Verify a sign-language version or track exists. 2) Interpreter remains visible and not covered by UI. 3) Users can enable/disable it with accessible, labeled controls. 4) Check size/clarity are sufficient."
    }
  },
  {
    id: '1-2-7-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.2 – Time-based media',
    name: '1.2.7 Extended Audio Description (Prerecorded)',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#extended-audio-description-prerecorded',
    userGuide: {
      description: "How to test: 1) If normal AD cannot fit, provide extended audio description (pauses inserted for narration). 2) Ensure users can select the extended version via keyboard and SR. 3) Play critical scenes to confirm all needed visuals are described without losing sync."
    }
  },
  {
    id: '1-2-8-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.2 – Time-based media',
    name: '1.2.8 Media Alternative (Prerecorded)',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#media-alternative-prerecorded',
    userGuide: {
      description: "How to test: 1) Provide a complete text alternative for synchronized media (dialogue, speakers, on-screen text, visuals). 2) Place it nearby/linked and keep it updated. 3) Verify keyboard access and readability. 4) Confirm the text alone conveys the media’s information."
    }
  },
  {
    id: '1-2-9-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.2 – Time-based media',
    name: '1.2.9 Audio-only (live)',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#audio-only-live',
    userGuide: {
      description: "How to test: 1) For live audio-only, provide a real-time text alternative (captions/stenography) or sign language. 2) Check latency/accuracy. 3) Ensure the access control is keyboard/SR friendly. 4) Verify visibility/contrast of the live text."
    }
  },
  {
    id: '1-3-1-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.3 – Adaptable',
    name: '1.3.1 Info and Relationship',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#info-and-relationships',
    userGuide: {
      description: "How to test: 1) Inspect structure in DevTools: headings, lists, tables, form labels. 2) Ensure programmatic relationships (label/for, table headers with scope/headers) are present. 3) Turn off CSS or use a SR to confirm information and relationships remain clear."
    }
  },
  {
    id: '1-3-2-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.3 – Adaptable',
    name: '1.3.2 Meaningful sequence',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#meaningful-sequence',
    userGuide: {
      description: "How to test: 1) Disable CSS or linearize the DOM. 2) Navigate by keyboard to confirm the reading/focus order matches the intended meaning. 3) Ensure Tab order and screen-reader reading order are logical and consistent."
    }
  },
  {
    id: '1-3-3-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.3 – Adaptable',
    name: '1.3.3 Sensory characteristics',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#sensory-characteristics',
    userGuide: {
      description: "How to test: 1) Review instructions; they must not rely solely on color, shape, size, or position (e.g., \"click the green button on the right\"). 2) Add programmatic labels or text cues. 3) Simulate color-blindness/grayscale to verify instructions still work."
    }
  },
  {
    id: '1-3-4-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.3 – Adaptable',
    name: '1.3.4 Orientation',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#orientation',
    userGuide: {
      description: "How to test: 1) On mobile, rotate between portrait/landscape. 2) Content and functionality remain available in both orientations unless essential (e.g., game, piano). 3) Verify no hard orientation lock via the viewport meta or CSS unless justified."
    }
  },
  {
    id: '1.3-5-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.3 – Adaptable',
    name: '1.3.5 Identify Input Purpose',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#identify-input-purpose',
    userGuide: {
      description: "How to test: 1) For fields collecting personal data (name, email, address), verify correct autocomplete tokens (e.g., given-name, email, street-address). 2) Use browser autofill to confirm purpose is recognized. 3) Ensure fields are properly labeled and grouped."
    }
  },
  {
    id: '1-3-6-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.3 – Adaptable',
    name: '1.3.6 Identify Purpose',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#identify-purpose',
    userGuide: {
      description: "How to test: 1) Ensure common icons and controls expose roles, names, and purposes programmatically (ARIA roles, labels). 2) Where supported, use standardized semantics/personalization attributes so assistive tech can identify purpose. 3) Confirm SR announces purpose meaningfully."
    }
  },
  {
    id: '1-4-1-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.4 – Distinguishable',
    name: '1.4.1 Use of color',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#use-of-color',
    userGuide: {
      description: "How to test: 1) Check that color is not the only cue for information, error, or state. 2) Links are distinguished by more than color (e.g., underline). 3) Use a color-blindness simulator or grayscale to verify cues remain perceivable."
    }
  },
  {
    id: '1-4-2-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.4 – Distinguishable',
    name: '1.4.2 Audio Control',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#audio-control',
    userGuide: {
      description: "How to test: 1) If audio plays automatically >3s, provide a pause/stop/mute control. 2) Verify control is keyboard accessible and labeled for SR. 3) Confirm audio does not interfere with SR output."
    }
  },
  {
    id: '1-4-3-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.4 – Distinguishable',
    name: '1.4.3 Contrast (minimum)',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#contrast-minimum',
    userGuide: {
      description: "How to test: 1) Measure text contrast (normal text ≥ 4.5:1; large text ≥ 3:1). 2) Use a reliable contrast checker. 3) Check text on backgrounds, gradients, and images. 4) Exclude logos and purely decorative text."
    }
  },
  {
    id: '1-4-4-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.4 – Distinguishable',
    name: '1.4.4 Resize text',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#resize-text',
    userGuide: {
      description: "How to test: 1) Zoom to 200% at a viewport ~1280px wide. 2) Content and functionality remain available without horizontal scrolling for text blocks. 3) Verify no loss of content or overlap; interactive controls remain usable."
    }
  },
  {
    id: '1-4-5-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.4 – Distinguishable',
    name: '1.4.5 Images of Text',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#images-of-text',
    userGuide: {
      description: "How to test: 1) Scan for images of text. 2) Replace with real text whenever possible; logos are exempt. 3) If unavoidable, ensure same visual effect can be achieved and text remains accessible (alt/description)."
    }
  },
  {
    id: '1-4-6-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.4 – Distinguishable',
    name: '1.4.6 Contrast (Enhanced)',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#contrast-enhanced',
    userGuide: {
      description: "How to test: 1) Measure contrast at enhanced levels (normal text ≥ 7:1; large text ≥ 4.5:1). 2) Verify all textual content meets AAA thresholds, excluding logos/branding."
    }
  },
  {
    id: '1-4-7-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.4 – Distinguishable',
    name: '1.4.7 Low or No Background Audio',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#low-or-no-background-audio',
    userGuide: {
      description: "How to test: 1) For audio with speech, background sounds are either absent or at least 20 dB lower than the foreground speech, or a user control mutes background. 2) Verify control is accessible and persistent."
    }
  },
  {
    id: '1-4-8-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.4 – Distinguishable',
    name: '1.4.8 Visual Presentation',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#visual-presentation',
    userGuide: {
      description: "How to test: 1) Ensure users can select foreground/background colors or themes that improve readability, or content supports good defaults. 2) Confirm line length (~80 chars), line/paragraph spacing, and text alignment promote readability. 3) No justified text where it harms readability."
    }
  },
  {
    id: '1-4-9-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.4 – Distinguishable',
    name: '1.4.9 Images of Text (no exception)',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#images-of-text-no-exception',
    userGuide: {
      description: "How to test: 1) Avoid images of text entirely, including stylized headings; logos are exempt. 2) If used, provide an equivalent text alternative and ensure the same effect is achievable with CSS text."
    }
  },
  {
    id: '1-4-10-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.4 – Distinguishable',
    name: '1.4.10 Reflow',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#reflow',
    userGuide: {
      description: "How to test: 1) Narrow viewport to 320 CSS px. 2) Content reflows without two-dimensional scrolling (except for large data tables, images). 3) All functionality remains; no clipped/overlapping text or hidden controls."
    }
  },
  {
    id: '1-4-11-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.4 – Distinguishable',
    name: '1.4.11 Non-text Contrast',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#non-text-contrast',
    userGuide: {
      description: "How to test: 1) Measure contrast of essential graphics and UI component states (borders, icons, focus indicators) ≥ 3:1 against adjacent colors. 2) Verify disabled elements are exempt."
    }
  },
  {
    id: '1-4-12-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.4 – Distinguishable',
    name: '1.4.12 Text Spacing',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#text-spacing',
    userGuide: {
      description: "How to test: 1) Apply CSS: line-height 1.5, paragraph spacing 2, letter-spacing .12em, word-spacing .16em. 2) Ensure no loss of content/functionality and no overlapping or truncation occurs."
    }
  },
  {
    id: '1-4-13-perceivable',
    category: "Perceivable",
    guideLine: 'Guideline 1.4 – Distinguishable',
    name: '1.4.13 Content on Hover or Focus',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#content-on-hover-or-focus',
    userGuide: {
      description: "How to test: 1) For content revealed on hover/focus (tooltips, menus), ensure it is dismissible (Esc), hoverable (pointer can move onto it), and persistent (stays until dismissed). 2) Verify keyboard and SR can operate it."
    }
  },
  {
    id: '2-1-1-operable',
    category: "Operable",
    guideLine: 'Guideline 2.1 – Keyboard Accessible',
    name: '2.1.1 Keyboard',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#keyboard',
    userGuide: {
      description: "How to test: 1) Unplug mouse; use only keyboard to operate all functionality. 2) Ensure visible focus, no dead-ends, and completion of tasks. 3) Confirm shortcut keys are not required to proceed."
    }
  },
  {
    id: '2-1-2-operable',
    category: "Operable",
    guideLine: 'Guideline 2.1 – Keyboard Accessible',
    name: '2.1.2 No Keyboard Trap',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#no-keyboard-trap',
    userGuide: {
      description: "How to test: 1) Try to focus into widgets/modals. 2) Ensure focus can move in and out using keyboard alone (no trap). 3) Provide a clear escape (Esc/Close). 4) Verify SR users can also escape."
    }
  },
  {
    id: '2-1-3-operable',
    category: "Operable",
    guideLine: 'Guideline 2.1 – Keyboard Accessible',
    name: '2.1.3 Keyboard (No Exception)',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#keyboard-no-exception',
    userGuide: {
      description: "How to test: 1) Confirm every function is operable via keyboard without exceptions. 2) Provide alternatives for gestures or pointer-only operations. 3) Validate with SR keyboard navigation."
    }
  },
  {
    id: '2-1-4-operable',
    category: "Operable",
    guideLine: 'Guideline 2.1 – Keyboard Accessible',
    name: '2.1.4 Character Key Shortcuts',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#character-key-shortcuts',
    userGuide: {
      description: "How to test: 1) If single-character shortcuts exist (e.g., \"S\" to submit), ensure users can turn them off, remap, or they only work when the control has focus. 2) Verify toggles are keyboard accessible."
    }
  },
  {
    id: '2-2-1-operable',
    category: "Operable",
    guideLine: 'Guideline 2.2 – Enough Time',
    name: '2.2.1 Timing Adjustable',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#timing-adjustable',
    userGuide: {
      description: "How to test: 1) Identify time limits. 2) Provide a way to turn off, adjust, or extend to at least 10x the default unless essential. 3) Verify the control is discoverable, accessible, and persists across flows."
    }
  },
  {
    id: '2-2-2-operable',
    category: "Operable",
    guideLine: 'Guideline 2.2 – Enough Time',
    name: '2.2.2 Pause, Stop, Hide',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#pause-stop-hide',
    userGuide: {
      description: "How to test: 1) For moving/blinking/auto-updating content, provide Pause/Stop/Hide. 2) Ensure movement >5s is controllable. 3) Verify controls are keyboard/SR accessible and do not disrupt reading."
    }
  },
  {
    id: '2-2-3-operable',
    category: "Operable",
    guideLine: 'Guideline 2.2 – Enough Time',
    name: '2.2.3 No Timing',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#no-timing',
    userGuide: {
      description: "How to test: 1) Confirm tasks are not time-dependent. 2) If timing exists, provide time-independent alternatives. 3) Exceptions: real-time events where timing is essential."
    }
  },
  {
    id: '2-2-4-operable',
    category: "Operable",
    guideLine: 'Guideline 2.2 – Enough Time',
    name: '2.2.4 Interruptions',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#interruptions',
    userGuide: {
      description: "How to test: 1) Check for system/app interruptions (e.g., modals, toasts). 2) Provide a way to postpone or suppress interruptions unless essential. 3) Verify keyboard/SR users can dismiss them easily."
    }
  },
  {
    id: '2-2-5-operable',
    category: "Operable",
    guideLine: 'Guideline 2.2 – Enough Time',
    name: '2.2.5 Re-Authenticating',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#re-authenticating',
    userGuide: {
      description: "How to test: 1) Trigger a session timeout or re-login. 2) Ensure user input/data is preserved or users can re-authenticate without data loss. 3) Verify clear messaging about what happened and how to resume."
    }
  },
  {
    id: '2-2-6-operable',
    category: "Operable",
    guideLine: 'Guideline 2.2 – Enough Time',
    name: '2.2.6 Timeouts',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#timeouts',
    userGuide: {
      description: "How to test: 1) If user inactivity triggers timeouts, provide advance warnings and the duration. 2) Inform users if data will be lost. 3) Verify warnings are perceivable and accessible."
    }
  },
  {
    id: '2-3-1-operable',
    category: "Operable",
    guideLine: 'Guideline 2.3 – Seizures and Physical Reactions',
    name: '2.3.1 Three Flashes or Below Treshold',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#three-flashes-or-below-threshold',
    userGuide: {
      description: "How to test: 1) Ensure no content flashes more than 3 times per second above threshold values. 2) Use a flash checker on videos/animations. 3) If flashing exists, reduce frequency/intensity or provide alternatives."
    }
  },
  {
    id: '2-3-2-operable',
    category: "Operable",
    guideLine: 'Guideline 2.3 – Seizures and Physical Reactions',
    name: '2.3.2 Three Flashes',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#three-flashes',
    userGuide: {
      description: "How to test: 1) Avoid any flashing above threshold altogether. 2) Review animations and videos to confirm no flashes are present. 3) Replace with safer visual effects if needed."
    }
  },
  {
    id: '2-3-3-operable',
    category: "Operable",
    guideLine: 'Guideline 2.3 – Seizures and Physical Reactions',
    name: '2.3.3 Animation from Interactions',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#animation-from-interactions',
    userGuide: {
      description: "How to test: 1) Identify animations triggered by interaction (hover/click/scroll). 2) Provide a user setting to disable animation or reduce motion. 3) Respect \"prefers-reduced-motion\" media query."
    }
  },
  {
    id: '2-4-1-operable',
    category: "Operable",
    guideLine: 'Guideline 2.4 – Navigable',
    name: '2.4.1 Bypass Blocks',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#bypass-blocks',
    userGuide: {
      description: "How to test: 1) Provide a \"Skip to content\" link or landmarks (main, nav, search). 2) Confirm keyboard users can bypass repeated blocks. 3) SR users should quickly jump to main content."
    }
  },
  {
    id: '2-4-2-operable',
    category: "Operable",
    guideLine: 'Guideline 2.4 – Navigable',
    name: '2.4.2 Page Titled',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#page-titled',
    userGuide: {
      description: "How to test: 1) Each page has a unique, descriptive <title>. 2) Verify titles change across pages and reflect the page’s purpose. 3) Check in browser tab and SR announcement."
    }
  },
  {
    id: '2-4-3-operable',
    category: "Operable",
    guideLine: 'Guideline 2.4 – Navigable',
    name: '2.4.3 Focus Order',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#focus-order',
    userGuide: {
      description: "How to test: 1) Tab through the page; focus order follows visual/meaningful order. 2) No unexpected jumps or cycles. 3) Modal/dialog focus is trapped appropriately and returns on close."
    }
  },
  {
    id: '2-4-4-operable',
    category: "Operable",
    guideLine: 'Guideline 2.4 – Navigable',
    name: '2.4.4 Link Purpose (In Context)',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#link-purpose-in-context',
    userGuide: {
      description: "How to test: 1) Review link text and its immediate context to determine destination/purpose. 2) Links like \"Click here\" are acceptable only if context clearly defines purpose. 3) SR announces enough context."
    }
  },
  {
    id: '2-4-5-operable',
    category: "Operable",
    guideLine: 'Guideline 2.4 – Navigable',
    name: '2.4.5 Multiple Ways',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#multiple-ways',
    userGuide: {
      description: "How to test: 1) Provide at least two ways to locate a page (search, sitemap, consistent navigation, table of contents). 2) Verify both are accessible and present on all applicable pages."
    }
  },
  {
    id: '2-4-6-operable',
    category: "Operable",
    guideLine: 'Guideline 2.4 – Navigable',
    name: '2.4.6 Headings and Labels',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#headings-and-labels',
    userGuide: {
      description: "How to test: 1) Headings and labels are descriptive and match user expectations. 2) Ensure labels are associated with controls. 3) SR users can navigate by headings effectively."
    }
  },
  {
    id: '2-4-7-operable',
    category: "Operable",
    guideLine: 'Guideline 2.4 – Navigable',
    name: '2.4.7 Focus Visbible',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#focus-visible',
    userGuide: {
      description: "How to test: 1) Tab through interactive elements; a visible focus indicator is always present. 2) Verify focus is not removed by CSS. 3) Indicator has sufficient contrast and is not obscured."
    }
  },
  {
    id: '2-4-8-operable',
    category: "Operable",
    guideLine: 'Guideline 2.4 – Navigable',
    name: '2.4.8 Location',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#location',
    userGuide: {
      description: "How to test: 1) Provide orientation/location cues (breadcrumbs, highlighted nav items). 2) Ensure programmatic indication of current location for SR (aria-current)."
    }
  },
  {
    id: '2-4-9-operable',
    category: "Operable",
    guideLine: 'Guideline 2.4 – Navigable',
    name: '2.4.9 Link Purpose (Link-only)',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#link-purpose-link-only',
    userGuide: {
      description: "How to test: 1) Link text alone (without surrounding context) communicates purpose. 2) Avoid ambiguous labels (\"Read more\"). 3) Include context in the link text itself if needed."
    }
  },
  {
    id: '2-4-10-operable',
    category: "Operable",
    guideLine: 'Guideline 2.4 – Navigable',
    name: '2.4.10 Section Headings',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#section-headings',
    userGuide: {
      description: "How to test: 1) Use headings to divide content into logical sections. 2) Ensure heading levels are hierarchical (h1 > h2 > h3). 3) SR navigation by headings reflects structure."
    }
  },
  {
    id: '2-4-11-operable',
    category: "Operable",
    guideLine: 'Guideline 2.4 – Navigable',
    name: '2.4.11 Focus not Obscured (Minium)',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#focus-not-obscured-minimum',
    userGuide: {
      description: "How to test: 1) Ensure the focused element is not fully obscured by sticky headers/footers/popups. 2) Adjust UI to keep focused item at least partially visible (minimum)."
    }
  },
  {
    id: '2-4-12-operable',
    category: "Operable",
    guideLine: 'Guideline 2.4 – Navigable',
    name: '2.4.12 Focus not Obscured (Enhanced)',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#focus-not-obscured-enhanced',
    userGuide: {
      description: "How to test: 1) Ensure focused element is never obscured at all by other content (enhanced). 2) Test with various components (sticky headers, drawers, banners)."
    }
  },
  {
    id: '2-4-13-operable',
    category: "Operable",
    guideLine: 'Guideline 2.4 – Navigable',
    name: '2.4.13 Focus Appearance',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#focus-appearance',
    userGuide: {
      description: "How to test: 1) Focus indicator area and contrast meet requirements (size ≥ 2 CSS px around focus, contrast ≥ 3:1 against adjacent colors). 2) Verify custom focus styles comply."
    }
  },
  {
    id: '2-5-1-operable',
    category: "Operable",
    guideLine: 'Guideline 2.5 – Input Modalities',
    name: '2.5.1 Pointer Gestures',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#pointer-gestures',
    userGuide: {
      description: "How to test: 1) Replace complex multi-pointer or path-based gestures (pinch, draw) with single-pointer alternatives (buttons, sliders). 2) Verify keyboard and SR operation."
    }
  },
  {
    id: '2-5-2-operable',
    category: "Operable",
    guideLine: 'Guideline 2.5 – Input Modalities',
    name: '2.5.2 Pointer Cancellation',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#pointer-cancellation',
    userGuide: {
      description: "How to test: 1) Activation should occur on up-event or have a mechanism to cancel. 2) Test accidental taps/drag and confirm users can abort or undo before completion."
    }
  },
  {
    id: '2-5-3-operable',
    category: "Operable",
    guideLine: 'Guideline 2.5 – Input Modalities',
    name: '2.5.3 Label in Name',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#label-in-name',
    userGuide: {
      description: "How to test: 1) The accessible name of a control contains the visible label text in the same order. 2) Use a name-from-content tool or SR to verify the match."
    }
  },
  {
    id: '2-5-4-operable',
    category: "Operable",
    guideLine: 'Guideline 2.5 – Input Modalities',
    name: '2.5.4 Motion Actuation',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#motion-actuation',
    userGuide: {
      description: "How to test: 1) Features triggered by device motion (shake, tilt) can be disabled. 2) Provide an alternative control. 3) Ignore accidental motion when device is stationary."
    }
  },
  {
    id: '2-5-5-operable',
    category: "Operable",
    guideLine: 'Guideline 2.5 – Input Modalities',
    name: '2.5.5 Target Site (Enhanced)',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#target-size-enhanced',
    userGuide: {
      description: "How to test: 1) Touch targets are at least 44×44 CSS px or have equivalent spacing, unless exceptions apply. 2) Measure on mobile and check crowded UIs."
    }
  },
  {
    id: '2-5-6-operable',
    category: "Operable",
    guideLine: 'Guideline 2.5 – Input Modalities',
    name: '2.5.6 Concurrent Input Mechanisms',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#concurrent-input-mechanisms',
    userGuide: {
      description: "How to test: 1) Allow users to switch between input methods (keyboard, mouse, touch) without losing progress. 2) Confirm there are no restrictions unless essential/security."
    }
  },
  {
    id: '2-5-7-operable',
    category: "Operable",
    guideLine: 'Guideline 2.5 – Input Modalities',
    name: '2.5.7 Dragging Movements',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#dragging-movements',
    userGuide: {
      description: "How to test: 1) For dragging interactions, provide an alternative that does not require dragging (e.g., buttons to move items). 2) Verify with keyboard only."
    }
  },
  {
    id: '2-5-8-operable',
    category: "Operable",
    guideLine: 'Guideline 2.5 – Input Modalities',
    name: '2.5.8 Target Size (Minimum)',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#target-size-minimum',
    userGuide: {
      description: "How to test: 1) Targets are at least 24×24 CSS px or have sufficient spacing. 2) Measure in different breakpoints. 3) Exceptions apply (inline links, user agent controls)."
    }
  },
  {
    id: '3-1-1-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.1 – Readable',
    name: '3.1.1 Language of Page',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#language-of-page',
    userGuide: {
      description: "How to test: 1) The page <html lang> matches the primary language. 2) Verify SR announces the correct language. 3) Ensure server/client rendering sets lang consistently."
    }
  },
  {
    id: '3-1-2-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.1 – Readable',
    name: '3.1.2 Language of Parts',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#language-of-parts',
    userGuide: {
      description: "How to test: 1) Mark passages/words in a different language with lang attributes. 2) Verify SR switches pronunciation accordingly. 3) Avoid marking proper names."
    }
  },
  {
    id: '3-1-3-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.1 – Readable',
    name: '3.1.3 Unusual Words',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#unusual-words',
    userGuide: {
      description: "How to test: 1) Identify jargon, idioms, or unusual words. 2) Provide definitions via glossary, tooltips, or inline explanations. 3) Confirm keyboard/SR access to these aids."
    }
  },
  {
    id: '3-1-4-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.1 – Readable',
    name: '3.1.4 Abbreviations',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#abbreviations',
    userGuide: {
      description: "How to test: 1) Identify abbreviations and acronyms. 2) Provide expansions on first use or via accessible tooltips. 3) Confirm SR reads expansions where appropriate."
    }
  },
  {
    id: '3-1-5-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.1 – Readable',
    name: '3.1.5 Reading conformance',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#reading-conformance',
    userGuide: {
      description: "How to test: 1) Assess reading level; if above lower secondary, provide a simplified summary or alternative. 2) Confirm simplified content conveys core ideas."
    }
  },
  {
    id: '3-1-6-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.1 – Readable',
    name: '3.1.6 Pronunciation',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#pronunciation',
    userGuide: {
      description: "How to test: 1) Where pronunciation affects meaning, provide phonetic cues or audio examples. 2) Ensure these aids are accessible by keyboard and SR."
    }
  },
  {
    id: '3-2-1-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.2 – Predictable',
    name: '3.2.1 On Focus',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#on-focus',
    userGuide: {
      description: "How to test: 1) Focusing a control does not trigger unexpected context changes (navigation, dialogs). 2) Changes occur only on explicit user action."
    }
  },
  {
    id: '3-2-2-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.2 – Predictable',
    name: '3.2.2 On Input',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#on-input',
    userGuide: {
      description: "How to test: 1) Changing input values does not auto-submit or navigate without warning. 2) Provide a submit/review step. 3) Verify with keyboard/SR."
    }
  },
  {
    id: '3-2-3-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.2 – Predictable',
    name: '3.2.3 Consistent Navigation',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#consistent-navigation',
    userGuide: {
      description: "How to test: 1) The order and location of repeated navigation components remain consistent across pages. 2) Verify with visual scan and SR landmarks."
    }
  },
  {
    id: '3-2-4-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.2 – Predictable',
    name: '3.2.4 Consistent Identification',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#consistent-identification',
    userGuide: {
      description: "How to test: 1) Components with the same function are identified consistently (same label/icon). 2) Ensure accessible names are consistent across pages."
    }
  },
  {
    id: '3-2-5-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.2 – Predictable',
    name: '3.2.5 Change on Request',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#change-on-request',
    userGuide: {
      description: "How to test: 1) Context changes (navigation, dialogs, auto-updates) happen only on request. 2) Provide controls to confirm or cancel changes."
    }
  },
  {
    id: '3-2-6-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.2 – Predictable',
    name: '3.2.6 Consistent Help',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#consistent-help',
    userGuide: {
      description: "How to test: 1) Provide help mechanisms (contact, chat, FAQs, instructions) where users may need them. 2) Keep help in a consistent location across pages."
    }
  },
  {
    id: '3-3-1-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.3 – Input Assistance',
    name: '3.3.1 Error Identification',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#error-identification',
    userGuide: {
      description: "How to test: 1) Trigger validation errors. 2) Ensure errors are identified and described in text near the field and programmatically (aria-describedby). 3) SR should announce errors."
    }
  },
  {
    id: '3-3-2-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.3 – Input Assistance',
    name: '3.3.2 Labels or Instructions',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#labels-or-instructions',
    userGuide: {
      description: "How to test: 1) Provide clear labels, instructions, and examples. 2) Associate labels with inputs. 3) Ensure placeholders are not the only labels."
    }
  },
  {
    id: '3-3-3-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.3 – Input Assistance',
    name: '3.3.3 Error Suggestion',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#error-suggestion',
    userGuide: {
      description: "How to test: 1) When errors occur, offer suggestions to fix them (format hints, accepted values). 2) Ensure suggestions are provided programmatically for SR."
    }
  },
  {
    id: '3-3-4-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.3 – Input Assistance',
    name: '3.3.4 Error Prevention (Legal, Financial, Data)',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#error-prevention-legal-financial-data',
    userGuide: {
      description: "How to test: 1) For legal/financial/data submissions, provide review/confirm step and an easy way to correct or reverse. 2) Verify no irreversible actions without confirmation."
    }
  },
  {
    id: '3-3-5-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.3 – Input Assistance',
    name: '3.3.5 Help',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#help',
    userGuide: {
      description: "How to test: 1) Offer context-sensitive help (field-level tips, examples). 2) Ensure help is reachable by keyboard and announced by SR."
    }
  },
  {
    id: '3-3-6-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.3 – Input Assistance',
    name: '3.3.6 Error Prevention (all)',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#error-prevention-all',
    userGuide: {
      description: "How to test: 1) For all data submissions, provide mechanisms to reverse, check for errors, or review before final submission. 2) Confirm these are accessible."
    }
  },
  {
    id: '3-3-7-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.3 – Input Assistance',
    name: '3.3.7 Redundant Entry',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#redundant-entry',
    userGuide: {
      description: "How to test: 1) Do not require users to re-enter the same information within a process. 2) Reuse previously entered data or provide copy/paste and stored values."
    }
  },
  {
    id: '3-3-8-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.3 – Input Assistance',
    name: '3.3.8 Accessible Authentication (Minimum)',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#accessible-authentication-minimum',
    userGuide: {
      description: "How to test: 1) Authentication must not rely on cognitive function tests (puzzles, remembering). 2) Allow copy/paste and password managers. 3) Provide alternatives to recognition-based challenges."
    }
  },
  {
    id: '3-3-9-understandable',
    category: "Understandable",
    guideLine: 'Guideline 3.3 – Input Assistance',
    name: '3.3.9 Accessible Authentication (Enhanced)',
    conformance: 'AAA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#accessible-authentication-enhanced',
    userGuide: {
      description: "How to test: 1) Provide authentication that avoids cognitive function tests entirely (biometrics, tokens) or offers an accessible alternative. 2) Ensure copy/paste remains possible."
    }
  },
  {
    id: '4-1-2-robust',
    category: "Robust",
    guideLine: 'Guideline 4.1 – Compatible',
    name: '4.1.2 Name, Role, Value',
    conformance: 'A',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#name-role-value',
    userGuide: {
      description: "How to test: 1) Inspect controls to ensure correct roles, accessible names, values, and states via ARIA/HTML semantics. 2) When states change, programmatic properties update and SR announces changes."
    }
  },
  {
    id: '4-1-3-robust',
    category: "Robust",
    guideLine: 'Guideline 4.1 – Compatible',
    name: '4.1.3 Status Messages',
    conformance: 'AA',
    referenceLink: 'https://www.w3.org/WAI/WCAG22/quickref/#status-messages',
    userGuide: {
      description: "How to test: 1) Trigger inline status messages (success, error, toast). 2) Ensure they are programmatically conveyed without moving focus (aria-live). 3) SR announces them immediately."
    }
  }
]
