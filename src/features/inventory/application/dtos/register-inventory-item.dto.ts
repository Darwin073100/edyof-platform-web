import { LocationEnum } from "../../domain/enums/location.enum";

export interface RegisterInventoryItemDTO {
    productId: string,
    lotId: string,
    branchOfficeId: string,
    location: LocationEnum,
    quantityOnHand: number,
    lastStockedAt: Date |string,
    isSellable: boolean,
    purchasePriceAtStock: number,
    internalBarCode?: string | null,
    salePriceOne?: number | null,
    salePriceMany?: number | null,
    saleQuantityMany?: number | null,
    salePriceSpecial?: number | null,
    minStockBranch?: number | null,
    maxStockBranch?: number | null
}