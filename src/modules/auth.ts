import jwt from 'jsonwebtoken'
import {User} from "../type";
import {NextFunction, Request, Response} from "express";
import bcrypt from 'bcrypt'

export const comparePasswords = async (password:string, hashPassword: string) => {
    return bcrypt.compare(password, hashPassword)
}

export const hashPassword = async (password:string) =>{
    console.log("Password to hash:", password);
    return bcrypt.hash(password,3)
}




export const createJWT = (user: User) => {
    const token = jwt.sign(
        {id: user.id, username: user.username},
        process.env.JWT_SECRET! //adding ! to assert the secret will not be null
    )
    return token;
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization
    console.log(`inside protect function, and bearer: ${bearer}`)

    if (!bearer) {
        res.statusCode = 401
        res.send("Not authorized");
        return
    }

    // As designing, the token: Bearer xxxxx12e, after u split it " ", and destructuring as the xxx matches the token
    const [, token] = bearer.split(' ')
    console.log(`token: ${token}`)
    if (!token) {
        res.statusCode = 401
        res.send("Not authorized");
        return;
    }
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET!)
        req.user = user
        console.log(user);
        next()
        return;
    } catch (e) {
        console.error(e)
        res.statusCode = 401
        res.send("Not authorized");
        return;
    }

}