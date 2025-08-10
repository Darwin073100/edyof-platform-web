import { BaseEntity } from "@/shared/features/base.entity"

export interface EstablishmentEntity extends BaseEntity{
        establishmentId: bigint;
        name: string;
} 