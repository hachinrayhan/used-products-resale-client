import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';


const MyProducts = () => {
    const { user } = useContext(AuthContext);
    const url = `https://used-products-resale-server-neon.vercel.app/products?email=${user?.email}`;

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
            <h2 className='text-3xl underline'>My Products</h2>
            {
                products.length === 0 ? <h2 className='text-3xl'> You didn't add any product yet. Please <Link to={'/dashboard/add-product'} className='text-blue-700'>Add A Product</Link></h2> :
                    <div className="overflow-x-auto my-8">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Purchase Price</th>
                                    <th>Resale Price</th>
                                    <th>Availability</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products?.map((product, idx) =>
                                        <tr key={product._id}>
                                            <th>{idx + 1}</th>
                                            <td>{product.productName}</td>
                                            <td>${product.originalPrice}</td>
                                            <td>${product.resalePrice}</td>
                                            <td>available</td>
                                        </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
            }
        </div>
    );
};

export default MyProducts;