import countries from "../../countries.json"
import { Singlecountry } from "./single-country"

type countrietype = typeof countries[0]

export function Countrylist() {
    return <div style={{display:"flex", flexWrap:"wrap"}}>
        {countries.map((country: countrietype) => {
            return <Singlecountry  countryName={country.name.common}
            countrypicture={country.flags.svg}
            key={country.name.official}
            />
        })}
    </div>
}



