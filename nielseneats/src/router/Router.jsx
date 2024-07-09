import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
        path:"/login",
        element:<Login/>,
    },
    {
        path:"/signup",
        element:<Signup/>,
    }
]);
  
export default router;