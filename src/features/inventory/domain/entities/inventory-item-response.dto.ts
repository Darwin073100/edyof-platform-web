import { LocationEnum } from "../enums/location.enum";
import { InventoryResponseDTO } from "./inventory-response.dto";

export interface InventoryItemResponseDTO{
    inventoryItemId      : bigint;
    inventoryId          : bigint;
    location             : LocationEnum;
    quantityOnHan        : number;
    lastStockedAt        : Date;
    purchasePriceAtStock : number;
    internalBarCode?     : string | null;
    createdAt            : Date;
    updatedAt?           : Date|null;
    deletedAt?           : Date|null;
    inventory?           : InventoryResponseDTO|null;
}