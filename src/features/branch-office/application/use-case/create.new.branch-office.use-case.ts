import { Result } from "@/shared/features/result";
import { BranchOfficeInterface } from "../../domain/entities/branch-office.interface";
import { BranchOfficeService } from "../service/branch-office.service";
import { ErrorEntity } from "@/shared/features/error.entity";

export class CreateNewBranchOfficeUseCase{
    constructor(
        private readonly branchOfficeService: BranchOfficeService,
    ){}

    async execute(branchOffice:BranchOfficeInterface):Promise<Result<BranchOfficeInterface, ErrorEntity>>{
        return await this.branchOfficeService.save(branchOffice)
    }
}