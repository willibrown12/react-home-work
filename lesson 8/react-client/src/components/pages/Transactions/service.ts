import axios from "axios"

export type FullUser = {
    userName: string,
    password: string,
    phone: string,
    fullName: string,
    yearOfBirth?: number
}
const BASE_URL = `http://localhost:3600`

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: localStorage.getItem("token") }
})

export async function getTransactionsApi(): Promise<Array<{ id: string, amount: number }>> {
    const result = await axiosInstance.get(`/account/transactions`)
    return result.data
}