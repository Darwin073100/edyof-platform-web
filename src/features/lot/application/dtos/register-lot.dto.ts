export interface RegisterLotDTO {
    productId: string;
    lotNumber: string;
    purchasePrice: number;
    initialQuantity: number;
    expirationDate?: Date |string | null;
    manufacturingDate?: Date |string | null;
    receivedDate: Date |string;
    
}