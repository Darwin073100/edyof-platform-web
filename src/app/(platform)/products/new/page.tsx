import { ProtectedRoute } from "@/components/ProtectedRoute";
import { viewAllBrandsAction } from "@/features/brand/actions/view-all-brands.action";
import { ViewAllCategoriesAction } from "@/features/category/actions/view-all-categories.action";
import { FormNewProduct } from "@/features/product/ui/FormNewProduct";
import { viewAllSeasonsAction } from "@/features/season/actions/view-all-seasons.action";
import { TemplateArea } from "@/ui/components/templates/TemplateArea";

export default async function () {
    const viewAllCategories = await ViewAllCategoriesAction();
    const categoryItems = viewAllCategories.ok ? viewAllCategories.value?.categories ?? [] : [];
    const viewAllBrands = await viewAllBrandsAction();
    const brandItems = viewAllBrands.ok ? viewAllBrands.value?.brands ?? [] : [];
    const viewAllSeasons = await viewAllSeasonsAction();
    const seasonItems = viewAllSeasons.ok ? viewAllSeasons.value?.seasons ?? [] : [];

    return (
        <ProtectedRoute>
            <TemplateArea className="w-full">
                <h1 className="text-2xl text-gray-700 font-semibold mb-4">Alta de productos</h1>
                <FormNewProduct
                    brandList={brandItems}
                    seasonList={seasonItems}
                    categoryList={categoryItems} />
            </TemplateArea>
        </ProtectedRoute>
    );
}