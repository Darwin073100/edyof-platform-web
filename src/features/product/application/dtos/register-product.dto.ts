export interface RegisterProductDTO {
    establishmentId: string;
    categoryId: string;
    brandId?:  string | null;
    seasonId?:  string| null;
    name: string;
    sku?: string | null;
    universalBarCode?: string | null;
    description?: string | null;
    unitOfMeasure: string;
    minStockGlobal: number;
    imageUrl?: string | null;
}