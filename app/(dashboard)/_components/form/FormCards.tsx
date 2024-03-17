import React from 'react'
import CreateFormDailog from './dialogs/CreateFormDailog'
import { auth } from '@clerk/nextjs'
import { FormCard } from './FormCard'
import prisma from '@/shared/lib/prisma'

const FormCards = async () => {

    const { userId } = auth()

    if (!userId) return null

    const forms = await prisma.form.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const isFormEmpty = forms.length === 0

    return (
        <div className="flex flex-col w-full">
            <span className="text-4xl font-bold col-span-2">Your Forms</span>
            {
                isFormEmpty ? (
                    <div className="w-full pt-8">
                        <div className="w-full border-[1px] rounded-3xl px-8 py-5 space-y-4 flex flex-col md:flex-row md:justify-between">
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold">No Forms Found</span>
                                <span className="text-md font-light text-neutral-200">Please create forms to get started!</span>
                            </div>
                            <CreateFormDailog />
                        </div>
                    </div>
                ) : (
                    <div className="w-full py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <CreateFormDailog showBigButton />
                        {
                            forms.map((form) => (
                                <FormCard key={form.id} form={form} />
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default FormCards