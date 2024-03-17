"use client"

import { Button } from '@/shared/components/ui/button'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const BuilderErrorPage = ({ error }: { error: Error }) => {

  const router = useRouter()

  useEffect(() => {
    console.log(error)
  }, [error])

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="">
        <div className="text-4xl font-bold">OOPS! Something went wrong!</div>
        <div className="text-lg text-neutral-300 mt-1">Please navigate to home page or refresh the application</div>
        <Button className="mt-6 w-full rounded-2xl" onClick={() => router.push("/")}>
          Dashboard
        </Button>
      </div>
    </div>
  )
}

export default BuilderErrorPage