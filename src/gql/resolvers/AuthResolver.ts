import { LoginDto, SignUpDto } from "../../data/dto/AuthDto"
import { passTokenToCookie, validateUserInput } from "../../utils/Helper"
import { iContext } from "../Context"
import { user } from "@prisma/client";
import { ValidationError } from "apollo-server-core";
import Define from "../../utils/Define";

const AuthResolver = {
    Query: {
        login: async (parent: any, args: LoginDto, context: iContext): Promise<{ token: string } & Partial<user>> => {
            const { prisma, res } = context
            const user = await prisma.user.findUnique({
                where: {
                    email: args.email!
                }
            })
            if (user === null) {
                throw new Error("No User Found.")
            }
            return passTokenToCookie(user, res)
        },
        logout: async (parent: any, args: any, context: iContext): Promise<boolean> => {
            context.res.clearCookie(Define.AUTH_KEY)
            return true
        }
    },
    Mutation: {
        signUp: async (parent: any, args: { inputUser: SignUpDto }, context: iContext): Promise<{ token: string } & Partial<user>> => {
            const { prisma, res } = context

            const hasError = validateUserInput(args.inputUser.email, args.inputUser.password)
            if (hasError === true) {
                throw new ValidationError("Enter Valid email,password.")
            }
            //create the user
            const user = await prisma.user.create({
                data: {
                    email: args.inputUser.email!,
                    password: args.inputUser.password!
                }
            })

            return passTokenToCookie(user, res)
        },
    }
}

export default AuthResolver