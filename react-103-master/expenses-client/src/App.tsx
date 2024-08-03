
import { useEffect, useState } from 'react';
import './App.css'
import {
    createBrowserRouter,
    RouterProvider,
    Link,
    useParams,
    useNavigate,
} from "react-router-dom";
import axios from 'axios';
import { getMovieByIdApi, MovieType } from './service';
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "about",
        element: <About />,
    },
    {
        path: "movies",
        element: <Movies />,
    },
    {
        path: "movie/:movieId",
        element: <Movie />,
    },
]);

function App() {

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App


function Home() {
    return <div>
        <h1>Home</h1>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Link to="/about">About</Link>
            <Link to="/movies">movies</Link>
        </div>
    </div>
}

function About() {
    return <div>
        <h1>About</h1>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Link to="/">Home</Link>
            <Link to="/movies">movies</Link>
        </div>
    </div>
}

function Movies() {

    const moviesIds = ["tt0117571", "tt0120082", "tt0134084"]

    const naviNaviGate = useNavigate()

    return <div>
        <h1>Movies</h1>
        <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "column" }}>
            {moviesIds.map(movieId => {
                return <div>
                    <Link to={`/movie/${movieId}`}>{movieId} </Link>
                </div>
            })}
        </div>

        <button onClick={() => {
            naviNaviGate(`/movie/tt0117571`)
        }}> Go to the best movie ever! </button>
    </div>
}

function Movie() {
    const params = useParams()

    const [movie, setMovie] = useState<MovieType | null>(null)
    const [isMovieLoading, setIsMovieLoading] = useState<boolean>(true)

    useEffect(() => {
        async function getMovieById() {
            try {
                setIsMovieLoading(true)
                if (!params.movieId) return;
                const result: MovieType = await getMovieByIdApi(params.movieId)
                setMovie(result)
            } catch (error) {

            } finally {
                setIsMovieLoading(false)
            }
        }
        getMovieById()
    }, [])

    return <div>
        <h1> Single movie, Movie Name: {isMovieLoading ? <span>Please wait, loading..</span> : <span>{movie?.Title}</span>} </h1>
        <h2> By Adi Safar </h2>
    </div>
}