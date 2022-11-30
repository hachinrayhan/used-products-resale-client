import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import useUserType from '../hooks/useUserType';
import Navbar from '../pages/Shared/Navbar';



const DashBoardLayout = () => {
    const { user } = useContext(AuthContext);
    const [userType] = useUserType(user?.email);

    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet />
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                        {/* <!-- Sidebar content here --> */}
                        {
                            userType === 'Admin' && <>
                                <li><Link to={'/dashboard/sellers'}>All Sellers</Link></li>
                                <li><Link to={'/dashboard/buyers'}>All Buyers</Link></li>
                            </>
                        }
                        {
                            userType === 'Seller' && <>
                                <li><Link to={'/dashboard/my-products'}>My Products</Link></li>
                                <li><Link to={'/dashboard/add-product'}>Add A Product</Link></li>
                                <li><Link to={'/dashboard/my-buyers'}>My Buyers</Link></li>
                            </>
                        }
                        {
                            userType === 'Buyer' && <>
                                <li><Link to={'/dashboard/my-orders'}>My Orders</Link></li>
                            </>
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashBoardLayout;