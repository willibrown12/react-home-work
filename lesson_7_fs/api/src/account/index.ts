
import express, { Request, Response } from "express"

const accountRouter = express.Router();

accountRouter.get("/transactions", (req: Request, res: Response, next) => {
    res.status(200).json([{ id: "t1", amount: 5000 }, { id: "t2", amount: 6000 }])
})
export { accountRouter }
