import express, { NextFunction, Request, Response } from "express"

export default function addRequestId(req: Request, res: Response, next: NextFunction) {
    res.setHeader("x-request-id", Math.ceil(Math.random() * 999999999).toString())
    next()
}

