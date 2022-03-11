import { inject, injectable } from "tsyringe";
import { hash } from 'bcrypt';
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRespository } from "../../repositories/IUsersRepository";
import { AppError } from './../../../../errors/AppError';

@injectable()
class CreateUserUserCase {
    constructor(@inject("UserRepository") private usersRepository: IUsersRespository) {}

    async execute({ name, email, password, driver_license }: ICreateUserDTO): Promise<void> {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if(userAlreadyExists) {
            throw new AppError("User already exists!");
        }

        const passwordHash = await hash(password, 8);
        
        await this.usersRepository.create({
            name,
            email,
            password:passwordHash,
            driver_license
        })
    }
}

export { CreateUserUserCase }