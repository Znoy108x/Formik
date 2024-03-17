import { Skeleton } from '@/shared/components/ui/skeleton'
import React from 'react'

export const CardsFallback = () => {
    return (
        <div className="w-full pt-8 gap-7 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
            <Skeleton className="w-full h-32" />
            <Skeleton className="w-full h-32" />
            <Skeleton className="w-full h-32" />
            <Skeleton className="w-full h-32" />
        </div>
    )
}
