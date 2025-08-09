import {createBrowserRouter} from "react-router-dom";
import Settings from "./pages/Settings";
import App from "./App";


const router = createBrowserRouter([
  {
    path: "/settings",
    element: <Settings/>,
  },
  {
    path: "/",
    element: <App/>,
  },
]);

export default router