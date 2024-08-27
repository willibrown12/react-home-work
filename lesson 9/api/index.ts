import express, { NextFunction, Request, response, Response } from "express"
import cors from "cors"
import bodyParser from "body-parser"
import { operationRouter } from "./src/index"
const app = express()


app.use(cors())
app.use(bodyParser.json())

app.get('/account/history', function (req:Request, res:Response,next:NextFunction) {
  res.send('Hello World')
  
})



app.use("/account", operationRouter)



app.listen(3600, () => {
  console.log(`Running on PORT: 3600`)
})
