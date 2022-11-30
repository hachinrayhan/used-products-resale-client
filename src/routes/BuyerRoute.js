import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import useUserType from '../hooks/useUserType';


const BuyerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [userType, isUserTypeLoading] = useUserType(user?.email);
    const location = useLocation();

    if (loading || isUserTypeLoading) {
        return <progress className="progress progress-warning w-56"></progress>
    }

    if (userType === 'Buyer') {
        return children;
    }
    return <Navigate to={'/login'} state={{ from: location }} replace />
};

export default BuyerRoute;