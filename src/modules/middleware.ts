import { Request, Response,NextFunction } from "express"
import { validationResult } from "express-validator"

export const handleInputErrors = (req:Request,res:Response,next:NextFunction)=>{
    const errors = validationResult(req)
    console.log(`outside the loop, errors: ${errors.array}`)
    if (!errors.isEmpty()){
        console.log("errors isnt empty")
        res.status(400)
        res.json({errors:errors.array()})
    } else {
        next()
    }
}