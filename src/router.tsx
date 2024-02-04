import { createBrowserRouter } from "react-router-dom";
import Home from './App'
import Test from './Pages/Test'
import Custom from "./Pages/Custom";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/test",
        element: <Test />,
    },
  {
    path: "/custom",
    element: <Custom />,
  },
]);

export default router