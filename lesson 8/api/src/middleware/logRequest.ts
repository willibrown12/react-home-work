import express, { NextFunction, Request, Response } from "express"

export default function logRequest(req: Request, res: Response, next: NextFunction) {
    console.log(`[${new Date().toISOString()}] ${req.url} ${req.ip}`)
    next()
}

