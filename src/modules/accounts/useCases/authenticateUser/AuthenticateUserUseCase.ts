import { inject, injectable } from "tsyringe";
import { IUsersRespository } from "../../repositories/IUsersRepository";
import { sign } from "jsonwebtoken";

import { compare } from 'bcrypt'
import { AppError } from './../../../../errors/AppError';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string,
        email: string
    },
    token: string
}

@injectable()
class AutheticateUserUseCase {
    constructor(
        @inject("UserRepository")
        private usersRepository: IUsersRespository
        ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if(!user) {
            throw new AppError("Email or password incorrect!")
        }

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch) {
            throw new AppError("Email or password incorrect!")
        }

        const token = sign({}, "10042728fb4cdbeb6803a757ab9e3617", {
            subject: user.id,
            expiresIn: "1d"
        })

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            }
        }

        return tokenReturn
    }
}

export { AutheticateUserUseCase }