import axios from "axios";
const API_URL = `https://www.omdbapi.com/?apikey=ffa5acbc&plot=full&s=`

export async function getMoviesApi(movieName: string): Promise<Array<MovieType>> {
    const result = await axios.get(API_URL + movieName)
    if (result?.data?.Response === "False") throw new Error("No data")
    if (movieName === "scream") { // IMPORTANT - this simulation we did only for delay the request 
        // also used the isSetState as boolean in the component to prevent race condition bug
        await new Promise(r => setTimeout(r, 5000));
        return result?.data?.Search;
    } else {
        return result?.data?.Search
    }
}

const movie = { "Title": "Scream", "Year": "1996", "imdbID": "tt0117571", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMjA2NjU5MTg5OF5BMl5BanBnXkFtZTgwOTkyMzQxMDE@._V1_SX300.jpg" };
export type MovieType = typeof movie;