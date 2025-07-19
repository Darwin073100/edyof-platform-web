'use client'
import { RoundedButton } from "@/ui/components/buttons/RoundedButton";
import { AiFillDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";
import { useEffect, useState } from "react";
import { ProductEntity } from "@/features/product/domain/entities/product.entity";
import { useProductStore } from "@/features/product/infraestructure/product.store";

interface TableProductProps {
    productList: ProductEntity[];
}

export function TableProduct({ productList }: TableProductProps) {
    const { setProducts, products } = useProductStore();
    console.log(products);
    // Inicializamos la data del storage
    useEffect(()=>{
        if(products.length === 0){
            setProducts(productList);
        }
    },[]);

    const head = ['Cod. Bar. Uni.', 'Nombre', 'Stock', 'Ubi.', 'P. C.', 'P. U.', 'P. M.','Categ.', 'Acciones'];
    
    return (
        <div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-700">
                <thead className="text-sm text-gray-700 uppercase bg-white">
                    <tr>
                        {head.map(item => <th scope="col" className="px-6 py-3" key={item}>{item}</th>)}
                    </tr>
                </thead>
                <tbody className="border-y border-gray-300">
                    {products.map(item => (
                        <tr className="bg-white border-b border-gray-200" key={item.productId}>
                            <td className="px-6 py-4">{item.universalBarCode}</td>
                            <td className="px-6 py-4">{item.name}</td>
                            <td className="px-6 py-4">{}</td>
                            <td className="px-6 py-4">{}</td>
                            <td className="px-6 py-4">${}</td>
                            <td className="px-6 py-4">${}</td>
                            <td className="px-6 py-4">${}</td>
                            <td className="px-6 py-4">{item.category?.name}</td>
                            <td className="px-6 py-4 flex gap-2 items-center">
                                <RoundedButton color="yellow" onClick={()=> alert(item.name)}>
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