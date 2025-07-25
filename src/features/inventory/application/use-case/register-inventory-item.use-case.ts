import { InventoryItemRepository } from "../../domain/repositories/inventory-item.repository";
import { RegisterInventoryItemDTO } from "../dtos/register-inventory-item.dto";

export class RegisterInventoryItemUseCase{
    constructor(
        private readonly repository: InventoryItemRepository
    ){}

    async execute(dto: RegisterInventoryItemDTO){
        const result = await this.repository.save(dto);
        return result;
    }
}