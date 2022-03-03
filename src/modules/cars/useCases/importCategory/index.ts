import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";
import { ImportCategoryController } from "./ImportCategotyController";

const categoriesRepository = null

const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);

const importCategoryController = new ImportCategoryController(importCategoryUseCase);

export {importCategoryController}
