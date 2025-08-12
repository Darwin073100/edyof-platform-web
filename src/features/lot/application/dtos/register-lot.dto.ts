import { ForSaleEnum } from "@/features/product/domain/enums/for-sale.enum";

export interface RegisterLotDTO {
    productId: string;
    lotNumber: string;
    purchasePrice: number;
    purchaseUnit: ForSaleEnum;
    initialQuantity: number;
    expirationDate?: Date |string | null;
    manufacturingDate?: Date |string | null;
    receivedDate: Date |string;
    
}