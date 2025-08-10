import { ErrorEntity } from "@/shared/features/error.entity";
import type { EstablishmentEntity } from "../../domain/entities/establishment.entity";
import { Result } from "@/shared/features/result";
import { EstablishmentRepository } from "../../domain/repositories/establishment.repository";
import { CreateEstablishmentDTO } from "../dtos/create-establishment.dto";

export class CreateEstablishmentUseCase{
    constructor(
        private readonly establishmentRepository: EstablishmentRepository,
    ){}

    async execute(dto: CreateEstablishmentDTO):Promise<Result<EstablishmentEntity,ErrorEntity>>{
        return await this.establishmentRepository.save(dto);
    }
}