import express, {Request, Response, urlencoded, NextFunction} from 'express'
import router from "./router";
import morgan from 'morgan'
import cors from 'cors'
import {protect} from "./modules/auth";
import {createNewUser, signin} from "./handlers/user";
import {body} from 'express-validator'
import {handleInputErrors} from './modules/middleware'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(urlencoded({extended: true}))
app.get('/', (req, res) => {
    console.log("hello from express")
    res.statusCode = 200
    res.json({message: 'hello'})
})
// when u want to use api, add api in front of it
// such as /api/product
app.use("/api", protect, router)

app.post('/user',
    body("username").exists().isString(),
    body("password").exists().isString(),
    handleInputErrors,
    createNewUser)
app.post('/signin',
    body("username").exists().isString(),
    body("password").exists().isString(),
    handleInputErrors,
    signin)

app.get('/',async (req,res)=>{
    res.json({message:'hello'})
})
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log("hi")
    console.log(err)
    res.json({message: `error: ${err.message}`})
})

export default app;

