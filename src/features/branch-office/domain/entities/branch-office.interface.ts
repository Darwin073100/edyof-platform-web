import { BaseEntity } from "@/shared/features/base.entity";

export interface BranchOfficeInterface extends BaseEntity{
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