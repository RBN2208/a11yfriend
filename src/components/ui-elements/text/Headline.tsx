import { JSX } from 'react';

type HeadlineProps = {
  title: string;
  id?: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  additionalClasses?: string;
};

export function Headline({ title, id, level = 1, additionalClasses }: HeadlineProps) {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  const sizeClass = (() => {
    switch (level) {
      case 1:
        return 'text-4xl font-bold';
      case 2:
        return 'text-3xl font-bold';
      case 3:
        return 'text-xl font-bold';
      case 4:
        return 'text-base font-bold';
      case 5:
        return 'text-sm font-bold';
      case 6:
        return 'text-xs font-bold';
      default:
        return 'text-4xl font-bold';
    }
  })();

  return (
    <HeadingTag id={id} className={`${sizeClass} text-black ${additionalClasses}`}>
      {title}
    </HeadingTag>
  );
}
