import {createBrowserRouter} from "react-router-dom";
import Home from './App'
import Custom from "./Pages/Custom";
import Text from "./Pages/Text";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/custom",
    element: <Custom/>,
  },
  {
    path: "/text",
    element: <Text/>,
  },
]);

export default router