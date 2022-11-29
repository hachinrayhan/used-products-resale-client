import { createBrowserRouter } from "react-router-dom";
import DashBoardLayout from "../layouts/DashBoardLayout";
import Main from "../layouts/Main";
import AddAProduct from "../pages/Dashboard/AddAProduct";
import MyProducts from "../pages/Dashboard/MyProducts";
import Home from "../pages/Home/Home";
import Login from "../pages/login/Login";
import Signup from "../pages/login/Signup";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashBoardLayout></DashBoardLayout>,
        children: [
            {
                path: '/dashboard/add-product',
                element: <AddAProduct></AddAProduct>
            },
            {
                path: '/dashboard/my-products',
                element: <MyProducts></MyProducts>
            }
        ]
    }
]);

