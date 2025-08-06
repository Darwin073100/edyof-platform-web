'use client'
import Image from 'next/image';
import React, { useState } from 'react';
import Logo from "../../assets/images/logologo.png";
import { IoChevronDownSharp, IoNotifications, IoPeopleOutline } from 'react-icons/io5'
import { RoundedButton } from '../buttons/RoundedButton';
import { RoundedBadge } from '../badges/RoundedBadge';
import { LogoutModal } from '../modals/LogoutModal';
import { useAuth, useWorkspace } from '@/shared/hooks/useAuth';

export const NavBar = () => {
  const { user } = useAuth();
  const { establishment, branchOffice } = useWorkspace();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleOpenLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const handleCloseLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <nav className="flex justify-between items-center  py-2 px-4 bg-white shadow-xl font-semibold w-full h-[60px]">
      <div className='flex items-center gap-3'>
        <Image
          className="rounded-full"
          src={Logo}
          alt="Next.js logo"
          width={40}
          height={40}
          priority
        />
        <h1 className='text-lg max-sm:hidden text-gray-700'>{establishment?.name?? '--'}</h1>
      </div>
      <div className="flex items-center justify-center gap-4 text-gray-700">
        <RoundedButton color='blue'>
          <IoNotifications />
        </RoundedButton>
        <span>{branchOffice?.name}</span>
        <RoundedBadge color='gray'>
          <IoPeopleOutline />
        </RoundedBadge>
        <span className='max-sm:hidden'>{user?.email?? '--'}</span>
        <RoundedButton 
          color='red'
          onClick={handleOpenLogoutModal}
        >
          <IoChevronDownSharp />
        </RoundedButton>
      </div>
      
      {/* Modal de Logout */}
      <LogoutModal 
        isOpen={isLogoutModalOpen}
        onClose={handleCloseLogoutModal}
      />
    </nav>
  )
}
