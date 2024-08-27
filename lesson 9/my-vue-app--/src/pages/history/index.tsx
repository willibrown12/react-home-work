
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { Sendtoapihistory } from './service';









export default function BasicTable() {
    type history ={
        time:string,
        action:string,
        money:number,
        ammount:number
        }
       
     
    
    
    
    const [account, setaccount] =useState<any>('');  
    const [dataa, setdata] =useState<Array<history>>([])
    const  sendinfotoapi =async ()=>{
      
        
        try {
     
         const response = await Sendtoapihistory(account);
        
         
         setdata(response.data)
 

       
         
        } catch (error:any) {
         console.log(error.message);
         
         alert(error?.message);
        } 
        
       };
 
      


       function createData(
        action: string,
        ammount:number,
        money: number,
        time: string,
      ) {
        return { action, ammount, money, time};
      }
      
     

    /*   const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
      ];
       */
      const rows:any = []

      dataa?.map((current) => {
       
        rows.push(createData(
        current.action,
        current.ammount,
        current.money,
        current.time
      ))
                  });
      


      
    
  
  return (

<div>
    
    <div style={{marginBottom:"20px" ,display:"flex", justifyContent:"center",alignItems:"center", gap:"20px"}}>
<TextField id="outlined-basic" label="account id" variant="outlined"  value={account} onChange={(e)=>setaccount(e.target.value)} />
<Button variant="outlined" 
onClick={sendinfotoapi}>sumbit</Button>
</div>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>account</TableCell>
            <TableCell align="right">action</TableCell>
            <TableCell align="right">amount</TableCell>
            <TableCell align="right">money</TableCell>
            <TableCell align="right">time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
     
            <TableRow
              key={account+ Math.floor(Math.random() * 99999)}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {account}
              </TableCell>
              <TableCell align="right">{row?.action}</TableCell>
              <TableCell align="right">{row?.ammount}</TableCell>
              <TableCell align="right">{row?.money}</TableCell>
              <TableCell align="right">{row?.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}