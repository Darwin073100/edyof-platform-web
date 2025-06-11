import { Result } from "@/shared/features/result";
import { BranchOfficeInterface } from "../../domain/entities/branch-office.interface";
import { BranchOfficeRepository } from "../../domain/repositories/branch-office.repository";
import { ErrorEntity } from "@/shared/features/error.entity";

export class BranchOfficeService{
    constructor(
        private readonly branchOfficeRepository: BranchOfficeRepository,
    ){}

    async save(branchOffice:BranchOfficeInterface):Promise<Result<BranchOfficeInterface, ErrorEntity>>{
        return this.branchOfficeRepository.save(branchOffice);
    }
}