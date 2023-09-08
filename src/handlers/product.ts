import {Request, Response} from "express"
import prisma from "../db"

export const getProducts = async (req: Request, res: Response) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        include: {
            products: true
        }
    })
    res.json({data: user!.products})
}

export const getOneProduct = async (req: Request, res: Response) => {
    const id = req.params.id
    const product = await prisma.product.findUnique({
        where: {
            id, //  shorthand { id: id }
            belongsToId: req.user.id
        }
    })
    res.json({data: product})

}
export const createProduct = async  (req:Request,res:Response)=>{
    const product = await prisma.product.create({
        data:{
            name: req.body.name,
            belongsToId: req.user.id
        }
    })
    res.json({data:product})
}

export const updateProduct = async (req:Request,res:Response)=>{
    const updated = await  prisma.product.update({
        where:{
            id: req.params.id
        },
        data:{
            name: req.body.name
        }
    })
    res.json({data:updated})
}

export const deleteProduct = async(req:Request,res:Response)=>{
    const deleted = await prisma.product.delete({
        where:{
            id: req.params.id,
            belongsToId:req.user.id
        }
    })
    res.json({data:deleted})
}