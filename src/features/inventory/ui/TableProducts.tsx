'use client'
import { RoundedButton } from "@/ui/components/buttons/RoundedButton";
import { AiFillDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";
import { useState } from "react";
import { InventoryItemEntity } from "../domain/entities/inventory.entity";
import { ErrorEntity } from "@/shared/features/error.entity";

interface TableProductProps {
    items: InventoryItemEntity[];
}

export function TableProduct({ items }: TableProductProps) {
    const [search, setSearch] = useState("");
    const filteredItems = items.filter(item =>
        item.product?.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.internalBarCode?.toLowerCase().includes(search.toLowerCase())
    );
    const head = ['C. Barra', 'Nombre', 'Stock', 'Ubi.', 'P. C.', 'P. U.', 'P. M.','Categ.', 'Acciones'];
    return (
        <div>
            <input
                type="text"
                placeholder="Buscar por nombre o código"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="mb-2 p-2 border rounded w-full"
            />
            <table className="w-full text-sm text-left rtl:text-right text-gray-700">
                <thead className="text-sm text-gray-700 uppercase bg-white">
                    <tr>
                        {head.map(item => <th scope="col" className="px-6 py-3" key={item}>{item}</th>)}
                    </tr>
                </thead>
                <tbody className="border-y border-gray-300">
                    {filteredItems.map(item => (
                        <tr className="bg-white border-b border-gray-200" key={item.internalBarCode}>
                            <td className="px-6 py-4">{item.internalBarCode}</td>
                            <td className="px-6 py-4">{item.product?.name}</td>
                            <td className="px-6 py-4">{item.lot?.initialQuantity.toFixed(2)}</td>
                            <td className="px-6 py-4">{item.location}</td>
                            <td className="px-6 py-4">${item.lot?.purchasePrice}</td>
                            <td className="px-6 py-4">${item.salePriceOne}</td>
                            <td className="px-6 py-4">${item.salePriceMany}</td>
                            <td className="px-6 py-4">{item.product?.category?.name}</td>
                            <td className="px-6 py-4 flex gap-2 items-center">
                                <RoundedButton color="yellow">
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