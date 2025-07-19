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
import { ProductSearch } from "@/features/product/ui/ProductSearch";
import { viewAllProductsAction } from "@/features/product/actions/view-all-products.action";
import { ViewAllCategoriesAction } from "@/features/category/actions/view-all-categories.action";
import { viewAllBrandsAction } from "@/features/brand/actions/view-all-brands.action";
import { BrandModal } from "@/features/brand/ui/BrandModal";

export const metadata:Metadata = {
    title: 'Productos'
}

export default async function ProductsPage() {

    // Llama al server action en el servidor
    const inventoryItemsData = await viewAllProductsAction();
    const items = inventoryItemsData.ok ? inventoryItemsData.value?.products ?? [] : [];
    const viewAllCategories = await ViewAllCategoriesAction();
    const categories = viewAllCategories.ok ? viewAllCategories.value?.categories ?? [] : [];
    const viewAllBrands = await viewAllBrandsAction();
    const brandItems = viewAllBrands.ok ? viewAllBrands.value?.brands ?? [] : [];

    return (
        <main className="flex flex-col gap-4 w-full">
            <ProductActionsBar/>
            <ProductSearch/>
            <h1 className="text-xl">Lista de productos</h1>
            <TableProduct 
                productList={items}/>
            <CategoryModal
                categoryList={categories}
            />
            <BrandModal 
                brandList={ brandItems}
            />
        </main>
    );
}