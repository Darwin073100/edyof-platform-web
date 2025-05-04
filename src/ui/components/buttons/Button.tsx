'use client'
import clsx from 'clsx'
import React, { JSX, useState } from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: JSX.Element | string | JSX.Element[],
    color?: 'blue'|'green'|'yellow'|'red'|'gray'
}

export const Button = ({ children, color = 'blue' , ...props }: Props) => {
    return (
        <button
            className={
                clsx(`transition-all text-xl flex w-full cursor-pointer justify-center items-center gap-4 rounded-md px-4 py-2 text-white shadow-sm bg-${color}-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`,
                    props.className,
                    color && `hover:bg-${color}-300`,
                )}
            {...props}   >
            { children }
        </button>
    )
}
