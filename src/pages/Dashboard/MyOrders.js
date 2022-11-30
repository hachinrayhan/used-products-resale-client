import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const url = `http://localhost:5000/bookings?email=${user?.email}`;

    const { isLoading, error, data: orders } = useQuery({
        queryKey: ['bookings'],
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
                orders.length === 0 ? <h2 className='text-3xl'> You didn't book any product yet. Please Book A Product first</h2> :
                    <div className="overflow-x-auto my-8">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Location</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders?.map((order, idx) =>
                                        <tr key={order._id}>
                                            <th>{idx + 1}</th>
                                            <td>{order.productName}</td>
                                            <td>${order.price}</td>
                                            <td>{order.location}</td>
                                        </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
            }
        </div>
    );
};

export default MyOrders;