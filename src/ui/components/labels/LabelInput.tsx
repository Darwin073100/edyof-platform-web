import clsx from "clsx"
import React from "react"
import { IconType } from "react-icons"

interface Props {
    Icon?: IconType
    value: string,
    error?: boolean,
    errorMessage?: string
    htmlFor?: string,
    className?: string
}

export const LabelInput = ({ value, Icon, error = false, errorMessage, htmlFor , className}:Props) => {
    return (
        <label htmlFor={htmlFor} className={clsx(`flex gap-1 items-center font-medium text-gray-700 ${className}`)}>
            { !!Icon && <Icon/> }
            <span>{ value }</span>
            { error && <span className="text-red-600 text-[10px]">* { errorMessage }</span>}
        </label>
    )
}
