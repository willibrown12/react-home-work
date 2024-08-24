import express, { Request, Response } from "express"
import { number, z, ZodError } from "zod"
import { ifUserExist } from "./handlers/register";
import { getToken, loginUser } from "./handlers/login";
const loginRouter = express.Router();
const users: Array<RegisteredUser> = [{
    userName: "michal@gmail.com",
    fullName: "michal sivan sivan",
    phone: "058545425",
    password: "wiliwilAA111Aiw!!!",
}]
export const tokens: { [key: string]: LoginUser } =
    { "404f3b16-eb35-46af-9b3b-2b9e39229fe1": { userName: "gal", password: "www" ,time:222} };
const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
const passwordSchema = z.string().regex(passwordRegex)
const emailSchema = z.string().email().min(15)
const phoneSchema = z.string().min(10).max(10)
const fullNameSchema = z.string().min(3).max(50)


const registerSchema = z.object({
    userName: emailSchema,
    fullName: fullNameSchema,
    phone: phoneSchema,
    password: passwordSchema,
    yearOfBirth: z.number().optional()
})
const loginSchema = z.object({
    userName: z.string().email(),
    password: passwordSchema,
    time:z.number().optional()
})
export type RegisteredUser = z.infer<typeof registerSchema>;
export type LoginUser = z.infer<typeof loginSchema>;



loginRouter.post("/login", (req: Request, res: Response, next) => {
    try {
        loginSchema.parse(req.body)
        const result = loginUser(users, req.body)
        if (result === false) {
            return res.status(401).json({ message: "Unauthorized" })
        } else {
            const token = getToken();
            const existingToken =Object.keys(tokens).find(current=>tokens[current].userName===result.userName)
         if (existingToken) {
            delete tokens[existingToken]
              }
            tokens[token] = result
          
            tokens[token].time=new Date().getTime()
         console.log(tokens);
         
            
            return res.status(200).json({ message: "user loggedIn successfully!", token })
        }
    } catch (error: any) {
        console.log(error?.errors, res.getHeader("x-request-id"))
        return res.status(400).json({ error: "something went wrong" })
    }
})

loginRouter.post("/register", (req: Request, res: Response, next) => {
    try {
        registerSchema.parse(req.body)
        if (ifUserExist(users, req?.body?.userName)) {
            return res.status(409).json({ message: "User already exist" })
        }
        users.push(req.body)
        console.log(users)
        setTimeout(() => {
            return res.status(200).json({ message: "user registered successfully!" })
        }, 1500);
    } catch (error: any) {
        console.log(error?.errors, res.getHeader("x-request-id"))
        return res.status(400).json({ error: "something went wrong" })
    }

})


loginRouter.post("/logout", (req: Request, res: Response, next) => {
    try {
       
        const deletetoken=req.headers.authorization as string
        console.log(deletetoken);
        delete tokens[deletetoken]
        console.log(tokens);
         return res.status(200).json({ message: "user logout" })
       
    } catch (error: any) {
      
        return res.status(400).json({ error: "something went wrong" })
    }

})


export { loginRouter }