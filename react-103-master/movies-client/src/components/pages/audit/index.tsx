import { useContext } from "react"
import { SettingsContext } from "../../context"



export function AuditPage() {
        return <Auditdataui/>
    }


    function Auditdataui(){
        const { state } = useContext(SettingsContext) 
        if (state.audit.length===0) return <h2> No Data!</h2>
      return  state.audit.map((current)=>{
            return <div>{current}</div>
        })

        
    }
    



