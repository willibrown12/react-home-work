import axios from "axios";

export async function Sendtoapi(objectform: { action: string; ammount: Number; accountId: String; }) {
   
      const response = await axios.post('http://localhost:3600/account/operation',objectform,{headers: {
        "Content-Type": "application/json",
    }
      });
      return response;
     }
