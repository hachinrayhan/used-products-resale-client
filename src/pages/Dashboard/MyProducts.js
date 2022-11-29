import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';


const MyProducts = () => {
    const { user } = useContext(AuthContext);
    const url = `http://localhost:5000/products?email=${user?.email}`;

    const { isLoading, error, refetch, data: products } = useQuery({
        queryKey: ['products'],
        queryFn: () =>
            fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('token')}`
                }
            }).then(res => res.json())
    })

    if (isLoading) return <button className="btn btn-warning loading">loading</button>
    if (error) return 'An error has occurred: ' + error.message

    return (
        <div>
            <h1>my product coming soon</h1>
            {products.length}
        </div>
    );
};

export default MyProducts;