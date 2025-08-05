"use client";

import { HiMiniUser, HiPhoto } from "react-icons/hi2";
import { CardLink } from "@/ui/components/cards/CardLink";
import { useAuth, useWorkspace } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Sale from '../../ui/assets/images/sale.svg';
import Inventory from '../../ui/assets/images/inventary.svg';
import Contability from '../../ui/assets/images/payCash.svg';

const homeCards = [
  {
    title: 'Ventas',
    description: 'Vende productos a clientes',
    to: '/sale/new-sale',
    image: Sale
  },
  {
    title: 'Inventario',
    description: 'Control de los productos',
    to: '/sale/new-sale',
    image: Inventory
  },
  {
    title: 'Contabilidad',
    description: 'Revisa los ingresos y egresos',
    to: '/sale/new-sale',
    image: Contability
  }
];

export default function Home() {
  const { user, logout } = useAuth();
  const { establishment, branchOffice, employee } = useWorkspace();

  return (
    <ProtectedRoute>
      <div className="h-full w-full">
        <div className="mb-6">
          <h1 className="flex justify-center items-center text-gray-700 text-2xl pb-2">
            ¡Bienvenido, {user?.username || employee?.firstName}!
            <HiMiniUser className="ml-2" />
          </h1>
          
          {/* Información del workspace */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-800">Establecimiento</h3>
                <p>{establishment?.name}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Sucursal</h3>
                <p>{branchOffice?.name}</p>
                <p className="text-xs">{branchOffice?.address.city}, {branchOffice?.address.state}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Usuario</h3>
                <p>{user?.email}</p>
                <div className="flex gap-1 mt-1">
                  {user?.roles.map(role => (
                    <span key={role} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={logout}
                className="text-red-600 hover:text-red-800 text-sm underline"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>

        <form className="grid grid-cols-5 gap-4 w-full text-gray-700">
          {homeCards.map(item => (
            <CardLink 
              key={item.title}
              title={item.title}
              description={item.description}
              to={item.to}
              image={item.image}
            />
          ))}
        </form>
        
        <div className="pt-4">
          <h1 className="flex justify-center items-center text-gray-700 text-2xl pb-4">
            Top 10 de productos mas vendidos 
            <HiPhoto />
          </h1>
        </div>
      </div>
    </ProtectedRoute>
  );
}
