

import { useEffect, useState } from "react"
import MoviesList from "../movies/moviesList"
import { MovieType } from "../movies/service"
import { GetMovieServer } from "./service"
import { CircularProgress } from "@mui/material"


export function ServerPage() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [movies, setMovies] = useState<Array<MovieType>>([])
    useEffect(() => {

        async function fetchtopage() {
            try {
                setIsLoading(true)
                const moviesArray:any = await GetMovieServer()
               setMovies(moviesArray)

            } catch (error) {
                alert(error)
            } finally {
                setIsLoading(false)
            }

        }
        fetchtopage()
           
    },[])
  
   return <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem", flexWrap: "wrap", gap: "20px" }}>
            {isLoading ? <CircularProgress />
                : <MoviesList movies={movies} doSomething={(): void => {
                }} />}
        </div>
}







