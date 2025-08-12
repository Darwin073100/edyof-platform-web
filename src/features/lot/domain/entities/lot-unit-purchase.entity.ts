import { ForSaleEnum } from "@/features/product/domain/enums/for-sale.enum";

export interface LotUnitPurchaseEntity {
  lotUnitPurchaseId: bigint;
  lotId: bigint;
  purchasePrice: number;
  purchaseQuantity: number;
  unit: ForSaleEnum;
  createdAt          : Date;
  updatedAt?         : Date | null;
  deletedAt?         : Date | null;
}