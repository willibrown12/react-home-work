import { useContext } from "react"
import { FavoritesContext } from "../../context"
import MoviesList from "../movies/moviesList"
import { MovieType } from "../movies/service"


export default function FavoritesPage() {
    const context = useContext(FavoritesContext)
    return <div>
        <h1> Favorites </h1>
        <MoviesList movies={context.favorites} doSomething={(currentMovie: MovieType) => {
            const filteredMoviesWithoutRemovedMovie = context.favorites.filter(current => current.imdbID !== currentMovie.imdbID)
            context.setFavorites([...filteredMoviesWithoutRemovedMovie])
        }} />

    </div>
}