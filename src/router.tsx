import { createBrowserRouter } from "react-router-dom";
import Home from './App'
import Test from './Pages/Test'


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/test",
        element: <Test />,
    },
]);

export default router