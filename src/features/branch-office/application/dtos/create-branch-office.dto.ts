export interface CreateBranchOfficeDTO{
        establishmentId: bigint;
        name: string;
        postalCode: string;
        street: string;
        internalNumber: string;
        externalNumber: string;
        neighborhood: string;
        municipality: string;
        country: string;
        city: string;
        state: string;
        reference?: string;
}