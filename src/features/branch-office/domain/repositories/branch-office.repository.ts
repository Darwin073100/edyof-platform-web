import { Result } from "@/shared/features/result";
import { BranchOfficeEntity } from "../entities/branch-office.entity";
import { ErrorEntity } from "@/shared/features/error.entity";
import { CreateBranchOfficeDTO } from "../../application/dtos/create-branch-office.dto";

export interface BranchOfficeRepository{
    save(data:CreateBranchOfficeDTO):Promise<Result<BranchOfficeEntity, ErrorEntity>>
}