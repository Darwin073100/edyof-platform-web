import { DomainException } from "./domain.exceptions";

export class InvalidAddressException extends DomainException{
    constructor(message: string){
        super(message);
    }
}