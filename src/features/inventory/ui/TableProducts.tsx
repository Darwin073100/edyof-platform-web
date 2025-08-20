'use client'
import { RoundedButton } from "@/ui/components/buttons/RoundedButton";
import { AiFillDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";
import { useMemo } from "react";
import { ProductEntity } from "@/features/product/domain/entities/product.entity";
import { useProductStore } from "@/features/product/infraestructure/stores/product.store";
import { LotEntity } from "@/features/lot/domain/entities/lot.entity";
import { InventoryResponseDTO } from "../domain/entities/inventory-response.dto";
import { ProductWithLotInventoryItemDTO } from "@/features/product/application/dtos/product-with-lot-inventory-item.dto";
import { useRouter } from "next/navigation";

interface TableProductProps {
    productList: ProductEntity[];
}

export function TableProduct({ productList }: TableProductProps) {
    const { searchCharacter } = useProductStore();
    const router = useRouter();

    // Memoiza el mapeo de productos con lotes e inventario
    const productsWhitLots: ProductWithLotInventoryItemDTO[] = useMemo(() =>
        productList.flatMap((product: ProductEntity) =>
            product.lots?.flatMap((lot: LotEntity) =>
                lot.inventories.map((inventory: InventoryResponseDTO) => ({
                    ...product,
                    lot: [lot],
                    inventoryItems: [inventory]
                }))
            ) || []
        ), [productList]
    );

    // Memoiza el filtrado por nombre
    const filteredProducts = useMemo(() => {
        if (!searchCharacter) return productsWhitLots;
        return productsWhitLots.filter(item =>
            item.name.toLowerCase().includes(searchCharacter.toLowerCase())
        );
    }, [productsWhitLots, searchCharacter]);

    const handleViewProduct = (productId: string) => {
        router.push(`/products/${productId}`);
    };

    const head = ['Cod. Bar. Uni.', 'Nombre', 'Stock', 'Ubi.', 'P. Com.', 'P. Uni.', 'P. May.', 'Categ.', 'Acciones'];

    return (
        <div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-700">
                <thead className="text-sm text-gray-700 uppercase bg-white">
                    <tr>
                        {head.map(item => <th scope="col" className="px-6 py-3" key={item}>{item}</th>)}
                    </tr>
                </thead>
                <tbody className="border-y border-gray-300">
                    {filteredProducts.filter(item => !item?.deletedAt).map(item => (
                        <tr className="bg-white border-b border-gray-200" key={item?.productId}>
                            <td className="px-6 py-4">{item?.universalBarCode}</td>
                            <td className="px-6 py-4">{item?.name}</td>
                            <td className="px-6 py-4">{item?.brand?.name}</td>
                            {/* <td className="px-6 py-4">{item?.inventoryItem?.location.toUpperCase()}</td>
                            <td className="px-6 py-4">${item?.lot?.purchasePrice}</td>
                            <td className="px-6 py-4">${item?.inventoryItem?.salePriceOne}</td>
                            <td className="px-6 py-4">${item?.inventoryItem?.salePriceMany}</td> */}
                            <td className="px-6 py-4">{item?.category?.name}</td>
                            <td className="px-6 py-4 flex gap-2 items-center">
                                <RoundedButton 
                                    color="yellow" 
                                    onClick={() => handleViewProduct(item?.productId?.toString() || '')}
                                    title="Ver detalles del producto"
                                >
                                    <MdEditSquare />
                                </RoundedButton>
                                <RoundedButton color="red" title="Eliminar producto">
                                    <AiFillDelete />
                                </RoundedButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {filteredProducts.length === 0 && <div className="w-full bg-gray-100 p-4">No hay productos...</div>}
        </div>
    )
}