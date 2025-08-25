export interface UpdateProductHttpDTO {
    productId: string;
    categoryId: string;
    brandId?:  string | null;
    seasonId?:  string | null;
    name: string;
    sku?: string | null;
    universalBarCode?: string | null;
    description?: string | null;
    unitOfMeasure: string;
    minStockGlobal: number;
}