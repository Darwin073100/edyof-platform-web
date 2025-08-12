import { ForSaleEnum } from "@/features/product/domain/enums/for-sale.enum";

export interface RegisterLotUnitPurchaseDTO{
      purchasePrice: number;
      purchaseQuantity: number;
      unit: ForSaleEnum;
}