import { RegisterInitialProductDTO } from "../../application/dtos/register-initial-product.dto";
import { RegisterInitialProductHttpDTO } from "../dtos/register-initial-product-http.dto";

export class ProductMapper{
    /**
     * Este metodo es usado para convertir la información ingresada en el formulario, a informacion que sea compatible con los JSONs del request
     * es informacion de Product, Lot e InventoryItem 
     */
    static toHttpMany(dto: RegisterInitialProductDTO){
        const result:RegisterInitialProductHttpDTO = {
            branchOfficeId: dto.branchOfficeId,
            name: dto.name,
            description: dto.description,
            categoryId: dto.categoryId,
            brandId: dto.brandId,
            seasonId: dto.seasonId,
            universalBarCode: dto.universalBarCode,
            unitOfMeasure: dto.unitOfMeasure,
            minStockGlobal: dto.minStockGlobal,
            imageUrl: dto.imageUrl,
            lotNumber: dto.lotNumber,
            purchasePrice: dto.purchasePrice,
            purchasePriceAtStock: dto.purchasePriceAtStock,
            initialQuantity: dto.initialQuantity,
            purchaseUnit: dto.purchaseUnit,
            lotUnitPurchases: dto.lotUnitPurchases,
            isSellable: dto.isSellable,
            location: dto.location,
            internalBarCode: dto.internalBarCode,
            maxStockBranch: dto.maxStockBranch,
            minStockBranch: dto.minStockBranch,
            salePriceOne: dto.salePriceOne,
            salePriceMany: dto.salePriceMany,
            salePriceSpecial: dto.salePriceSpecial,
            saleQuantityMany: dto.saleQuantityMany,
            establishmentId: dto.establishmentId,
            quantityOnHand: dto.quantityOnHand,
            expirationDate: dto.expirationDate?.toJSON(),
            manufacturingDate: dto.manufacturingDate?.toJSON(),
            receivedDate: dto.receivedDate.toJSON(),
            lastStockedAt: dto.lastStockedAt.toJSON(),
        };
        return result;
    }
}