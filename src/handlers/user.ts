import prisma from "../db";
import {Request, Response} from "express";
import {comparePasswords, createJWT, hashPassword} from "../modules/auth";

export const createNewUser = async (req: Request, res: Response) => {
    console.log(`username:${req.body.username},
            password:${req.body.password}`)
    const user = await prisma.user.create({
        data: {
            username: req.body.username,
            password: await hashPassword(req.body.password)
        }
    })
    const token = createJWT(user)
    res.json({token})
}

export const signin = async (req: Request, res: Response) => {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }
    })
    if (user) {
        const pwIsValid = await comparePasswords(req.body.password, user.password)
        if (!pwIsValid) {
            res.status(401)
            res.json({message: "wrong password"})
            return
        }
        const token = createJWT(user)
        res.json({token})
    }

}