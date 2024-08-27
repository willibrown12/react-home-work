import axios from "axios";

export async function Sendtoapihistory(account: string) {
    const url = `http://localhost:3600/account/operation/${account}`;
      const response = await axios.get(url);
      return response;
     }
