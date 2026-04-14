'use client';

type SkipLinkProps = {
  label: string;
  targetId: string;
};

/**
 * Accessible skip link that becomes visible on focus.
 * Allows keyboard users to skip directly to the main content.
 */
export function SkipLink({ label, targetId }: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-2 focus:left-2 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-md focus:ring-2 focus:ring-ring focus:outline-none"
    >
      {label}
    </a>
  );
}
