import { ForSaleEnum } from "@/features/product/domain/enums/for-sale.enum";

export interface RegisterLotUnitPurchaseHttpDTO {
    purchasePrice: number;
    purchaseQuantity: number;
    unit: ForSaleEnum;
    unitsInPurchaseUnit: number;
}
