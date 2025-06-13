'use client'

import React from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'gray'
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  fullWidth?: boolean           // ⬅️ nuevo prop
  className?: string
}

const sizeConfig = {
  sm: { txt: 'text-sm', space: 1 },
  md: { txt: 'text-base', space: 2 },
  lg: { txt: 'text-lg', space: 4 },
  xl: { txt: 'text-xl', space: 6 },
  '2xl': { txt: 'text-2xl', space: 8 },
} as const

export function Button({
  children,
  color = 'blue',
  size = 'md',
  className,
  fullWidth = false,
  ...props
}: Props) {
  const { txt, space } = sizeConfig[size]

  return (
    <button
      className={twMerge(
        clsx(
          'text-white cursor-pointer transition-all flex justify-center items-center rounded-md shadow-sm',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
          fullWidth && 'w-full',
          txt,
          `gap-${space} px-${space} py-${space}`,
          `bg-${color}-400 hover:bg-${color}-300`,
          className // lo último para que pueda sobrescribir
        )
      )}
      {...props}
    >
      {children}
    </button>
  )
}
