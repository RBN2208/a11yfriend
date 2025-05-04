import React from 'react';
import { Headline } from '@/components/ui-elements/text/Headline';
import UILink from '@/components/ui-elements/UILink';

type OverviewListProps = {
  title: string,
  defaultMessage?: string,
  children?: React.ReactNode;
}

export function OverviewList({ title, defaultMessage, children }: OverviewListProps) {
  return (
    <div className="bg-white shadow sm:rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <Headline title={title} level={3} />
        <UILink href="/account/audits"
                additionalClass="text-sm w-max"
                label="Show all audits"
        />
      </div>

      {children ?
        children :
        <p className="text-gray-500">{defaultMessage}</p>
      }
    </div>
  )
}
