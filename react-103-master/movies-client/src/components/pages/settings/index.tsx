import { Box, Slider, Stack, Switch } from "@mui/material";
import { ACTIONS, SettingsContext } from "../../context";
import { useContext, useState } from "react";
 let theme="light"
export default function SettingsPage() {
    const { state, dispatch } = useContext(SettingsContext)
    const [toggle, settoggle] = useState(true)
    const [value, setValue] = useState<number>(state.chartSize);
   
    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number);
        dispatch({ type: ACTIONS.SetChartSize, payload: value})
      };
    return <>
        <div>
            <h1> Settings</h1>
            <h2> Select Local / UTC time:  <Switch checked={state.toggleTime} onChange={() => {
                dispatch({ type: ACTIONS.ToggleTime })
            }} /></h2>
              <h2>dark theme / ligh theme:  <Switch checked={toggle} onChange={() => {
                if (theme==="light") {
                     theme="dark"
                    dispatch({ type: ACTIONS.ChangeTheme, payload:theme }) 
             
                }else{
                    theme="light"
                    dispatch({ type: ACTIONS.ChangeTheme, payload:theme })   
                }
                settoggle(!toggle)
             
            }} /></h2>
    <h2> chart size width:  <Box sx={{ width: 200 }}>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <Slider aria-label="Volume" value={value} onChange={handleChange} 
         valueLabelDisplay="auto" min={100}
         max={1000}/>
         
      </Stack>
     
    </Box>
  </h2>

        </div>
    </>
}