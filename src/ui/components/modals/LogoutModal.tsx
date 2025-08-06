'use client'
import { IoClose } from 'react-icons/io5';
import { Button } from '../buttons';
import { useAuth } from '@/shared/hooks/useAuth';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoutModal = ({ isOpen, onClose }: LogoutModalProps) => {
  const { logout, user } = useAuth();

  if (!isOpen) return null;

  const handleLogout = async () => {
    await logout();
    onClose();
    // Opcional: redirigir al login
    window.location.href = '/auth/login';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-96 max-w-md mx-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Cerrar Sesión
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <IoClose size={24} />
          </button>
        </div>
        
        {/* Content */}
        <div className="mb-6">
          <p className="text-gray-600 mb-2">
            ¿Estás seguro que quieres cerrar sesión?
          </p>
          <p className="text-sm text-gray-500">
            Usuario: <span className="font-medium">{user?.email}</span>
          </p>
        </div>
        
        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <Button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </div>
  );
};
