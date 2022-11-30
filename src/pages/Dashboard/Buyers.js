import { useQuery } from '@tanstack/react-query';
import React from 'react';

const Buyers = () => {

    const url = 'https://used-products-resale-server-neon.vercel.app/users/buyers';

    const { isLoading, error, data: buyers } = useQuery({
        queryKey: ['buyers'],
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
            <h2 className='text-3xl underline'>All Buyers</h2>
            <div className="overflow-x-auto my-8">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            buyers?.map((buyer, idx) =>
                                <tr key={buyer._id}>
                                    <th>{idx + 1}</th>
                                    <td>{buyer.name}</td>
                                    <td>{buyer.email}</td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Buyers;