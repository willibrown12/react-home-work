import axios from "axios"

export type FullUser = {
    userName: string,
    password: string,
    phone: string,
    fullName: string,
    yearOfBirth?: number
}
const BASE_URL = `http://localhost:3600`

export async function registerApi(user: FullUser): Promise<{ message: string }> {
    const result = await axios.post(`${BASE_URL}/auth/register`,
        user,
        { headers: { "content-type": "application/json" } })
    return result.data
}