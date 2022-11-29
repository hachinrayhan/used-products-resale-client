import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import useUserType from '../hooks/useUserType';


const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [userType, isUserTypeLoading] = useUserType(user?.email);
    const location = useLocation();

    console.log(userType);

    if (loading || isUserTypeLoading) {
        return <progress className="progress progress-warning w-56"></progress>
    }

    if (userType === 'Admin') {
        return children;
    }
    return <Navigate to={'/login'} state={{ from: location }} replace />
};

export default AdminRoute;