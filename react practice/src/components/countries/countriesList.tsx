import { Singlecountry } from "./single-country"
import { Countrytype } from "./service"

export default function CountriesList(props: { countries: Array<Countrytype>}) {
    if (!Array.isArray(props.countries)) return <h2> No Data!</h2>
    return props.countries.map((m) => {
        return <Singlecountry {...m}key={m.name.official} {...m} />
    })
}

