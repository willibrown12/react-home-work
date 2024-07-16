import { useState } from "react";
import { Countrytype } from "./service"
type Props = Countrytype

export function Singlecountry(props: Props) {
    const [inputValue, setInputValue] = useState("");
    const [post, setPost] = useState("");
    const [comment, addComment] = useState(false)
    
   

    return <div style={{ border: "1px dashed black", width:"350px" }}>
        <h2 >{props.name.common}</h2>
      <img src={props.flags.svg} alt="" style={{width:"300px"}}/>
      {comment ? (
        <div>
             <input
        value={inputValue}
        type="text"
        id="input"
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
         <button onClick={()=>{
            setPost(inputValue)
            
           


         }}>
           post
          </button>
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
        <div>{post}</div>

    </div>
}




