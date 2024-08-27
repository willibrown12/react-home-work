

import { Button, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import { useState } from 'react';
import {  Sendtoapi } from './service';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default  function Accountactions() {
    const [action, setaction] =useState('deposit'); 
    const [amount, setamount] =useState<Number>(0); 
    const [accountId, setaccountId] =useState<String>(""); 


    const  sendinfotoapi =async ()=>{
       try {
        const objectform ={
          action:action,
          ammount:amount,
          accountId:accountId
      }
    
        const response = await Sendtoapi(objectform);
        alert(response?.data?.message);
        console.log(response?.data?.message);
        
       } catch (error:any) {
        console.log(error.message);
        
        alert(error?.message);
       } 
       
      };


    const handleChange = (event: SelectChangeEvent) => {
        setaction(event.target.value as string);
      };
  return (
    <Grid container spacing={3}>
      <FormGrid item xs={12} md={6}>
        <FormLabel
         htmlFor="first-name" required>
        accountId
        </FormLabel>
        <OutlinedInput
          id=" accountId"
          name="accountId"
          type="name"
          value={accountId}
          onChange={(e) => setaccountId(e.target.value)}
        />
      </FormGrid>
      <FormGrid item xs={12} md={6}>
  <InputLabel id="demo-simple-select-label">action</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={action}
    label="action"
    onChange={handleChange}
  >
    <MenuItem value={"deposit"}>deposit</MenuItem>
    <MenuItem value={"withdraw"}>withdraw</MenuItem>
  </Select>
</FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="address1" required>
        amount 
        </FormLabel>
        <OutlinedInput
         value={amount}
         onChange={(e) => setamount(+e.target.value)}
          id="amount"
          type="number"
          placeholder="amount "
          autoComplete="shipping address-line1"
          required
        />
      </FormGrid>
     
      <Button style={{margin:"25px"}}
      onClick={sendinfotoapi}>submit</Button>

    </Grid>
    
  );
}


