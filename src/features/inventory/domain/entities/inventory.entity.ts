import { LocationEnum } from "../enums/location.enum";
import { LotEntity } from "./lot.entity";
import { ProductEntity } from "../../../product/domain/entities/product.entity";

export interface InventoryItemEntity{
    inventoryItemId      : bigint,
    productId            : bigint,
    lotId                : bigint,
    branchOfficeId       : bigint,
    location             : LocationEnum,
    quantityOnHan        : number,
    lastStockedAt        : Date,
    isSellable           : boolean,
    purchasePriceAtStock : number,
    createdAt            : Date,
    internalBarCode?     : string | null,
    salePriceOne?        : number | null,
    salePriceMany?       : number | null,
    saleQuantityMany?    : number | null,
    salePriceSpecial?    : number | null,
    minStockBranch?      : number | null,
    maxStockBranch?      : number | null,
    updatedAt?           : Date|null,
    deletedAt?           : Date|null,
    product?             : ProductEntity|null,
    lot?                 : LotEntity | null
}