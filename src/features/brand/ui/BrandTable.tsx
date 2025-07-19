'use client'
import { RoundedButton } from '@/ui/components/buttons/RoundedButton';
import React from 'react'
import { AiFillDelete } from 'react-icons/ai';
import { MdEditSquare } from 'react-icons/md';
import { useBrandStore } from '../infraestructure/brand.store';

const BrandTable = () => {
    const { brands, setBrand } = useBrandStore();
  const head = ['Marca', 'Acciones'];
      
      return (
          <div className='h-60 w-full overflow-auto'>
              <table className="w-full text-sm text-left rtl:text-right text-gray-700">
                  <thead className="text-sm text-gray-700 uppercase bg-white">
                      <tr>
                          {head.map(item => <th scope="col" className="px-6 py-3" key={item}>{item}</th>)}
                      </tr>
                  </thead>
                  <tbody className="border-y border-gray-300">
                      {brands.map(item => (
                          <tr className="bg-white border-b border-gray-200" key={item.brandId}>
                              <td className="px-6 py-4">{item.name}</td>
                              <td className="px-6 py-4 flex gap-2 items-center">
                                  <RoundedButton color="yellow" onClick={()=> setBrand(item)}>
                                      <MdEditSquare />
                                  </RoundedButton>
                                  <RoundedButton color="red">
                                      <AiFillDelete />
                                  </RoundedButton>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      )
}

export { BrandTable }
