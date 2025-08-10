import { Result } from "@/shared/features/result";
import { BranchOfficeEntity } from "../../domain/entities/branch-office.entity";
import { ErrorEntity } from "@/shared/features/error.entity";
import { BranchOfficeRepository } from "../../domain/repositories/branch-office.repository";
import { CreateBranchOfficeDTO } from "../dtos/create-branch-office.dto";

export class CreateNewBranchOfficeUseCase{
    constructor(
        private readonly branchOfficeRepository: BranchOfficeRepository,
    ){}

    async execute(branchOffice:CreateBranchOfficeDTO):Promise<Result<BranchOfficeEntity, ErrorEntity>>{
        return await this.branchOfficeRepository.save(branchOffice)
    }
}