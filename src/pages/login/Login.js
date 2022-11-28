import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';
import PasswordResetModal from './PasswordResetModal';

const Login = () => {
    const { loginUser, createUserWithGoogle, loading, setLoading } = useContext(AuthContext);
    const [error, setError] = useState('');
    const { register, formState: { errors }, handleSubmit } = useForm();

    const [userEmail, setUserEmail] = useState('');
    const [token] = useToken(userEmail);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    if (token) {
        navigate(from, { replace: true });
    }

    if (loading) {
        return <progress className="progress progress-warning w-56"></progress>
    }

    const handleLogin = data => {
        setError('');
        loginUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setUserEmail(data.email);
                toast.success('Login Successful');
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setError(err.message)
                setLoading(false);
            })
    };

    const handleGoogleLogin = () => {
        setError('');
        createUserWithGoogle()
            .then(result => {
                const user = result.user;
                setUserEmail(user.email);
                console.log(user);
                toast.success('Login Successful');
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
            <h2 className='text-xl'>Login</h2>
            <form onSubmit={handleSubmit(handleLogin)} className='form-control'>
                {/* Email */}
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="email" {...register("email", { required: true })} className="input input-bordered w-full max-w-sm" />
                {errors.email?.type === 'required' && <p role="alert" className='text-red-700'>Email is required</p>}

                {/* Password */}
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type="password" {...register("password", { required: true, minLength: { value: 6, message: 'Password must be at least 6 characters' } })} className="input input-bordered w-full max-w-sm" />
                <p className='text-red-700'>{errors?.password?.message}</p>
                {errors.password?.type === 'required' && <p role="alert" className='text-red-700'>Password is required</p>}

                {/* Password Reset Button */}
                <label className="label">
                    <label className="label-text-alt btn btn-xs btn-link no-underline" htmlFor="resetPassword">Forgot Password?</label>
                </label>

                {error && <p className='text-red-700'>{error}</p>}

                {/* Submit */}
                <input type="submit" value="Login" className='btn btn-accent w-full max-w-sm' />
                <p>New to Buy&Sell? <Link to={'/signup'} className="text-secondary">Create a new account</Link></p>
                <div className="divider">OR</div>
            </form>
            <button onClick={handleGoogleLogin} className="btn btn-outline btn-info w-full max-w-sm">Continue With Google</button>
            <PasswordResetModal></PasswordResetModal>
        </div>
    );
};

export default Login;