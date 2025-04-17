'use client';

import SearchPage from '@/components/searchcar/SearchPage';
export const dynamic = 'force-dynamic'
import React, { Suspense } from 'react';

export default function SearchPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPage />
    </Suspense>
  );
}
