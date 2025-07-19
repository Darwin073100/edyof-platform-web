'use client'
import React, { JSX } from 'react'

interface Props {
    isOpen: boolean,
    onClose: () => void,
    children?: JSX.Element | string | JSX.Element[]
}
export const Modal = (props: Props) => {
  if (!props.isOpen) return null;

  return (
    <div
      id={new Date().getSeconds().toString()}
      className="bg-[rgba(0,0,0,0.3)] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-screen max-h-full"
      onClick={props.onClose}
    >
      <div onClick={e => e.stopPropagation()}>
        {props.children}
      </div>
    </div>
  )
}
