import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const PhoneCategories = () => {
    const { loading } = useContext(AuthContext);
    const products = useLoaderData();
    console.log(products);

    if (loading) {
        return <button className="btn btn-warning loading">loading</button>
    }

    return (
        <div className='grid gap-4 grid-cols-1 md:grid-cols-2 z-1'>
            {products.map(product =>
                <div key={product._id} className="card card-side bg-base-100 shadow-xl">
                    <figure><img src={product.photo} alt="smart phone" /></figure>
                    <div className="card-body text-start">
                        <h2 className="card-title">{product.productName}</h2>
                        <p>Period of Use: {product.periodOfUse}</p>
                        <p>Condition: {product.condition}</p>
                        <p>Original Price: ${product.originalPrice}</p>
                        <p>Resale Price: ${product.resalePrice}</p>
                        <p>Specification: {product.details}</p>
                        <p>Location: {product.location}</p>
                        <p>Seller Name: {product.sellerName}</p>
                        <p>Contact: {product.contactNumber}</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Book Now</button>
                        </div>
                    </div>
                </div>)}
        </div>
    );
};

export default PhoneCategories;