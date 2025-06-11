import { Result } from "@/shared/features/result";
import { BranchOfficeInterface } from "../entities/branch-office.interface";
import { ErrorEntity } from "@/shared/features/error.entity";

export interface BranchOfficeRepository{
    save(data:BranchOfficeInterface):Promise<Result<BranchOfficeInterface, ErrorEntity>>
}