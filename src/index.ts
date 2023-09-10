import app from './server'
import * as dotenv from "dotenv";

dotenv.config();

import config from './env/index'
app.listen(config.port,()=>{
    console.log(`server listen on port ${config.port}`)
})