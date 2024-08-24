import axios from "axios"
import { FullUser } from "../register/service"


export type LoginUser = Pick<FullUser, "userName" | "password">
// export type LoginUser = Omit<FullUser, "yearOfBirth">


const BASE_URL = `http://localhost:3600`

export async function loginApi(user: LoginUser): Promise<{ message: string, token: string }> {
    const result = await axios.post(`${BASE_URL}/auth/login`,
        user,
        { headers: { "content-type": "application/json" } })
    return result.data
}