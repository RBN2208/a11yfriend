// these are, for now, just the examples from shadcn with a little bit of customization

import React from "react";

type TypographyBaseProps<T extends HTMLElement> = React.HTMLAttributes<T> & {
  children: React.ReactNode;
};

type TypographyHeadingProps = TypographyBaseProps<HTMLHeadingElement>;
export function TypographyH1(props: TypographyHeadingProps) {
  return (
      <>
        {props.children &&
          <h1 className={`scroll-m-20 text-4xl font-extrabold tracking-tight text-balance ${props.className}`}>
            {props.children}
          </h1>
        }
      </>
  )
}

export function TypographyH2(props: TypographyHeadingProps) {
  return (
      <>
        {props.children &&
          <h2 className={`scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${props.className}`}>
            {props.children}
          </h2>
        }
      </>
  )
}

export function TypographyH3(props: TypographyHeadingProps) {
  return (
      <>
        {props.children &&
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight" {...props}>
            {props.children}
          </h3>
        }
      </>
  )
}

export function TypographyH4(props: TypographyHeadingProps) {
  return (
      <>
        {props.children &&
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight" {...props}>
            {props.children}
          </h4>
        }
      </>
  )
}

type TypographyPProps = TypographyBaseProps<HTMLParagraphElement>;
export function TypographyP(props: TypographyPProps) {
  return (
      <>
        {props.children &&
          <p className="leading-7 [&:not(:first-child)]:mt-6" {...props}>
            {props.children}
          </p>
        }
      </>
  )
}

type TypographyBlockQuoteProps = TypographyBaseProps<HTMLQuoteElement>;
export function TypographyBlockquote(props: TypographyBlockQuoteProps) {
  return (
      <>
        {props.children &&
          <blockquote className="mt-6 border-l-2 pl-6 italic" {...props}>
            {props.children}
          </blockquote>
        }
      </>
  )
}

type OrderedListProps = React.HTMLAttributes<HTMLOListElement> & {
  variant: 'ordered';
  children?: React.ReactNode;
};

type UnorderedListProps = React.HTMLAttributes<HTMLUListElement> & {
  variant: 'unordered';
  children?: React.ReactNode;
};

type TypographyListProps = OrderedListProps | UnorderedListProps;
export function TypographyList(props: TypographyListProps) {
  const Tag = props.variant === "ordered" ? "ol" : "ul";
  const cssClass = "my-6 ml-6 [&>li]:mt-2 " + (props.variant === "ordered" ? "list-decimal" : "list-disc");
  return (
      <>
        {props.children &&
          <Tag className={cssClass} {...props}>
            {props.children}
          </Tag>
        }
      </>
  )
}

type TypographyCodeProps = TypographyBaseProps<HTMLElement>;
export function TypographyInlineCode(props: TypographyCodeProps) {
  return (
      <>
        {props.children &&
          <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" {...props}>
            {props.children}
          </code>
        }
      </>
  )
}
