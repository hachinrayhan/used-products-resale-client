import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
    return (
        <div className='my-12'>
            <h2 className='text-4xl font-bold'>Phone Categories</h2>
            <div className='mt-4 grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center'>
                <Link to={'category/iphone'}>
                    <div className="card bg-base-100 shadow-xl">
                        <figure><img src="https://i.ibb.co/KyNYKgV/apple.jpg" alt="iPhone" /></figure>
                        <h2 className="text-3xl font-bold pb-5">iPhone</h2>
                    </div>
                </Link>
                <Link to={'category/samsung'}>
                    <div className="card bg-base-100 shadow-xl">
                        <figure><img src="https://i.ibb.co/KrXrCJ5/samsung.jpg" alt="Samsung Phone" /></figure>
                        <h2 className="text-3xl font-bold pb-5">Samsung</h2>
                    </div>
                </Link>
                <Link to={'category/google'}>
                    <div className="card bg-base-100 shadow-xl">
                        <figure><img src="https://i.ibb.co/Bn2dSFk/google.jpg" alt="Google Phone" /></figure>
                        <h2 className="text-3xl font-bold pb-5">Google</h2>
                    </div>
                </Link>
                <Link to={'category/others'}>
                    <div className="card bg-base-100 shadow-xl">
                        <figure><img src="https://i.ibb.co/SyZHCw5/others.jpg" alt="Other Phone" /></figure>
                        <h2 className="text-3xl font-bold pb-5">Others</h2>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Categories;