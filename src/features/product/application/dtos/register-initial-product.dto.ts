import { LocationEnum } from "@/features/inventory/domain/enums/location.enum";

export interface RegisterInitialProductDTO {
   // InventoryItem
    branchOfficeId: string;
    location: LocationEnum;
    quantityOnHand: number;
    lastStockedAt: Date;
    isSellable: boolean;
    purchasePriceAtStock: number;
    internalBarCode?: string | null;
    salePriceOne?: number | null;
    salePriceMany?: number | null;
    saleQuantityMany?: number | null;
    salePriceSpecial?: number | null;
    minStockBranch?: number | null;
    maxStockBranch?: number | null;
    // Lot
    lotNumber: string;
    purchasePrice: number;
    initialQuantity: number;
    expirationDate?: Date | null;
    manufacturingDate?: Date | null;
    receivedDate: Date;
    // Product
    establishmentId: string;
    categoryId: string;
    brandId?: string | null;
    seasonId?: string | null;
    name: string;
    sku?: string | null;
    universalBarCode?: string | null;
    description?: string | null;
    unitOfMeasure: string;
    minStockGlobal: number;
    imageUrl?: string | null;
}