import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UserRepository } from "../modules/accounts/repositories/implementations/UserRepository";
import { AppError } from './../errors/AppError';

interface IPayload {
    sub: string;
}


export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new AppError("Token missing", 401)
    }

    const [, token] = authHeader.split(" ")

   try {
        const { sub: user_id } = verify(token, "10042728fb4cdbeb6803a757ab9e3617") as IPayload

        const userRepository = new UserRepository()

        const user = await userRepository.findById(user_id)

        if(!user) {
            throw new AppError("User does not exists!", 401)
        }

        request.user = {
            id: user_id
        }

        next();
   } catch {
       throw new AppError("Invalid token", 401)
   }

}