import { Result } from "@/shared/features/result";
import { BranchOfficeInterface } from "../../domain/entities/branch-office.interface";
import { ErrorEntity } from "@/shared/features/error.entity";
import { BranchOfficeRepository } from "../../domain/repositories/branch-office.repository";

export class CreateNewBranchOfficeUseCase{
    constructor(
        private readonly branchOfficeRepository: BranchOfficeRepository,
    ){}

    async execute(branchOffice:BranchOfficeInterface):Promise<Result<BranchOfficeInterface, ErrorEntity>>{
        return await this.branchOfficeRepository.save(branchOffice)
    }
}