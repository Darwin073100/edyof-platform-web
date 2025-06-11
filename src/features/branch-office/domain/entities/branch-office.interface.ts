import { BaseEntity } from "@/shared/features/base.entity";

export interface BranchOfficeInterface extends BaseEntity{
    establishmentId: bigint;
    name: string;
    postalCode: string;
    street: string;
    betweenStreets?: string;
    interiorNumber: string;
    exteriorNumber: string;
    neighborhood: string;
    district: string;
    city: string;
    state: string;
    additionalReferences?: string;
}