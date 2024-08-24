import { useEffect, useState } from "react"
import { getTransactionsApi } from "./service"
import { useNavigate } from "react-router-dom"

export function Transactions() {
    const navigate = useNavigate()
    const [transactions, setTransactions] = useState<Array<any>>([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        async function getTransactions() {
            try {
                setIsLoading(true)
                const result = await getTransactionsApi();
                setTransactions(result)
            } catch (error) {
                navigate("/login")
            } finally {
                setIsLoading(false)
            }
        }
        setTimeout(() => {
            getTransactions()
        }, 3000);
    }, [])

    if (isLoading) return <h2>Loading..</h2>
    return <div>

        <h1>Transactions</h1>
        {transactions.map(t => {
            return <h1> {t.id} == {t.amount}  </h1>
        })}
    </div>
}

