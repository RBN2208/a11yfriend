'use client'
import React from 'react';
import ProIcon from '@/components/ui-elements/icons/ProIcon';
import { RefreshCcw } from 'lucide-react';
import Link from 'next/link';

type UILinkProps = {
  label: string,
  href: string,
  title?: string,
  simpleLink?: boolean,
  additionalClass?: string,
}

export default function UILink(
  {
    label,
    href,
    title = label,
    simpleLink = false,
    additionalClass
  } : UILinkProps) {

  const baseClass = "flex justify-center block relative transition-all w-full duration-300 ease-in-out bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-offset-2";

  const simpleLinkClass = "block text-black font-bold transition-scale duration-100 hover:scale-110";

  const linkClass = simpleLink ? simpleLinkClass : baseClass;
  return (
    <Link className={`${linkClass} ${additionalClass}`}
          title={title}
          href={href}
    >
      {label}
    </Link>
  )
}
