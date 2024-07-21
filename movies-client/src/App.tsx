
import './App.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { Home } from './components/pages/home';
import Movies from './components/pages/movies';

import { Root } from './components/pages/root';
import Movie from './components/pages/movie';
import ChartsOverviewDemo from './components/pages/stats';

export const routes = [
    {
        path: "home",
        label: "Home",
        visible: true,
        element: <Home />,
    },
    {
        path: "movies",
        label: "Movies",
        visible: true,
        element: <Movies />,

    },
    {
        path: "favorites",
        label: "Favorites",
        visible: true,
        element: <Movies />,
    },
    {
        path: "statistics",
        label: "Statistics",
        visible: true,
        element: <ChartsOverviewDemo />,
    },
    {
        path: "movie/:id",
        label: "Single movie",
        visible: false,
        element: <Movie />,
    },
]
const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: routes,
    },
]);


function App() {

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App

