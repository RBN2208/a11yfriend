'use client'

import React from 'react';
import {Progress} from "@/components/shadcn-components/ui/progress";
import {AuditResult} from "@/features/audit/manual/types/types";

type ProgressBarProps = {
  partial: AuditResult[],
  baseSize: number,
  className?: string,
}

export default function UIProgressbar({ partial, baseSize } : ProgressBarProps) {
  const value = (partial.length / baseSize) * 100;
  return (
    <div className="flex-1 mt-4">
      <div className="relative bg-gray-200 rounded-full">
        <Progress value={value} className="h-4" />
        <div className="absolute top-0 left-[50%] translate-x-[-50%] flex justify-between mb-2">
          <p className="text-xs font-bold">
            {partial.length} / {baseSize} ({Math.round(value)}%)
          </p>
        </div>
      </div>
    </div>
  )
}
