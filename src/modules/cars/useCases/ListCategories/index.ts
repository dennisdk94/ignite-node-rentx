import { CategoriesRepository } from "../../repositories/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";


const listCatoriesRepository = new CategoriesRepository()

const listCateoriesUseCase = new ListCategoriesUseCase(listCatoriesRepository)

const listCategoriesController = new ListCategoriesController(listCateoriesUseCase);

export { listCategoriesController }