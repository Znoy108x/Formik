import React from 'react'
import { ThemeSwitcher } from './ThemeSwitcher'
import { UserButton } from '@clerk/nextjs'
import Branding from './Branding'

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between px-5 py-2 border-b-[1px]">
            <Branding />
            <div className="flex items-center gap-x-4">

                <ThemeSwitcher />
                <UserButton afterSignOutUrl='/sign-in' />
            </div>
        </nav>
    )
}

export default Navbar