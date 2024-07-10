
import countries from "../../countries.json"
import { Singlecountry } from "./single-country"
import { useEffect, useState } from "react";

type countrietype = typeof countries[0]

export function Countrylist() {
    const [filter,setFilter]=useState("")
    const [filterpop,setFilter2]=useState(false)
    const [CountriesFromApi, setCountryFromApi] = useState<countrietype[]>([]);


    useEffect(() => {
        async function getCountriesFromApi() {
            const result = await fetch("https://restcountries.com/v3.1/all ")
            const CountriesArray = await result.json()
            setCountryFromApi(CountriesArray)
        }
        getCountriesFromApi()
    }, [])

 
   const countriesfilter = filter
    ? CountriesFromApi.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      )
    : CountriesFromApi; 

    const countriesfilter2 = filterpop
    ? countriesfilter.filter((country) =>
        country.population>10000000
      )
    : countriesfilter; 


    return  <div style={{display:"flex", flexDirection:"column", justifyContent:"center",gap:"20px"}}> {  <input
        type="text"
        placeholder="search for country"
        onChange={(e) => {
          setFilter(e?.target?.value?.toLowerCase());
        }}
      /> }
    <button onClick={()=>{
            setFilter2(!filterpop)
            
           


         }}>
           filter pop higher 10m
          </button>
    <div style={{display:"flex", flexWrap:"wrap", gap:"50px"}}>
        
        {countriesfilter2.map((country: countrietype) => {
            return <Singlecountry  countryName={country.name.common}
            countrypicture={country.flags.svg}
            key={country.name.official}
            />
        })}
    </div>
    </div>
}


