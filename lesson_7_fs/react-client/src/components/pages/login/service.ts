import axios from "axios"

export type login = {
    userName: string,
    password: string,

}
const BASE_URL = `http://localhost:3500`

export async function registerlogin(user: login): Promise<{ message: string }> {
    const result = await axios.post(`${BASE_URL}/auth/login`,
        user,
        { headers: { "content-type": "application/json" } })
    return result.data
}