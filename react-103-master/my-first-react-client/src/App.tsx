
import { useState } from 'react';
import './App.css'
import { InputSwitch } from 'primereact/inputswitch';

import { HowDoILookLike } from './components/how-do-i-look-like';
import { JokesList } from './components/jokes';
import { SingleJoke } from './components/jokes/single-joke';
import { WhatIsYourName } from './components/whats-your-name';
import css from "./style.module.css"
import MoviesPage from './components/moviesPage';
export default function App() {
    const [settings, setSettings] = useState<{ darkMode: boolean }>({ darkMode: false })

    const themeStyle = settings.darkMode ? { backgroundColor: "black", color: "white" }
        : { backgroundColor: "white", color: "black" }

    return (
        <>
            <div style={themeStyle}>
                {/* <span id="switch2">{settings.darkMode ? "light" : "dark"} mode</span>
                <InputSwitch aria-labelledby="switch2" checked={settings.darkMode} onChange={(e) => {
                    setSettings({ ...settings, darkMode: !settings.darkMode })
                }} />

                <h1 style={{ color: "red" }} >Hello</h1>
                <h1 className={css.wili}> Joke of the week</h1>
                <SingleJoke description='aa' type='aa' jokeId={111} punchline='sss' />
                <WhatIsYourName />
                <HowDoILookLike />
                <JokesList /> */}
                <MoviesPage />
            </div>
        </>
    )
}





