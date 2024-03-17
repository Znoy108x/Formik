import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Skeleton } from '@/shared/components/ui/skeleton';

const FormCardSkeleton = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 justify-between">
                    <Skeleton className="h-8 w-full" />
                </CardTitle>
                <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
                    <Skeleton className="h-8 w-full" />
                </CardDescription>
            </CardHeader>
            <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
                <Skeleton className="h-8 w-full" />
            </CardContent>
            <CardFooter>
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-8 w-1/2" />
            </CardFooter>
        </Card>
    )
}

const FormCardsFallback = () => {
    return (
        <div className="w-full py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormCardSkeleton />
            <FormCardSkeleton />
            <FormCardSkeleton />
            <FormCardSkeleton />
        </div>
    )
}

export default FormCardsFallback