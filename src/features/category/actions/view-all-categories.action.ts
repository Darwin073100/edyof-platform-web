'use server'
import { ViewAllCategoriesUseCase } from "../application/use-case/view-all-categories.use-case";
import { CategoryFetchRepositoryImpl } from "../infraestructure/category-fetch-repository.imp";

export async function ViewAllCategoriesAction(){
    // Inyeccion de las dependencias
    const categoryFetchRepositoryImpl = new CategoryFetchRepositoryImpl();
    const viewAllCategoriesUseCase = new ViewAllCategoriesUseCase(categoryFetchRepositoryImpl);

    const result = await viewAllCategoriesUseCase.execute();

    return {
        ...result
    }
}