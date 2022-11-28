import React from 'react';
import { Link } from 'react-router-dom';

const ConnectWithUs = () => {
    return (
        <div className='my-12 flex flex-col md:flex-row'>
            <div className="form-control max-w-sm mx-auto">
                <h2 className='text-3xl font-bold text-start label-text'>Connect With Us</h2>
                <input type="text" placeholder="Email Signup for Special Offers" className="input input-bordered w-full max-w-sm" />
                <label className="label">
                    <span className="label-text text-start">By clicking "Subscribe", you agree to receive our newsletter about our website, special offers and promos. You can opt-out at any time. <Link className='text-blue-600'>Privacy Policy</Link></span>
                </label>
            </div>
            <div className='text-start max-w-sm mx-auto'>
                <h2 className='text-3xl font-bold'>Contact</h2>
                <p>+880-172345678</p>
                <p>9am - 8pm</p>
                <p>Everyday</p>
                <Link className='text-blue-600'>Email Us</Link>
            </div>
        </div>
    );
};

export default ConnectWithUs;