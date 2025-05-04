'use client'

import React from 'react';

type ProgressBarProps = {
  partial: Record<any, any>,
  base: any[]
}

export default function ProgressBar({ partial, base } : ProgressBarProps) {
  return (
    <div className="flex-1">
      <h3 className="text-lg font-medium mb-2">Progress</h3>
      <div className="bg-gray-200 rounded-full h-4">
        <div
          className="bg-green-500 h-4 rounded-full transition-all duration-300"
          style={{
            width: `${(Object.keys(partial).length / base.length) * 100}%`
          }}
        ></div>
      </div>
      <p className="mt-2 text-sm text-gray-600">
        {Object.keys(partial).length} / {base.length}
      </p>
    </div>
  )
}
