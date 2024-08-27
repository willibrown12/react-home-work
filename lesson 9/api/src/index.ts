import express, { Request, Response,NextFunction } from "express"
import { number, z, ZodError } from "zod"
/* import { accountexist } from "./handlers/accountexist" */

export const operationRouter = express.Router();
const ammount = z.number().min(3)
const action = z.string()
const accountId = z.string().min(3)


type history =[{
time:string,
action:string,
money:number,
ammount:number
}]
type idObject={
    money:number,
    history:history
}
export const accounts: { [key:string]: idObject } =
    { "accountid": { money:22 , history:[{time:"string",
        action:"string",
        money:22,ammount:22}] } };



const accountscheme = z.object({
    ammount:ammount,
    action:action,
    accountId:accountId
})


operationRouter.post('/operation', function (req:Request, res:Response,next:NextFunction) {
   accountscheme.parse(req.body) 
try{  if ( !accounts[req.body.accountId]) {
    accounts[req.body.accountId]={money:0,history:[{time: new Date().toISOString(),money:0,action:"account crated",ammount:0}]}
}
if (req.body.action==="deposit") { 
    accounts[req.body.accountId].money=req.body.ammount+ accounts[req.body.accountId].money
   } else {
    accounts[req.body.accountId].money= accounts[req.body.accountId].money-req.body.ammount
   }
 const whathappened={time: new Date().toISOString(),money: accounts[req.body.accountId].money,action:req.body.action,ammount:req.body.ammount}
   accounts[req.body.accountId].history.push(whathappened)


   console.log(accounts);
   
    return res.status(200).json({ message: "account action is succseful" })
}catch (error: any) {
    return res.status(400).json({ error: "something went wrong" })
}
  
    
   
 })


 operationRouter.get('/operation/:accountid', function (req:Request, res:Response,next:NextFunction) {
    const findaccountid=req.params.accountid
   

    res.status(200).json(accounts[findaccountid].history)
  })
  
 


 