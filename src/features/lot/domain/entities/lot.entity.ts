import { InventoryItemEntity } from "@/features/inventory/domain/entities/inventory.entity";
import { ProductEntity } from "../../../product/domain/entities/product.entity";

export interface LotEntity {
  lotId              : bigint;
  productId          : bigint;
  lotNumber          : string;
  purchasePrice      : number;
  initialQuantity    : number;
  expirationDate?    : Date | null;
  manufacturingDate? : Date | null;
  product?           : ProductEntity | null;
  receivedDate       : Date;
  inventoryItems     : InventoryItemEntity[];
  createdAt          : Date;
  updatedAt?         : Date | null;
  deletedAt?         : Date | null;
}