import express, { NextFunction, Request, Response } from "express"
import { tokens } from "../login";

export default function authenticate(req: Request, res: Response, next: NextFunction) {
    const token = getTokenFromHeaders(req)
    if (tokens[token]) {
        const now = new Date().getTime();
        const inspartiontime=600000
        if(tokens[token].time !== undefined &&tokens[token].time>now-inspartiontime){next()}
        else{res.status(401).json({ message: "login again" })}
       
    } else {
        res.status(401).json({ message: "Unauthorized!" })
    }
}

function getTokenFromHeaders(req: any) {
    return req.headers.authorization as string
}
