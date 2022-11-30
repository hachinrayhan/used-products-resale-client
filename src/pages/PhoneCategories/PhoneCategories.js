import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import BookingModal from './BookingModal';

const PhoneCategories = () => {
    const [product, setProduct] = useState();
    const { loading } = useContext(AuthContext);
    const products = useLoaderData();

    if (loading) {
        return <button className="btn btn-warning loading">loading</button>
    }

    return (
        <div>
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
                                <label onClick={() => setProduct(product)} htmlFor="booking-modal" className={`btn btn-primary ${product.status === 'booked' && 'btn-disabled'}`}>{product.status === 'booked' ? 'Booked' : 'Book Now'}</label>
                            </div>
                        </div>
                    </div>)}
            </div>
            <BookingModal product={product}></BookingModal>
        </div>
    );
};

export default PhoneCategories;