import { ErrorEntity } from "@/shared/features/error.entity";
import { Result } from "@/shared/features/result";
import { InventoryResponseDTO } from "../entities/inventory-response.dto";
import { RegisterInventoryItemDTO } from "../../application/dtos/register-inventory-item.dto";

export interface InventoryItemRepository{
    save(dto: RegisterInventoryItemDTO):Promise<Result<InventoryResponseDTO, ErrorEntity>>;
    viewAllInventoryItem():Promise<Result<{inventoryItems:InventoryResponseDTO[]},ErrorEntity>>;
}