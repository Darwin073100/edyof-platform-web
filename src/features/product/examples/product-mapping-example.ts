import { RegisterInitialProductDTO } from "../application/dtos/register-initial-product.dto";
import { ProductMapper } from "../infraestructure/mappers/product.mapper";
import { ForSaleEnum } from "../domain/enums/for-sale.enum";

// Ejemplo de datos que vienen del formulario
const exampleDTO: RegisterInitialProductDTO = {
    establishmentId: "1",
    categoryId: "37",
    brandId: "8",
    seasonId: "6",
    name: "Sombrilla doble tela gt",
    description: "Terminar el curso",
    minStockGlobal: 56,
    unitOfMeasure: "pc",
    universalBarCode: "56",
    initialQuantity: 217,
    purchaseUnit: ForSaleEnum.PC,
    lotUnitPurchases: [
        {
            purchasePrice: 1,
            purchaseQuantity: 6,
            unit: ForSaleEnum.PAQUETE,
            unitsInPurchaseUnit: 36
        },
        {
            purchasePrice: 1,
            purchaseQuantity: 6,
            unit: ForSaleEnum.DOC,
            unitsInPurchaseUnit: 36
        }
    ],
    lotNumber: "24",
    purchasePrice: 17,
    receivedDate: new Date("2025-07-24T06:00:00.000Z"),
    branchOfficeId: "1",
    isSellable: true,
    maxStockBranch: 24,
    minStockBranch: 60,
    salePriceMany: 25,
    salePriceOne: 36,
    salePriceSpecial: 74,
    saleQuantityMany: 47,
    inventoryItems: [
        {
            lastStockedAt: new Date("2025-07-24T22:16:15.051Z"),
            location: "dañado",
            purchasePriceAtStock: 0,
            quantityOnHand: 46,
            internalBarCode: "45678"
        },
        {
            lastStockedAt: new Date("2025-07-24T22:16:15.051Z"),
            location: "venta",
            purchasePriceAtStock: 0,
            quantityOnHand: 46,
            internalBarCode: "45678"
        }
    ]
};

// Ejemplo de uso del mapper
const httpDTO = ProductMapper.toHttpMany(exampleDTO);

export { exampleDTO, httpDTO };
