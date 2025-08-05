import { Result } from "@/shared/features/result";
import { AuthRepository } from "../../domain/repositories/auth.repository";
import { AuthLoginDTO } from "../dtos/auth.login.dto";
import { AuthAccesTokenDTO } from "../dtos/auth.access-token.dto";
import { ErrorEntity } from "@/shared/features/error.entity";

export class AuthLoginUseCase {
    constructor(
        private readonly authRepository: AuthRepository
    ){}
    async execute(dto: AuthLoginDTO):Promise<Result<AuthAccesTokenDTO, ErrorEntity>>{
        const result = await this.authRepository.login(dto);
        return result;
    }
}