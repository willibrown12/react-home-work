

import { useContext, useEffect, useState } from 'react';
import MoviesList from './moviesList';
import { getMoviesApi, MovieType } from './service';
import lodash from "lodash"
import { Button, CircularProgress, TextField } from '@mui/material';
import { ACTIONS, FavoritesContext, HistoryContext, SettingsContext } from '../../context';

export default function MoviesPage() {
    const {  dispatch  } = useContext(SettingsContext)
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
        {e.target.value===""}
        dispatch({ type: ACTIONS.SetAudit, payload: e.target.value==="" ?"claered input":"User searched for: "+ e.target.value +  new Date().toLocaleString()})
    }, 500)

    return <div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}>
            <TextField onChange={searchHandler} placeholder="search" id="outlined-basic" label="Outlined" variant="outlined" />
            <Button onClick={() => {
                historyContext.setHistory([...movies, ...historyContext.history])
                dispatch({ type: ACTIONS.SetAudit, payload:"User Saved to history "+movies.length +" movies "+  new Date().toLocaleString()})
            }}> Save History </Button>
            <Button onClick={() => {
                dispatch({ type: ACTIONS.SetAudit, payload:"user cleared history"})
                historyContext.setHistory([])
            }}> Clear History </Button>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem", flexWrap: "wrap", gap: "20px" }}>
            {isLoading ? <CircularProgress />
                : <MoviesList movies={movies} doSomething={(m: MovieType): void => {
                    const findMovie = context.favorites.find(movie => movie.imdbID === m.imdbID)
                    if (!findMovie) {
                        context.setFavorites([...context.favorites, m])
                        dispatch({ type: ACTIONS.SetAudit, payload:"User Saved to favorie "+ m.Title +  new Date().toLocaleString()})
                    }
                  
                }} />}
        </div>
    </div >
}



