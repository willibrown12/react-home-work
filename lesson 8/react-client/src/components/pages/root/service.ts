import axios from "axios"





const BASE_URL = `http://localhost:3600`

export async function Logoutuser(token:string): Promise<{ message: string}> {
    const result = await axios.post(`${BASE_URL}/auth/logout`,
        {},
        { headers: { "content-type": "application/json" ,
            "Authorization": token,
        } })
    return result.data
}