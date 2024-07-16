
import {Countrytype,getcountriesApi } from './service';

import { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import lodash from "lodash"
import CountriesList from './countriesList';
export default function Countrylist() {
const [countries, setCountries] = useState<Array<Countrytype>>([])
const [isLoading, setIsLoading] = useState<boolean>(false)
const [inputValue, setInputValue] = useState<string>("")




useEffect(() => {
  let isSetState = true
  async function searchCountry() {
      try {
          setIsLoading(true)
          console.log(inputValue);
          
          const countriesArray = await getcountriesApi(inputValue)
          if (isSetState) {
            setCountries(countriesArray)
          }

      } catch (error) {
          alert(error)
      } finally {
          setIsLoading(false)
      }
  }
  if (inputValue) {
    searchCountry()
  }
  return () => {
      isSetState = false;
  }
}, [inputValue])




const searchHandler = lodash.debounce(function (e) {
  console.log(e.target.value)
  setInputValue(e.target.value)
}, 500)



    

    return  <div style={{display:"flex", flexDirection:"column", justifyContent:"center",gap:"20px"}}> { <InputText onChange={searchHandler} placeholder="search" /> }


<div style={{ display: "flex", justifyContent: "center", marginTop: "2rem", flexWrap: "wrap", gap: "20px" }}>
            {isLoading ? <ProgressSpinner />
                : <CountriesList countries={countries} />}
        </div>
    </div>
}







