import { ErrorEntity } from "@/shared/features/error.entity";
import { Result } from "@/shared/features/result";
import { InventoryItemEntity } from "../entities/inventory.entity";
import { RegisterInventoryItemDTO } from "../../application/dtos/register-inventory-item.dto";

export interface InventoryItemRepository{
    save(dto: RegisterInventoryItemDTO):Promise<Result<InventoryItemEntity, ErrorEntity>>;
    viewAllInventoryItem():Promise<Result<{inventoryItems:InventoryItemEntity[]},ErrorEntity>>;
}