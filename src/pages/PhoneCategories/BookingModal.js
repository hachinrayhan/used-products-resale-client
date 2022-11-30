import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useUserType from '../../hooks/useUserType';

const BookingModal = ({ product }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [userType] = useUserType(user?.email);

    const handleBooking = e => {
        e.preventDefault();
        const buyerNumber = e.target.mobile.value;
        const booking = {
            productName: product.productName,
            price: product.resalePrice,
            location: product.location,
            buyerName: user?.displayName,
            buyerEmail: user?.email,
            buyerNumber
        }

        console.log(booking);

        // save booking to the database
        fetch('https://used-products-resale-server-neon.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    //change product status/availability
                    fetch(`https://used-products-resale-server-neon.vercel.app/products/status/${product._id}`, {
                        method: 'PUT',
                        headers: {
                            authorization: `bearer ${localStorage.getItem('token')}`
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            if (data.modifiedCount > 0) {
                                toast.success('Booking Confirmed');
                                navigate('/dashboard/my-orders');
                            }
                        })
                }

            })
    };

    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <div className="modal-action">
                        <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    </div>
                    {
                        userType === 'Buyer' ?
                            <div>
                                <h3 className="font-bold text-lg">Confirm your booking</h3>
                                <form onSubmit={handleBooking} className='form-control w-full max-w-xl mx-auto shadow-2xl px-8 lg:px-16 py-8 rounded-md'>

                                    {/* Product's Name */}
                                    <label className="label">
                                        <span className="label-text">Booking for</span>
                                    </label>
                                    <input type="text" defaultValue={product?.productName} readOnly className="input input-bordered w-full max-w-xl" />


                                    {/* Product Price */}
                                    <label className="label">
                                        <span className="label-text">Price ($)</span>
                                    </label>
                                    <input type="text" defaultValue={product?.resalePrice} readOnly className="input input-bordered w-full max-w-xl" />

                                    {/* location */}
                                    <label className="label">
                                        <span className="label-text">You have to go Seller Location below</span>
                                    </label>
                                    <input type="text" defaultValue={product?.location} readOnly className="input input-bordered w-full max-w-xl" />

                                    {/* Buyer Name */}
                                    <label className="label">
                                        <span className="label-text">Your Name</span>
                                    </label>
                                    <input type="text" defaultValue={user?.displayName} readOnly className="input input-bordered w-full max-w-xl" />

                                    {/* Buyer Email */}
                                    <label className="label">
                                        <span className="label-text">Your Email</span>
                                    </label>
                                    <input type="email" defaultValue={user?.email} readOnly className="input input-bordered w-full max-w-xl" />

                                    {/*Buyer Contact Number */}
                                    <label className="label">
                                        <span className="label-text">Your Contact Number</span>
                                    </label>
                                    <input name='mobile' type="text" placeholder='Buyer Mobile Number' className="input input-bordered w-full max-w-xl" required />

                                    {/* Add button */}
                                    <input type="submit" value="Submit" className='btn btn-primary w-full max-w-xl mt-5' />
                                </form>
                            </div>
                            :
                            <h2 className='text-3xl font-bold text-warning'>Please Login with your Buyer Account to Book a product</h2>
                    }
                </div>
            </div>
        </div>
    );
};

export default BookingModal;