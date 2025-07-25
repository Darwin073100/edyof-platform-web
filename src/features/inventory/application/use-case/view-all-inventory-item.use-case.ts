import { InventoryItemRepository } from "../../domain/repositories/inventory-item.repository";

export class ViewAllInventoryItemUseCase{
    constructor(
        private readonly inventoryItemRepository: InventoryItemRepository
    ){}

    async execute(){
        const result = await this.inventoryItemRepository.viewAllInventoryItem();
        return result;
    }
}