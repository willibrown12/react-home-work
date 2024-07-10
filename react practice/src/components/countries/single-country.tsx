
import { useRef, useState } from "react";
type Props = {
    countryName: string,
    countrypicture: string
    key:string
}

export function Singlecountry(props: Props) {
    const [comment, addComment] = useState(false)
    const [Comments, setComments] = useState<Array<string | undefined>>([])
    const inputCommentRef = useRef<HTMLInputElement>(null)
   

    return <div style={{ border: "1px dashed black", width:"350px" }}>
        <h2 >{props.countryName}</h2>
      <img src={props.countrypicture} alt="" style={{width:"300px"}}/>
      {comment ? (
           <div>
           <input ref={inputCommentRef} type="text" />
           <button onClick={() => {
               const copyOfComments = [...Comments, inputCommentRef?.current?.value]
               setComments(copyOfComments)
               console.log(inputCommentRef?.current?.value)
           }} >Save </button>
       </div>
         
        ) : (
            
          <button
            onClick={() => {
                addComment(true);
            }}
          >
           add comment
          </button>
        )}
        <div><CommentsList comments={Comments} /></div>

    </div>
}


function CommentsList(props: { comments: Array<string | undefined> }) {
    return <div>
        <ol>
            {props.comments.map((c, index) => { return <li key={index}> {c} </li> })}
        </ol>
    </div>
}

