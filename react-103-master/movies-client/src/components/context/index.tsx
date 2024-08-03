
import { createContext, useState, useReducer, Dispatch } from 'react';
import { MovieType } from '../pages/movies/service';
type FavoritesType = {
    favorites: Array<MovieType>,
    setFavorites: (arr: Array<MovieType>) => void
}
type SettingStateType = {
    toggleTime: boolean,
    theme: string,
    chartSize: number
    audit: Array<string>
}
type SettingContextType = {
    state: SettingStateType,
    dispatch: Dispatch<{ type: string; payload?: any; }>
}

type HistoryType = {
    history: Array<MovieType>,
    setHistory: (arr: Array<MovieType>) => void
}
export const FavoritesContext = createContext<FavoritesType>({} as FavoritesType)
export const SettingsContext = createContext<SettingContextType>({} as SettingContextType)
export const HistoryContext = createContext<HistoryType>({} as HistoryType)

const initialSettingsState: SettingStateType = {
    toggleTime: true,
    theme: "Light",
    chartSize: 500,
    audit:[]
}
export const ACTIONS = {
    ToggleTime: "ToggleTime",
    ChangeTheme: "ChangeTheme",
    SetChartSize: "SetChartSize",
     SetAudit: "AddAudit"
}

function reducer(state: SettingStateType, action: { type: string, payload: any }): SettingStateType {


    switch (action.type) {
        case ACTIONS.ToggleTime: {
            localStorage.setItem("time", (!state.toggleTime).toString())
            return { ...state, toggleTime: !state.toggleTime }
        }
        case ACTIONS.ChangeTheme: {
         
            return  {...state, theme:action.payload}
        }
        case ACTIONS.SetChartSize: {
            return  {...state, chartSize:action.payload}
        }
        case ACTIONS.SetAudit: {
            return {...state,audit: [...state.audit, action.payload]
            };
        }
        default: {
            return state;
        }
    }
}

export function ContextWrapper({ children }: { children: any }) {
    let favoritesInitialData = []
    let timeInitialData = false;
    try {
        favoritesInitialData = JSON.parse(localStorage.getItem("favorites")) || []
        let value = localStorage.getItem("time")
        if (value === 'false') {
            timeInitialData = false;
        } else {
            timeInitialData = true
        }
    } catch (error) {

    }
    const [favorites, setFavorites] = useState(favoritesInitialData as Array<MovieType>)

    const [history, setHistory] = useState<any>([])

    const [state, dispatch] = useReducer(reducer, initialSettingsState)
    console.log("main state", state)
    function setFavoritesWrapper(favorites: Array<MovieType>) {
        setFavorites(favorites)
        localStorage.setItem("favorites", JSON.stringify(favorites))
    }


    return <>
        <HistoryContext.Provider value={{ history, setHistory }} >
            <SettingsContext.Provider value={{ state, dispatch }}>
                <FavoritesContext.Provider value={{ favorites, setFavorites: setFavoritesWrapper }}>
                    {children}
                </FavoritesContext.Provider>
            </SettingsContext.Provider>
        </HistoryContext.Provider>
    </>
}

// [state,seState] = useState(initState)
// [state,dispatch] = useReducer(reducer, initState)