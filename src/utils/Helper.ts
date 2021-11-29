import { user } from ".prisma/client";
import { AuthenticationError } from "apollo-server-express";
import { Response } from "express";
import jwt from 'jsonwebtoken'
import Define from "./Define";
/**
 * 
 * @param paramarr 
 * @returns {Boolean} hasError
 */
export const validateUserInput = (...paramarr: any[]): Boolean => {
    // [ "username1","1234567" ,-1]
    let hasError = true;
    paramarr.forEach(item => {
        if (item === null || item === undefined) {
            hasError = true
            return hasError
        } else {
            hasError = false
        }
    })
    return hasError
}


export const passTokenToCookie = (user: user, res: Response) => {

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRATE + "")
    const newuserobj: { token: string } & Partial<user> = {
        ...user,
        token: token
    }
    //console.log("before: ", newuserobj);
    delete newuserobj.password
    //console.log("after: ", newuserobj);

    //send back to token as cookie
    res.cookie(Define.AUTH_KEY, token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 24 * 60 * 60 * 1
    })
    return newuserobj
}


export const verifyJwtToken = (token: string): number => {
    if (!token) {
        throw new AuthenticationError("token is not available")
    }

    const { id }: any = jwt.verify(token, process.env['JWT_SECRATE'] + "")

    return id
}