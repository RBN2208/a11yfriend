'use client'

import React from 'react';
import {Progress} from "@/components/ui/progress";

type ProgressBarProps = {
  partial: Record<any, any>,
  baseSize: number,
  headline: string,
  label: string,
  className?: string,
}

export default function UIProgressbar({ partial, baseSize, headline, label } : ProgressBarProps) {
  const value = (Object.keys(partial).length / baseSize) * 100;
  console.log(partial, baseSize, value)
  return (
    <div className="flex-1 mt-4">
      <h3 className="text-lg font-medium mb-2">{headline}</h3>
      <div className="bg-gray-200 rounded-full">
        <Progress value={value} />
      </div>
      <p className="mt-2 text-sm text-primary">
        {Object.keys(partial).length} / {baseSize} {label}
      </p>
    </div>
  )
}
