import { Button } from "@/ui/components/buttons";
import { TextInput } from "@/ui/components/inputs";
import { Metadata } from "next";
import { IoMdAdd } from "react-icons/io";
import { MdCategory, MdOutlineViewTimeline } from "react-icons/md";
import { TableProduct } from "@/features/inventory/ui/TableProducts";
import { FaSearch } from "react-icons/fa";
import { CategoryModal } from "@/features/category/ui/CategoryModal";
import { viewAllInventoryItem } from "@/features/inventory/actions/view-all-inventory-item.action";
import { ProductActionsBar } from "@/features/product/ui/ProductActionsBar";

export const metadata:Metadata = {
    title: 'Productos'
}

export default async function ProductsPage() {

    // Llama al server action en el servidor
    const inventoryItemsData = await viewAllInventoryItem();
    const items = inventoryItemsData.ok ? inventoryItemsData.value?.inventoryItems ?? [] : [];

    return (
        <main className="flex flex-col gap-4 w-full">
            <ProductActionsBar/>
            <div className="flex gap-2">
                <Button className="w-10">
                    <FaSearch/>
                </Button>
                <TextInput placeholder="Buscar producto" />
            </div>
            <h1 className="text-xl">Lista de productos</h1>
            <TableProduct items={items}/>
            <CategoryModal/>
        </main>
    );
}