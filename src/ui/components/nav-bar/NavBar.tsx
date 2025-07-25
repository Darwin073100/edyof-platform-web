import Image from 'next/image';
import React from 'react';
import Logo from "../../assets/images/logologo.png";
import { IoChevronDownSharp, IoNotifications, IoPeopleOutline } from 'react-icons/io5'
import { RoundedButton } from '../buttons/RoundedButton';
import { RoundedBadge } from '../badges/RoundedBadge';

export const NavBar = () => {
  return (
    <nav className="flex justify-between items-center  py-2 px-4 bg-white shadow-xl font-semibold w-full h-[60px]">
      <div className='flex items-center gap-3'>
        <Image
            className="rounded-full"
            src={ Logo }
            alt="Next.js logo"
            width={40}
            height={40}
            priority
          />
        <h1 className='text-lg max-sm:hidden text-gray-700'>EdYOf Platform</h1>
      </div>
        <div className="flex items-center justify-center gap-4 text-gray-700">
            <RoundedButton color='blue'>
                <IoNotifications/>
            </RoundedButton>
          <span>Sitios Amuzgos</span>
          <RoundedBadge color='gray'>
            <IoPeopleOutline/>
          </RoundedBadge>
          <span className='max-sm:hidden'>Edwin</span>
          <RoundedButton color='red'>
            <IoChevronDownSharp />
          </RoundedButton>
        </div>
      </nav>
  )
}
