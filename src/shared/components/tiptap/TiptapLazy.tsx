'use client'

import dynamic from 'next/dynamic';
import { Skeleton } from '@/shared/components/shadcn-components/ui/skeleton';

const Tiptap = dynamic(() => import('./Tiptap'), {
  ssr: false,
  loading: () => <Skeleton className="min-h-[300px] w-full" />,
});

export default Tiptap;
