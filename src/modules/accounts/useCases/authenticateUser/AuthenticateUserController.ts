import { Request, Response } from "express";
import { container } from "tsyringe";
import { AutheticateUserUseCase } from "./AuthenticateUserUseCase";


class AuthenticateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { password, email } = request.body

        const authenticateUserUseCase = container.resolve(AutheticateUserUseCase)

        const authenticateInfo = await authenticateUserUseCase.execute({ password, email })

        return response.json(authenticateInfo)
    }
}

export { AuthenticateUserController }