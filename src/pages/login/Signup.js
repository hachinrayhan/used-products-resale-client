import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';

const Signup = () => {
    const { createUser, createUserWithGoogle, updateUser, loading, setLoading } = useContext(AuthContext);
    const [error, setError] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [userEmail, setUserEmail] = useState('');
    const [token] = useToken(userEmail);
    const navigate = useNavigate();

    if (token) {
        navigate('/');
    }

    if (loading) {
        return <progress className="progress progress-warning w-56"></progress>
    }

    const handleSignup = data => {
        setError('');
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                updateUser({ displayName: data.name })
                    .then(() => {
                        saveUser(data.name, data.email, data.user_type);
                    })
                    .catch(err => console.log(err))
                console.log(user);
                toast.success('SignUp Successful');
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setError(err.message);
                setLoading(false);
            })
    };

    //save user to db
    const saveUser = (name, email, user_type) => {
        const user = { name, email, user_type };
        fetch(`http://localhost:5000/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setUserEmail(email);
            })
    };

    //Signup with google
    const handleGoogleLogin = () => {
        setError('');
        createUserWithGoogle()
            .then(result => {
                const user = result.user;
                setUserEmail(user.email);
                console.log(user);
                saveUser(user.displayName, user.email, 'Buyer');
                toast.success('SignUp Successful');
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
                setError(err.message);
                setLoading(false);
            })
    }

    return (
        <div className='w-full max-w-sm mx-auto shadow-xl p-8 rounded-md'>
            <h2 className='text-xl'>Sign Up</h2>
            <form onSubmit={handleSubmit(handleSignup)} className='form-control'>
                {/* Account Type */}
                <label className="label">
                    <span className="label-text">Create your account as</span>
                </label>
                <select {...register("user_type", { required: "Select your account type" })} className="select select-bordered w-full max-w-sm">
                    <option>Buyer</option>
                    <option>Seller</option>
                </select>

                {/* Name */}
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input type="text" {...register("name", { required: "Name is required" })} className="input input-bordered w-full max-w-sm" />
                {errors.name && <p className='text-red-700'>{errors.name?.message}</p>}

                {/* Email */}
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="email" {...register("email", { required: "Email is required" })} className="input input-bordered w-full max-w-sm" />
                {errors.email && <p className='text-red-700'>{errors.email?.message}</p>}

                {/* Password */}
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type="password" {...register("password", { required: "Password is required", minLength: { value: 6, message: 'Password must be at least 6 characters' } })} className="input input-bordered w-full max-w-sm" />
                {errors.password && <p className='text-red-700'>{errors.password?.message}</p>}
                {/* Submit button */}
                {error && <p className='text-red-700'>{error}</p>}
                <input type="submit" value="Sign Up" className='btn btn-accent w-full max-w-sm mt-5' />
                <p>Already have an account? <Link to={'/login'} className="text-secondary">Login</Link></p>
                <div className="divider">OR</div>
            </form>
            <button onClick={handleGoogleLogin} className="btn btn-outline btn-info w-full max-w-sm">SignUp With Google</button>
        </div>
    );
};

export default Signup;