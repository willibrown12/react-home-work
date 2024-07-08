import { useState } from "react";

type Props = {
    countryName: string,
    countrypicture: string
    key:string
}

export function Singlecountry(props: Props) {
    const [inputValue, setInputValue] = useState("");
    const [post, setPost] = useState("");
    const [comment, addComment] = useState(false)
    
   

    return <div style={{ border: "1px dashed black", width:"350px" }}>
        <h2 >{props.countryName}</h2>
      <img src={props.countrypicture} alt="" style={{width:"300px"}}/>
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




