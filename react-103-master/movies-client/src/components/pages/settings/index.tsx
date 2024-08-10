import { Switch } from "@mui/material";
import { ACTIONS, SettingsContext } from "../../context";
import { useContext } from "react";

export default function SettingsPage() {
    const { state, dispatch } = useContext(SettingsContext)
    return <>
        <div>
            <h1> Settings</h1>
            <h2> Select Local / UTC time:  <Switch checked={state.toggleTime} onChange={() => {
                dispatch({ type: ACTIONS.ToggleTime })
            }} /></h2>
        </div>
    </>
}