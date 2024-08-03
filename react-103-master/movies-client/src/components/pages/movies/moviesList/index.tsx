import MovieCard from "../movieCard"
import { MovieType } from "../service"

export default function MoviesList(props: { movies: Array<MovieType>, doSomething?: (p: MovieType) => void }) {
    if (!Array.isArray(props.movies)) return <h2> No Data!</h2>
    return props.movies.map((m) => {
        return <MovieCard key={m.Title + m.Year} {...m} doSomething={props.doSomething} />
    })
}

