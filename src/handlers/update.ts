import prisma from '../db'
import asyncWrapper from '../modules/asyncErrorHandler'

export const getUpdates = asyncWrapper(async (req, res) => {
    const userWithProducts = await prisma.user.findUniqueOrThrow({
        where: {
            id: req.user.id
        },
        include: {
            products: {
                select: {
                    id: true,
                    name: true,
                    updates: true
                }
            }
        }
    })


    // Extract and send only the updates information
    const updates = userWithProducts.products.map(product => product.updates).flat();
    res.json(updates);
})

export const getOneUpdate = asyncWrapper(async (req, res) => {
    const update = await prisma.update.findUniqueOrThrow({
        where: {
            id: req.params.id
        }
    })
    res.json({data: update})
})

export const createUpdate = asyncWrapper(async (req, res) => {
    const update = await prisma.update.create({
        data: {
            productId: req.body.productId,
            title: req.body.title,
            body: req.body.body,
            updatedAt: new Date()
        }
    })
    res.json({data:update})
})
export const updateUpdate = asyncWrapper(async (req, res) => {
    const updateId = req.params.id
    const userId = req.user.id
    const updateRecord = await prisma.update.findUniqueOrThrow({
        where: {
            id: updateId
        }
    })
    const productId = updateRecord.productId
    const userWithProduct = await prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            products: {
                where: {
                    id: productId
                }
            }
        }
    })
    if (!userWithProduct || userWithProduct.products.length === 0) {
        return res.status(403).json({error: "You have no permission to update the product"})
    }
    const updateUpdate = await prisma.update.update({
        where: {
            id: updateId
        },
        data: {
            title: req.body.title,
            body: req.body.body,
            status: req.body.status,
            version: req.body.version
        }
    })
    res.json({data: updateUpdate})
})
export const deleteUpdate = asyncWrapper(async (req, res) => {
    const update = await prisma.update.findUniqueOrThrow({
        where: {
            id: req.params.id
        }
    })
    const productId = update.productId
    const userWithProduct = await prisma.user.findUnique({
        where: {id: req.user.id},
        include: {
            products: {
                where: {
                    id: productId
                }
            }
        }
    })
    if (!userWithProduct || userWithProduct.products.length === 0) {
        return res.status(403).json({error: "You have no permission to update the product"})
    }
    const deleted = await prisma.update.delete({
        where:{
            id: req.params.id
        }
    })
    res.json({data:deleted})
})
