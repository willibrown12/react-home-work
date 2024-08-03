import { useEffect, useState } from "react"

export function Actors() {
    const [counter, setCounter] = useState(0)
    useEffect(() => {

        async function getActors() {
            console.log("Get actors...")
        }
        getActors()

        return () => {
            console.log("Cleanup actors")
        }

    }, [counter])

    return <h1 onClick={() => {
        setCounter(counter + 1)
    }}> Actors</h1>
}