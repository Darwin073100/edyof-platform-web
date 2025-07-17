import { ProductEntity } from "./product.entity";

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
  createdAt          : Date;
  updatedAt?         : Date | null;
  deletedAt?         : Date | null;
}