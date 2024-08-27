
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ResponsiveAppBar from './pages/root/root';

import Accountactions from './pages/Deposit/deposit';
import BasicTable from './pages/history';



const router = createBrowserRouter([
  {
    path: "/",
    element: <ResponsiveAppBar/>,
    children: [
      {
        path: "Actions",
        element: <Accountactions/>
      },
      {
        path: "history",
        element: <BasicTable/>
      },
    ],
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
