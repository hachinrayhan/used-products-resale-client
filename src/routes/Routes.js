import { createBrowserRouter } from "react-router-dom";
import DashBoardLayout from "../layouts/DashBoardLayout";
import Main from "../layouts/Main";
import Blog from "../pages/Blog";
import AddAProduct from "../pages/Dashboard/AddAProduct";
import Buyers from "../pages/Dashboard/Buyers";
import MyOrders from "../pages/Dashboard/MyOrders";
import MyProducts from "../pages/Dashboard/MyProducts";
import Sellers from "../pages/Dashboard/Sellers";
import Home from "../pages/Home/Home";
import Login from "../pages/login/Login";
import Signup from "../pages/login/Signup";
import NotFound from "../pages/NotFound";
import PhoneCategories from "../pages/PhoneCategories/PhoneCategories";
import AdminRoute from "./AdminRoute";
import BuyerRoute from "./BuyerRoute";
import PrivateRoute from "./PrivateRoute";
import SellerRoute from "./SellerRoute";


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
                path: '/blog',
                element: <Blog></Blog>
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
                element: <PrivateRoute><PhoneCategories></PhoneCategories></PrivateRoute>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
        children: [
            {
                path: '/dashboard/my-products',
                element: <SellerRoute><MyProducts></MyProducts></SellerRoute>
            },
            {
                path: '/dashboard/add-product',
                element: <SellerRoute><AddAProduct></AddAProduct></SellerRoute>
            },
            {
                path: '/dashboard/my-orders',
                element: <BuyerRoute><MyOrders></MyOrders></BuyerRoute>
            },
            {
                path: '/dashboard/sellers',
                element: <AdminRoute><Sellers></Sellers></AdminRoute>
            },
            {
                path: '/dashboard/buyers',
                element: <AdminRoute><Buyers></Buyers></AdminRoute>
            }
        ]
    },
    {
        path: '*',
        element: <NotFound></NotFound>
    }
]);

