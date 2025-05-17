'use client'

import React from 'react';
import {Progress} from "@/components/ui/progress";

type ProgressBarProps = {
  partial: Record<any, any>,
  base: any[],
  headline: string,
  label: string,
  className?: string,
}

export default function UIProgressbar({ partial, base, headline, label } : ProgressBarProps) {
  const value = (Object.keys(partial).length / base.length) * 100;
  return (
    <div className="flex-1 mt-4">
      <h3 className="text-lg font-medium mb-2">{headline}</h3>
      <div className="bg-gray-200 rounded-full">
        <Progress value={value} />
      </div>
      <p className="mt-2 text-sm text-primary">
        {Object.keys(partial).length} / {base.length} {label}
      </p>
    </div>
  )
}
