import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRespository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUserCase {
    constructor(@inject("UserRepository") private usersRepository: IUsersRespository) {}

    async execute({ name, username, email, password, driver_license }: ICreateUserDTO): Promise<void> {
        await this.usersRepository.create({
            name,
            username,
            email,
            password,
            driver_license
        })
    }
}

export { CreateUserUserCase }