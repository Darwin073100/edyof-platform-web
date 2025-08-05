import { Result } from "@/shared/features/result";
import { AuthAccesTokenDTO } from "../../application/dtos/auth.access-token.dto";
import { ErrorEntity } from "@/shared/features/error.entity";
import { AuthLoginDTO } from "../../application/dtos/auth.login.dto";

export interface AuthRepository{
    login(dto: AuthLoginDTO):Promise<Result<AuthAccesTokenDTO, ErrorEntity>>;
}