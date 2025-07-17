import { ErrorEntity } from "@/shared/features/error.entity";
import { Result } from "@/shared/features/result";
import { InventoryItemEntity } from "../domain/entities/inventory.entity";
import { InventoryItemRepository } from "../domain/inventory-item.repository";

export class InventoryItemFetchRepositoryImpl implements InventoryItemRepository {
    private readonly URL = `${process.env.URL_EDYOF_PLATFORM_API}${process.env.PREFIX_EDYOF_PLATFORM_API}/inventory-items`;
   
    async viewAllInventoryItem(): Promise<Result<{ inventoryItems: InventoryItemEntity[] }, ErrorEntity>> {
        try {
            const response = await fetch(`${this.URL}`,{
                method: 'GET'
            });

            if (!response.ok) {
                const error = await response.json() as ErrorEntity;
                return Result.failure(error);
            }

            const inventory = await response.json() as { inventoryItems: InventoryItemEntity[] };
            return Result.success(inventory);

        } catch (error: any) {
            return Result.failure({
                error: error?.message || error,
                message: 'No se pudo conectar al backend',
                statusCode: 500,
                path: `${process.env.PREFIX_EDYOF_PLATFORM_API}/establishments`,
                timestamp: new Date().toDateString()
            } satisfies ErrorEntity);
        }
    }
}