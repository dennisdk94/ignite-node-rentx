import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";


const listCatoriesRepository = CategoriesRepository.getInstance();

const listCateoriesUseCase = new ListCategoriesUseCase(listCatoriesRepository)

const listCategoriesController = new ListCategoriesController(listCateoriesUseCase);

export { listCategoriesController }