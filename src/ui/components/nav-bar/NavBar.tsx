import Image from 'next/image';
import React from 'react';
import Logo from "../../../assets/images/logo.png";
import { IoChevronDownSharp, IoNotifications, IoPeopleOutline } from 'react-icons/io5'

export const NavBar = () => {
  return (
    <nav className="flex justify-between items-center  py-2 px-4 bg-white shadow-xl font-semibold w-full h-[60px]">
      <div className='flex items-center gap-3'>
        <Image
            className=""
            src={ Logo }
            alt="Next.js logo"
            width={60}
            height={60}
            priority
          />
        <h1 className='text-lg text-gray-700'>Sistema de administración</h1>
      </div>
        <div className="flex items-center justify-center gap-4 text-gray-700">
            <button className='transition-all duration-300 p-2 rounded-full flex items-center justify-center hover:bg-gray-200 w-10 h-10'>
                <IoNotifications/>
            </button>
          <span>San Francisco</span>
          <span className="bg-gray-500 text-white p-2 rounded-full flex items-center justify-center w-10 h-10">
            <IoPeopleOutline/>
          </span>
          <span>Edwin</span>
          <button className="transition-all duration-300 p-2 rounded-full flex items-center justify-center hover:bg-gray-200 w-10 h-10">
            <IoChevronDownSharp />
          </button>
        </div>
      </nav>
  )
}
