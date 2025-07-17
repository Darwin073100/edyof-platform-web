import { ErrorEntity } from "@/shared/features/error.entity";
import { Result } from "@/shared/features/result";
import { InventoryItemEntity } from "./entities/inventory.entity";

export interface InventoryItemRepository{
    viewAllInventoryItem():Promise<Result<{inventoryItems:InventoryItemEntity[]},ErrorEntity>>;
}