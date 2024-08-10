import { useContext } from "react"
import { SettingsContext } from "../../context"

export function Home() {
    const { state } = useContext(SettingsContext)
    return <div>
        <h1>Home</h1>
        {state.toggleTime ? new Date().toLocaleString() : new Date().toISOString()}
    </div>
}