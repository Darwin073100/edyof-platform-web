export interface RegisterUserWithEmployeeDTO{
    branchOfficeId: bigint;
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string|null;
}