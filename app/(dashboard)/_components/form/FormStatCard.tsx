import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Skeleton } from '@/shared/components/ui/skeleton';
import { GradientBackground } from '@/shared/components/acernity/GradientBackground';

interface Props {
    title: string,
    icon: React.ReactNode,
    helperText: string,
    className: string,
    value: string,
    loading: boolean
}

export default function FormStatCard({ title, className, helperText, icon, value, loading }: Props) {

    return (
        <GradientBackground className='p-[.2px] h-full w-full'>
            <Card className="rounded-3xl h-full w-full flex flex-col">
                <CardHeader className="relative grow flex flex-col justify-between pb-2">
                    <div className="max-w-[90%]">
                        <CardTitle className="text-2xl font-bold capitalize  text-white">
                            {title}
                        </CardTitle>
                        <CardDescription className="text-neutral-400 text-sm font-light">
                            {helperText}
                        </CardDescription>
                    </div>
                    {/* <span className="absolute top-8 right-8">
                        {icon}
                    </span> */}
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold">
                        {loading && (
                            <Skeleton>
                                <span className="opacity-0">0</span>
                            </Skeleton>
                        )}
                        {!loading && value}
                    </div>
                </CardContent>
            </Card>
        </GradientBackground>
    )
}
