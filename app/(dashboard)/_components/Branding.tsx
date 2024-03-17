import Link from 'next/link'
import React from 'react'

const Branding = () => {
    return (
        <Link href="/" className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-blue-500 to-cyan-600">
            FORMIK
        </Link>
    )
}

export default Branding