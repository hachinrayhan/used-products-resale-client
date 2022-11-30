import React, { useContext } from 'react';
// import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const AddAProduct = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate(); // for navigating after adding doctor successfully

    const imgHostKey = process.env.REACT_APP_imgbb_key;

    const handleAddProduct = data => {
        //photo hosting to imgbb
        const image = data.img[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url);
                    const product = {
                        photo: imgData.data.url,
                        category: data.category.toLowerCase(),
                        productName: data.productName,
                        periodOfUse: data.periodOfUse,
                        condition: data.condition,
                        originalPrice: data.originalPrice,
                        resalePrice: data.resalePrice,
                        details: data.details,
                        location: data.location,
                        sellerName: data.sellerName,
                        sellerEmail: data.sellerEmail,
                        contactNumber: data.contactNumber,
                    }

                    //save product to the database
                    fetch('http://localhost:5000/products', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(data => {
                            toast.success('product added successfully');
                            navigate('/dashboard');
                        })
                }
            })
    };

    return (
        <div className='my-10'>
            <h2 className='text-3xl underline'>Add A Product</h2>
            <form onSubmit={handleSubmit(handleAddProduct)} className='form-control w-full max-w-xl mx-auto shadow-2xl px-8 lg:px-16 py-8 rounded-md'>
                {/* photo */}
                <label className="label">
                    <span className="label-text">Upload product's photo</span>
                </label>
                <input type="file" {...register("img", { required: "Photo is required" })} className="input w-full max-w-xl" />
                {errors.img && <p className='text-red-700'>{errors.img?.message}</p>}

                {/* Category */}
                <label className="label">
                    <span className="label-text">Category</span>
                </label>
                <select {...register('category')} className="select select-bordered w-full max-w-xl">
                    <option>iPhone</option>
                    <option>Samsung</option>
                    <option>Google</option>
                    <option>Others</option>
                </select>

                {/* Product's Name */}
                <label className="label">
                    <span className="label-text">Product's Name</span>
                </label>
                <input type="text" placeholder='Name with model number' {...register("productName", { required: "Product's Name is required" })} className="input input-bordered w-full max-w-xl" />
                {errors.name && <p className='text-red-700'>{errors.name?.message}</p>}

                {/* Period of Use */}
                <label className="label">
                    <span className="label-text">Period of Use [ in weeks(w), months(m) or years(y) ]</span>
                </label>
                <input type="text" placeholder='How many days you used this product?' {...register("periodOfUse", { required: "How many days you used this product?" })} className="input input-bordered w-full max-w-xl" />
                {errors.periodOfUse && <p className='text-red-700'>{errors.periodOfUse?.message}</p>}

                {/* Condition */}
                <label className="label">
                    <span className="label-text">Condition</span>
                </label>
                <select {...register('condition')} className="select select-bordered w-full max-w-xl">
                    <option>Excellent</option>
                    <option>Good</option>
                    <option>Fair</option>
                </select>

                {/* Original Price */}
                <label className="label">
                    <span className="label-text">Original Price($)</span>
                </label>
                <input type="number" placeholder='Purchase price' {...register("originalPrice", { required: "Original Price is required" })} className="input input-bordered w-full max-w-xl" />
                {errors.originalPrice && <p className='text-red-700'>{errors.originalPrice?.message}</p>}

                {/* Resale Price */}
                <label className="label">
                    <span className="label-text">Resale Price</span>
                </label>
                <input type="number" placeholder='Resale price' {...register("resalePrice", { required: "Resale Price is required" })} className="input input-bordered w-full max-w-xl" />
                {errors.resalePrice && <p className='text-red-700'>{errors.resalePrice?.message}</p>}

                {/* Description */}
                <label className="label">
                    <span className="label-text">Description [ use comma( , ) to separate specification ]</span>
                </label>
                <textarea type="text" placeholder='Example: size: 6inch, ram: 6gb, rom: 128gb ...' {...register("details", { required: "Provide your product details" })} className="input input-bordered w-full max-w-xl" />
                {errors.details && <p className='text-red-700'>{errors.details?.message}</p>}

                {/* location */}
                <label className="label">
                    <span className="label-text">Location</span>
                </label>
                <input type="text" placeholder='Location' {...register("location", { required: "Location is required" })} className="input input-bordered w-full max-w-xl" />
                {errors.location && <p className='text-red-700'>{errors.location?.message}</p>}

                {/* Seller Name */}
                <label className="label">
                    <span className="label-text">Seller Name</span>
                </label>
                <input type="text" defaultValue={user?.displayName} readOnly {...register("sellerName")} className="input input-bordered w-full max-w-xl" />

                {/* Seller Email */}
                <label className="label">
                    <span className="label-text">Seller Email</span>
                </label>
                <input type="email" defaultValue={user?.email} readOnly {...register("sellerEmail")} className="input input-bordered w-full max-w-xl" />

                {/* Contact Number */}
                <label className="label">
                    <span className="label-text">Contact Number</span>
                </label>
                <input type="text" placeholder='Seller mobile number' {...register("contactNumber", { required: "Provide the seller's mobile number" })} className="input input-bordered w-full max-w-xl" />
                {errors.contactNumber && <p className='text-red-700'>{errors.contactNumber?.message}</p>}

                {/* Add button */}
                <input type="submit" value="Add" className='btn btn-primary w-full max-w-xl mt-5' />
            </form>
        </div>
    );
};

export default AddAProduct;