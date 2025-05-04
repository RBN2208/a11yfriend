import React from 'react';

type SectionWrapperType = {
  children: React.ReactNode,
  bgClass?: string,
  linkedHeading?: string
}

export default function SectionWrapper({ children, bgClass = "", linkedHeading }: SectionWrapperType) {
  return (
    <section className={`p-6 sm:p-8 md:p-10 ${bgClass}`} aria-labelledby={linkedHeading}>
      <div className="w-full sm:w-11/12 mx-auto">
        {children}
      </div>
    </section>
  )
}
