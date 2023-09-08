import 'express'

export type User = {
    id: String;
    username: String;
}

declare module 'express' {
    export interface Request {
        user?:any;
    }
}