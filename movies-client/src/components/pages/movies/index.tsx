

import { useEffect, useState } from 'react';
import MoviesList from './moviesList';
import { getMoviesApi, MovieType } from './service';
import lodash from "lodash"
import { CircularProgress, TextField } from '@mui/material';

export default function MoviesPage() {

    const [movies, setMovies] = useState<Array<MovieType>>([])
    const [favoritesMovies, setFavoritesMovies] = useState<Array<MovieType>>([])
    const [inputValue, setInputValue] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        let isSetState = true
        async function searchMovies() {
            try {
                setIsLoading(true)
                const moviesArray = await getMoviesApi(inputValue)
                if (isSetState) {
                    setMovies(moviesArray)
                }

            } catch (error) {
                alert(error)
            } finally {
                setIsLoading(false)
            }
        }
        if (inputValue) {
            searchMovies()
        }
        return () => {
            isSetState = false;
        }
    }, [inputValue])

    const searchHandler = lodash.debounce(function (e) {
        console.log(e.target.value)
        setInputValue(e.target.value)
    }, 500)

    return <div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}>
            <TextField onChange={searchHandler} placeholder="search" id="outlined-basic" label="Outlined" variant="outlined" />
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem", flexWrap: "wrap", gap: "20px" }}>
            {isLoading ? <CircularProgress />
                : <MoviesList movies={movies} doSomething={(m: MovieType): void => {
                    const findMovie = favoritesMovies.find(movie => movie.imdbID === m.imdbID)
                    if (!findMovie) {
                        setFavoritesMovies([...favoritesMovies, m])
                    }
                }} />}
        </div>
    </div >
}



