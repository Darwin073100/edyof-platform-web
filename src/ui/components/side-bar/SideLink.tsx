import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'
import { IconType } from 'react-icons';

interface Props{
    hover: string;
    Icon: IconType;
    href: string;
    value: string;
}

export const SideLink = ({Icon, hover, href, value}:Props) => {
  return (
    <Link href={href} className="bg-white shadow-xl flex hover:flex items-center justify-center transition-all duration-500 h-12 rounded-lg gap-4 w-full font-semibold hover:bg-gray-200">
        <span><Icon className="text-2xl font-bold"/></span>
        <span
            className={clsx(`transition-all duration-1000 max-sm:hidden ${hover}`)}>
                {value}
        </span>
    </Link>
  )
}
