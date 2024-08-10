

import { useContext, useEffect, useState } from 'react';
import MoviesList from './moviesList';
import { getMoviesApi, MovieType } from './service';
import lodash from "lodash"
import { Button, CircularProgress, TextField } from '@mui/material';
import { FavoritesContext, HistoryContext } from '../../context';

export default function MoviesPage() {

    const [movies, setMovies] = useState<Array<MovieType>>([])
    const context = useContext(FavoritesContext)
    const historyContext = useContext(HistoryContext)
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
            <Button onClick={() => {
                historyContext.setHistory([...movies, ...historyContext.history])
            }}> Save History </Button>
            <Button onClick={() => {
                historyContext.setHistory([])
            }}> Clear History </Button>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem", flexWrap: "wrap", gap: "20px" }}>
            {isLoading ? <CircularProgress />
                : <MoviesList movies={movies} doSomething={(m: MovieType): void => {
                    const findMovie = context.favorites.find(movie => movie.imdbID === m.imdbID)
                    if (!findMovie) {
                        context.setFavorites([...context.favorites, m])
                        addFavoriteServer(m)
                    }
                }} />}
        </div>
    </div >
}



async function addFavoriteServer(Movie:MovieType) {
    try {
        const result = await fetch(`http://localhost:4500/favorite`, {
            method: "post",
            body: JSON.stringify( Movie ),
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



