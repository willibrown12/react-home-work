
type Props = {
    countryName: string,
    countrypicture: string
    key:string
}

export function Singlecountry(props: Props) {
  
    return <div style={{ border: "1px dashed black", width:"350px" }}>
        <h2 >{props.countryName}</h2>
      <img src={props.countrypicture} alt="" style={{width:"300px"}}/>

    </div>
}
