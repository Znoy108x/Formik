import React from 'react'
import { Eye, MousePointerClick, RemoveFormatting } from 'lucide-react';
import { TbArrowBounce } from "react-icons/tb";
import FormStatCard from './FormStatCard';
import { GetFormStats } from '@/shared/actions/form';

interface Props {
    data: Awaited<ReturnType<typeof GetFormStats>>,
    loading: boolean
}

export const FormStatsCards = async ({ data, loading }: Props) => {


    const CardsData = [
        {
            title: "Total Visits",
            icon: <Eye className=" text-white size-5 md:size-6" />,
            helperText: "All time form visits",
            className: "shadow-md shadow-blue-600",
            value: data?.visits.toLocaleString() || "",
        },
        {
            title: "Total submissions",
            icon: <RemoveFormatting className=" text-white size-5 md:size-6" />,
            helperText: "All time form submissions",
            className: "shadow-md shadow-yellow-600",
            value: data?.submissions.toLocaleString() || ""
        },
        {
            title: "Submission rate",
            icon: <MousePointerClick className=" text-white size-5 md:size-6" />,
            helperText: "Visits that result in form submission",
            className: "shadow-md shadow-green-600",
            value: data?.submissionRate.toLocaleString() + "%" || ""
        },
        {
            title: "Bounce rate",
            icon: <TbArrowBounce className=" text-white size-5 md:size-6" />,
            helperText: "Visits that leaves without interacting",
            className: "shadow-md shadow-red-600",
            value: data?.bounceRate.toLocaleString() + "%" || ""
        }
    ]

    return (
        <div className="w-full pt-8 gap-7 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
            {
                CardsData.map((cardDetail, index) => (
                    <FormStatCard {...cardDetail} key={index} loading={loading} />
                ))
            }
        </div>
    )
}