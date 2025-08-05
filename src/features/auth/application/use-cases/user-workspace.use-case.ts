import { Result } from "@/shared/features/result";
import { AuthAccesTokenDTO } from "../dtos/auth.access-token.dto";
import { UserWorkspaceResponseDTO } from "../dtos/user-workspace-response.dto";
import { ErrorEntity } from "@/shared/features/error.entity";
import { AuthRepository } from "../../domain/repositories/auth.repository";

export class UserWorkspaceUseCase {
    constructor(
        private readonly authRepository: AuthRepository
    ){}

    async execute(dto: AuthAccesTokenDTO): Promise<Result<UserWorkspaceResponseDTO, ErrorEntity>> {
        const result = await this.authRepository.userWorkspace(dto);
        return result;
    }
}