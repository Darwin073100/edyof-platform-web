import { RegisterInitialProductDTO } from "../../application/dtos/register-initial-product.dto";
import { RegisterInitialProductHttpDTO } from "../dtos/register-initial-product-http.dto";

export class ProductMapper{
    /**
     * Este metodo es usado para convertir la información ingresada en el formulario, a informacion que sea compatible con los JSONs del request
     * es informacion de Product, Lot e InventoryItem 
     */
    static toHttpMany(dto: RegisterInitialProductDTO): RegisterInitialProductHttpDTO {
        const result: RegisterInitialProductHttpDTO = {
            // Product
            establishmentId: dto.establishmentId,
            categoryId: dto.categoryId,
            brandId: dto.brandId,
            seasonId: dto.seasonId,
            name: dto.name,
            description: dto.description,
            universalBarCode: dto.universalBarCode,
            unitOfMeasure: dto.unitOfMeasure,
            minStockGlobal: dto.minStockGlobal,
            imageUrl: dto.imageUrl,
            
            // Lot
            lotNumber: dto.lotNumber,
            purchasePrice: dto.purchasePrice,
            initialQuantity: dto.initialQuantity,
            purchaseUnit: dto.purchaseUnit,
            expirationDate: dto.expirationDate?.toJSON() || null,
            manufacturingDate: dto.manufacturingDate?.toJSON() || null,
            receivedDate: dto.receivedDate.toJSON(),
            lotUnitPurchases: dto.lotUnitPurchases?.map(purchase => ({
                purchasePrice: purchase.purchasePrice,
                purchaseQuantity: purchase.purchaseQuantity,
                unit: purchase.unit,
                unitsInPurchaseUnit: purchase.unitsInPurchaseUnit
            })) || null,
            
            // InventoryItem
            branchOfficeId: dto.branchOfficeId,
            isSellable: dto.isSellable,
            salePriceOne: dto.salePriceOne,
            salePriceMany: dto.salePriceMany,
            salePriceSpecial: dto.salePriceSpecial,
            saleQuantityMany: dto.saleQuantityMany,
            minStockBranch: dto.minStockBranch,
            maxStockBranch: dto.maxStockBranch,
            
            // Inventory Items array
            inventoryItems: dto.inventoryItems?.map(item => ({
                location: item.location,
                quantityOnHand: item.quantityOnHand,
                lastStockedAt: item.lastStockedAt.toJSON(),
                purchasePriceAtStock: item.purchasePriceAtStock,
                internalBarCode: item.internalBarCode
            })) || null
        };
        return result;
    }
}