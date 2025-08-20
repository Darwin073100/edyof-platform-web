import { LotEntity } from "../../../lot/domain/entities/lot.entity";
import { ProductEntity } from "../../../product/domain/entities/product.entity";
import { InventoryItemResponseDTO } from "./inventory-item-response.dto";

export interface InventoryResponseDTO{
    inventoryId       : bigint;
    productId         : bigint;
    lotId             : bigint;
    branchOfficeId    : bigint;
    isSellable        : boolean;
    salePriceOne?     : number | null;
    salePriceMany?    : number | null;
    saleQuantityMany? : number | null;
    salePriceSpecial? : number | null;
    minStockBranch?   : number | null;
    maxStockBranch?   : number | null;
    createdAt         : Date;
    updatedAt?        : Date|null;
    deletedAt?        : Date|null;
    product?          : ProductEntity|null,
    lot?              : LotEntity | null,
    inventoryItems?   : InventoryItemResponseDTO[] | null
}