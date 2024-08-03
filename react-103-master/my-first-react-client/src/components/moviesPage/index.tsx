

import React, { useEffect, useState } from 'react';
import { MegaMenu } from 'primereact/megamenu';
import { InputText } from 'primereact/inputtext';
import MoviesList from './moviesList';
import { getMoviesApi, MovieType } from './service';
import { ProgressSpinner } from 'primereact/progressspinner';
import lodash from "lodash"
import { Actors } from './actorsPage';
import { Button } from 'primereact/button';
import { Favorites } from './favorites';

export default function MoviesPage() {

    const [movies, setMovies] = useState<Array<MovieType>>([])
    const [favoritesMovies, setFavoritesMovies] = useState<Array<MovieType>>([])
    const [inputValue, setInputValue] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showActors, setShowActors] = useState<boolean>(true)

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

    const headerItems = [
        {
            label: 'movies page',
            icon: 'pi pi-box',
            items: [
                {
                    label: 'search',
                    icon: 'pi pi-box',
                },
                {
                    label: 'latest',
                    icon: 'pi pi-box',
                }
            ]
        }]

    return <div>
        <MegaMenu model={headerItems} orientation="horizontal" breakpoint="960px" className="p-3 surface-0 shadow-2" style={{ borderRadius: '3rem' }} />
        <div> <Button onClick={() => {
            setShowActors(!showActors)
        }}> Show/Hide Actors </Button> </div>
        <div> {showActors ? <Actors /> : null}</div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}>
            <InputText onChange={searchHandler} placeholder="search" />
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem", flexWrap: "wrap", gap: "20px" }}>
            {isLoading ? <ProgressSpinner />
                : <MoviesList movies={movies} doSomething={(m: MovieType): void => {
                    const findMovie = favoritesMovies.find(movie => movie.imdbID === m.imdbID)
                    if (!findMovie) {
                        setFavoritesMovies([...favoritesMovies, m])
                    }


                }} />}
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem", flexWrap: "wrap", gap: "20px" }}>
            <Favorites del={(movieToDelete: MovieType) => {
                const moviesAfterDelete = favoritesMovies.filter(m => m.imdbID !== movieToDelete.imdbID)
                setFavoritesMovies(moviesAfterDelete)
            }} movies={favoritesMovies} />
        </div>
    </div >
}



