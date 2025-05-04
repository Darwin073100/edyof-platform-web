'use client'
import React, { JSX, useEffect } from 'react'

interface Props{
    id: string,
    children?: JSX.Element | string | JSX.Element[],
    isOpen?: boolean,
}
export const Modal = (props:Props) => {

  return (
    <>
    {
        props.isOpen && (
            <div id={props.id} className="bg-[rgba(0,0,0,0.3)] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen max-h-full">
                {props.children}
            </div>
        )
    }
    </>
  )
}
