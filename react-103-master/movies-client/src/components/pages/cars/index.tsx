import { Button } from "@mui/material";
import { useState } from "react";

export function CarsPage() {

    const [carType, setCarType] = useState("")

    async function postNewCar() {
        try {
            const result = await fetch(`http://localhost:4500/car`, {
                method: "post",
                body: JSON.stringify({ lp: Math.ceil(Math.random() * 999999), type: carType, color: "red" }),
                headers: { "content-type": "application/json" }
            })
            const r = await result.text()
            console.log(r)
            alert("Success!!")
            return r;
        } catch (error) {
            console.log(error)
        }

    }

    return <div>
        <h1>Cars</h1>
        <input onChange={(e) => { setCarType(e.target.value) }} />
        <Button onClick={postNewCar}> Create Car </Button>
    </div>
}