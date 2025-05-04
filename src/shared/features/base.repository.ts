import { ErrorEntity } from "./error.entity";

export interface BaseRepository<T>{
    save(entity: T): Promise<T|ErrorEntity>;
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T>;
    delete(id: string):Promise<void>;
}