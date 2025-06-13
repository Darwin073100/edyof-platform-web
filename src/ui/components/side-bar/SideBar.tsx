'use client'
import React, { useState } from 'react'
import { HiHome } from 'react-icons/hi'
import { HiMiniShoppingBag, HiMiniShoppingCart, HiMiniUserGroup, HiRocketLaunch } from 'react-icons/hi2'
import { IoAddSharp } from 'react-icons/io5'
import { SideLink } from './SideLink'

export const SideBar = () => {
    const [hover, setHover] = useState<string>('sm:hidden');

    const handleMouseHover =()=>{
        setHover('sm:flex')
    }

    const handleMouseOut = ()=> {
        setHover('sm:hidden');
    }

    return (
    <form 
        onMouseOver={()=> handleMouseHover()} 
        onMouseOut={()=> handleMouseOut()} 
        className="w-[80px] sm:hover:w-[300px] transition-all duration-300 flex flex-col gap-4 px-4 text-gray-700">
        <SideLink hover={hover} Icon={HiHome} href='/' value='Home'/>
        <SideLink hover={hover} Icon={HiMiniShoppingCart} href='/sale' value='Ventas'/>
        <SideLink hover={hover} Icon={HiMiniShoppingBag} href='#' value='Clientes'/>
        <SideLink hover={hover} Icon={IoAddSharp} href='/branch-office' value='Sucursales'/>
        <SideLink hover={hover} Icon={HiRocketLaunch} href='/products' value='Productos'/>
    </form>
  )
}
