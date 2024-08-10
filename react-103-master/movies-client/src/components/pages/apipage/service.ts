import axios from "axios";
const API_URL = `http://localhost:4500/favorite`

export async function GetMovieServer(): Promise<MovieType> {
    const result = await axios.get(API_URL)
    if (result?.data?.Response === "False") throw new Error("No data")
    return result?.data;
}

const movie = { "Title": "Scream", "Year": "1996", "imdbID": "tt0117571", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMjA2NjU5MTg5OF5BMl5BanBnXkFtZTgwOTkyMzQxMDE@._V1_SX300.jpg" };
export type MovieType = typeof movie;