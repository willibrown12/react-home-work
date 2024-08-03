import { useRef, useState } from "react";

type Props = {
    jokeId: number;
    punchline: string;
    description: string;
    type: string;
};

export function SingleJoke(props: Props) {
    const [youLikeThis, setYouLikeThis] = useState(false);
    const [showPunchline, setShowPunchline] = useState(false);
    const [jokeComments, setJokeComments] = useState<Array<string | undefined>>([])
    const inputCommentRef = useRef<HTMLInputElement>(null)

    return (
        <div
            style={{
                border: "1px dashed black",
                margin: "20px",
                background: "lightgreen",
            }}
        >
            <h2>{props.jokeId}</h2>
            <h3>😂</h3>
            <h2 style={{ background: "green" }}>{props.description}</h2>
            <h3>
                {showPunchline ? (
                    props.punchline
                ) : (
                    <button
                        onClick={() => {
                            setShowPunchline(true);
                        }}
                    >
                        Show Punchline
                    </button>
                )}
            </h3>
            <h6>{props.type}</h6>
            <div>
                <button
                    onClick={() => {
                        setYouLikeThis(!youLikeThis);
                    }}
                >
                    👍 {youLikeThis ? "You Like This" : null}
                </button>
            </div>
            <div>
                <input ref={inputCommentRef} type="text" />
                <button onClick={() => {
                    const copyOfComments = [...jokeComments, inputCommentRef?.current?.value]
                    setJokeComments(copyOfComments)
                    console.log(inputCommentRef?.current?.value)
                }} >Save </button>
            </div>
            <CommentsList comments={jokeComments} />
        </div>
    );
}

function CommentsList(props: { comments: Array<string | undefined> }) {
    return <div>
        <ol>
            {props.comments.map((c, index) => { return <li key={index}> {c} </li> })}
        </ol>
    </div>
}
