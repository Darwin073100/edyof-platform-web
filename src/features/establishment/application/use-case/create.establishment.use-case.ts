import { ErrorEntity } from "@/shared/features/error.entity";
import type { EstablishmentEntity } from "../../domain/entities/establishment.entity";
import { EstablishmentService } from "../service/establishment.service";
import { Result } from "@/shared/features/result";

export class CreateEstablishmentUseCase{
    constructor(
        private readonly service: EstablishmentService,
    ){}

    async execute(name: string):Promise<Result<EstablishmentEntity,ErrorEntity>>{
        return await this.service.save(name);
    }
}