import { useEffect, useState } from "react"
import { MovieType } from "../movies/service"
import { useParams } from "react-router-dom"
import { getMovieByIdApi } from "./service"

export default function Movie() {
    const params = useParams()

    const [movie, setMovie] = useState<MovieType | null>(null)
    const [isMovieLoading, setIsMovieLoading] = useState<boolean>(true)

    useEffect(() => {
        async function getMovieById() {
            try {
                setIsMovieLoading(true)
                if (!params.id) return;
                const result: MovieType = await getMovieByIdApi(params.id)
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