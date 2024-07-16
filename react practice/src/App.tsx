import Countrylist  from './components/countries';
import { Menubar } from 'primereact/Menubar';
import MoviesPage from './components/moviesPage';
import './App.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
 
    {
        path: "Countries",
        element: <Countries />,
    },
    {
        path: "movies",
        element: <Moviespage />,
    },
]);
const items = [
    {
        label: 'movies page',
        icon: 'pi pi-box', 
         url: '/movies'
        
    }, {
        label: 'country page',
        icon: 'pi pi-box', 
         url: '/Countries'
    },]

function App() {
    

    return (
        <>
        <Menubar model={items}/>
            <RouterProvider router={router} />
        </>
    )
}

export default App


function Moviespage() {
   
    return  <>
<div><MoviesPage/></div>
  </>
}

function Countries() {
    return  <>
<div><Countrylist/></div>
  </>
}
function Home() {
    return  <>
<div><h1>navigate from here</h1></div>
  </>
}