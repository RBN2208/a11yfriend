import type { WcagCriteriaRegistry } from "./types";

export const WCAG_CRITERIA_REGISTRY: WcagCriteriaRegistry = {
  "1-1-1-non-text-content": {
    id: "1-1-1-non-text-content",
    number: "1.1.1",
    slug: "1-1-1-non-text-content",
    level: "A",
    principle: "perceivable",
    wcagVersion: "2.2",
    shortNameKey: "non-text-content",
    officialUrl: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html",
    tags: ["images", "alt-text", "media", "accessibility"],
  },
  "1-2-1-audio-only-and-video-only-prerecorded": {
    id: "1-2-1-audio-only-and-video-only-prerecorded",
    number: "1.2.1",
    slug: "1-2-1-audio-only-and-video-only-prerecorded",
    level: "A",
    principle: "perceivable",
    wcagVersion: "2.2",
    shortNameKey: "audio-only-and-video-only-prerecorded",
    officialUrl: "https://www.w3.org/WAI/WCAG22/Understanding/audio-only-and-video-only-prerecorded.html",
    tags: ["media", "audio", "video", "transcripts"],
  }
};

