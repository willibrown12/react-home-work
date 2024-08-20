
import './App.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { Home } from './components/pages/home';
import { Root } from './components/pages/root';
import RegistrationForm from './components/pages/register';
import Login from './components/pages/login';




export const routes = [
    {
        path: "home",
        label: "Home",
        visible: true,
        element: <Home />,
    },
    {
        path: "register",
        label: "Register",
        visible: false,
        element: <RegistrationForm />,
    },
    {
        path: "login",
        label: "Login",
        visible: false,
        element: <Login />,
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
            {/* <ContextWrapper> */}
            <RouterProvider router={router} />
            {/* </ContextWrapper> */}
        </>
    )
}

export default App





// const data = [{ movieName: "scream", numberOfLikes: 50 }, { movieName: "scream", numberOfLikes: 50 }]

// type MoviesObjType = {
//     [key: string]: number
// }
// const result = data.reduce((objMovies: MoviesObjType, currentMovie) => {
//     if (!objMovies[currentMovie.movieName]) {
//         objMovies[currentMovie.movieName] = currentMovie.numberOfLikes
//     }
//     return objMovies
// }, {} as MoviesObjType)


// const dataReady = { "scream": 50, "scream2": 63 }
