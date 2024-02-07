import {createBrowserRouter} from "react-router-dom";
import Home from './App'
import Custom from "./Pages/Custom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/custom",
    element: <Custom/>,
  },
]);

export default router