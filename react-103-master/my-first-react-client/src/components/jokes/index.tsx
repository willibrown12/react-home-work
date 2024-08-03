import jokesData from "../../jokes.json";
import { SingleJoke } from "./single-joke";
import css from "./jokes.module.css";
import { useEffect, useState } from "react";

type SingleJokeType = (typeof jokesData)[0];

export function JokesList() {
    const [filter, setFilter] = useState("");
    const [onlyLongPunchline, setOnlyLongPunchline] = useState(false);
    const [jokesFromApi, setJokesFromApi] = useState<SingleJokeType[]>([]);
    const [page, setPage] = useState(0)

    useEffect(() => {
        async function getJokesFromApi() {
            const result = await fetch("https://official-joke-api.appspot.com/jokes/ten")
            const jokesArray = await result.json()
            setJokesFromApi([...jokesFromApi, ...jokesArray])
        }
        getJokesFromApi()
    }, [page])

    const jokesAfterFilter1 = filter
        ? jokesFromApi.filter((joke) =>
            joke.setup.toLowerCase().includes(filter.toLowerCase())
        )
        : jokesFromApi;

    const jokesAfterFilter2 = onlyLongPunchline
        ? jokesAfterFilter1.filter((joke) => joke.punchline.length > 10)
        : jokesAfterFilter1;

    return (
        <div>
            <div>
                <button
                    style={{ backgroundColor: onlyLongPunchline ? "green" : "" }}
                    onClick={() => {
                        setOnlyLongPunchline(!onlyLongPunchline);
                    }}
                >
                    Only Long Punchline
                </button>
                <button
                    onClick={() => {
                        setPage(page + 1);
                    }}
                >
                    Fetch more
                </button>
                <input
                    type="text"
                    placeholder="search for joke"
                    onChange={(e) => {
                        setFilter(e?.target?.value?.toLowerCase());
                    }}
                />
                <h3> Result: {jokesAfterFilter2.length} </h3>
            </div>
            {jokesAfterFilter2.map((singleJoke: SingleJokeType) => {
                return (
                    <SingleJoke
                        key={singleJoke.id}
                        punchline={singleJoke.punchline}
                        jokeId={singleJoke.id}
                        description={singleJoke.setup}
                        type={singleJoke.type}
                    />
                );
            })}
        </div>
    );
}

{
    /* <CountryCard ...JokesList key={name÷÷} /> */
}
