import { ErrorEntity } from "@/shared/features/error.entity";
import { EstablishmentRepository } from "../../domain/repositories/establishment.repository";
import { EstablishmentEntity } from "../../domain/entities/establishment.entity";
import { Result } from "@/shared/features/result";

export class EstablishmentService{
    constructor(
        private readonly establishmentRepository: EstablishmentRepository,
    ){}

    async save(name: string):Promise<Result<EstablishmentEntity,ErrorEntity>>{
        return await this.establishmentRepository
            .save({
                name
        });
    }

}