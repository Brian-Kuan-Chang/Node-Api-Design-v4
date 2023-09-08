import express, {urlencoded} from 'express'
import router from "./router";
import morgan from 'morgan'
import cors from 'cors'
import {protect} from "./modules/auth";
import {createNewUser, signin} from "./handlers/user";


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
console.log("line before app use protect")
app.use("/api", protect, router)

app.post('/user', createNewUser)
app.post('/signin', signin)

export default app;

