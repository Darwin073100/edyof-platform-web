'use client'
import { RoundedButton } from '@/ui/components/buttons/RoundedButton';
import React from 'react'
import { AiFillDelete } from 'react-icons/ai';
import { MdEditSquare } from 'react-icons/md';
import { useCategoryStore } from '../infraestructure/category.store';

const CategoryTable = () => {
    const { categories, setCategory } = useCategoryStore();
  const head = ['Categoria', 'Descripción', 'Acciones'];
      
      return (
          <div className='h-60 w-full overflow-auto'>
              <table className="w-full text-sm text-left rtl:text-right text-gray-700">
                  <thead className="text-sm text-gray-700 uppercase bg-white">
                      <tr>
                          {head.map(item => <th scope="col" className="px-6 py-3" key={item}>{item}</th>)}
                      </tr>
                  </thead>
                  <tbody className="border-y border-gray-300">
                      {categories.map(item => (
                          <tr className="bg-white border-b border-gray-200" key={item.categoryId}>
                              <td className="px-6 py-4">{item.name}</td>
                              <td className="px-6 py-4">{item.description}</td>
                              <td className="px-6 py-4 flex gap-2 items-center">
                                  <RoundedButton color="yellow" onClick={()=> setCategory(item)}>
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

export { CategoryTable };
