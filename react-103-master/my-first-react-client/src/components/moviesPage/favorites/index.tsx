import { MovieType } from "../service";

export function Favorites(props: { movies: Array<MovieType>, del: (m: MovieType) => void }) {
    return <div>
        <h1>Favorites</h1>
        <div style={{ background: "lightgreen" }}>
            {props?.movies?.map(m => {
                return <h2 key={m.imdbID}> {m.Title} <button onClick={() => {
                    props.del(m)
                }} >x</button> </h2>
            })}
        </div>
    </div>
}