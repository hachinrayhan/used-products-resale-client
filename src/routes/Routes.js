import { createBrowserRouter } from "react-router-dom";
import DashBoardLayout from "../layouts/DashBoardLayout";
import Main from "../layouts/Main";
import AddAProduct from "../pages/Dashboard/AddAProduct";
import MyProducts from "../pages/Dashboard/MyProducts";
import Home from "../pages/Home/Home";
import Login from "../pages/login/Login";
import Signup from "../pages/login/Signup";
import PhoneCategories from "../pages/PhoneCategories/PhoneCategories";
import PrivateRoute from "./PrivateRoute";


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
            },
            {
                path: '/category/:name',
                loader: ({ params }) => fetch(`http://localhost:5000/category/${params.name}`),
                element: <PhoneCategories></PhoneCategories>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <MyProducts></MyProducts>
            },
            {
                path: '/dashboard/add-product',
                element: <AddAProduct></AddAProduct>
            }
        ]
    }
]);

