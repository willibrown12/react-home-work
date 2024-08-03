import { useContext, useMemo, useState } from "react"
import { FavoritesContext, HistoryContext, SettingsContext } from "../../context"
import { MovieType } from "../movies/service"
import { BarChart, PieChart } from "@mui/x-charts"
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function getMapping(k: string): string {
    if (k === 'game') return "Games";
    if (k === 'movie') return "Movies";
    if (k === 'series') return "Sdarot";
    return k
}

export default function StatisticsPage() {
    const context = useContext(FavoritesContext)
    const historyContext = useContext(HistoryContext)
    const [filters, setFilters] = useState({ Movies: true, Games: true, Sdarot: true, All: true })
    const [historyTypeFilter, setHistoryTypeFilter] = useState("all")
    const result = useMemo(() => {
        console.log("Long calculation!!!!")
        return context.favorites.reduce((obj: { [key: string]: number }, currentItem: MovieType) => {
            const t = currentItem.Type
            if (obj[t]) {
                obj[t] = obj[t] + 1
            } else {
                obj[t] = 1
            }
            return obj;
        }, {})
    }, [])

    const filteredOriginalData = filterData(historyContext.history)
    const resultAggregationByYear = useMemo(() => {
        return filteredOriginalData.reduce((obj: { [key: string]: number }, currentItem: MovieType) => {
            const y = parseInt(currentItem.Year)
            if (obj[y]) {
                obj[y] = obj[y] + 1
            } else {
                obj[y] = 1
            }
            return obj;
        }, {})
    }, [filteredOriginalData])



    function filterData(data: MovieType[]) {
        if (historyTypeFilter === "all") return data;
        return data.filter(item => item.Type === historyTypeFilter)
    }

    const resultYear = resultAggregationByYear;
    const barChartGroups = Object.keys(resultYear)
    const barChartData = Object.values(resultYear)

    const typesList = historyContext.history.reduce((typesListObj: any, currentMovie) => {
        typesListObj[currentMovie.Type] = true;
        return typesListObj
    }, {})
    console.log(resultYear, "resultYear")

    const adaptedResult = Object.entries(result).map(([k, v], index) => {
        return { id: index, value: v, label: getMapping(k) }
    })

    const adaptedResult2 = filters.Movies ? adaptedResult : adaptedResult.filter(item => item.label !== "Movies")
    const adaptedResult3 = filters.Games ? adaptedResult2 : adaptedResult2.filter(item => item.label !== "Games")
    const adaptedResult4 = filters.Sdarot ? adaptedResult3 : adaptedResult3.filter(item => item.label !== "Sdarot")

    const { state } = useContext(SettingsContext)

    return < div >
        <div>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Filter By Types</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={historyTypeFilter}
                    label="Filter By Types"
                    onChange={(e) => {
                        setHistoryTypeFilter(e.target.value)
                    }}
                >
                    <MenuItem key="all" value={"all"}>All</MenuItem>
                    {Object.keys(typesList).map((currentObj) => {
                        return <MenuItem key={currentObj} value={currentObj}>{getMapping(currentObj)}</MenuItem>
                    })}
                </Select>
            </FormControl>
            <BarChart
                xAxis={[{ scaleType: 'band', data: barChartGroups }]}
                series={[{ data: barChartData }]}
                width={state.chartSize}
                height={300}
            />
            <Button onClick={() => {
                setFilters({ Movies: true, Games: true, Sdarot: true, All: true })
            }}> All  </Button>
            {adaptedResult.map(i => {
                return <Button key={i.label} onClick={() => {
                    setFilters({ ...filters, [i.label]: !filters[i.label] })
                }} >{i.label}</Button>
            })}
        </div>
        <PieChart
            series={[
                {
                    data: adaptedResult4,
                },
            ]}
            width={state.chartSize}
            height={300}
        />

    </div >
}

// function TypesItemList(props: { history: Array<MovieType> }) {

//     const typesList = props.history.reduce((typesListObj: any, currentMovie) => {
//         typesListObj[currentMovie.Type] = true;
//         return typesListObj
//     }, {})

//     return <>
//         <MenuItem key="all" value={"all"}>All</MenuItem>
//         {Object.keys(typesList).map((currentObj) => {
//             return <MenuItem key={currentObj} value={currentObj}>{getMapping(currentObj)}</MenuItem>
//         })}
//     </>
// }