import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { Credentials } from "_components";
import { authActions } from '_store';
import { history } from '_helpers';


function Signup() {

    const dispatch = useDispatch();
    const authUser = useSelector(x => x.auth.user);

    useEffect(() => {
        // redirect to home if already logged in
        if (authUser) history.navigate('/');

    }, []);
    // form validation rules 
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required'),
        email: Yup.string()
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        repassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(user) {
        // console.log(user);
        return dispatch(authActions.signup(user));
    }

    return (
        <div className="grid place-items-center w-[70em] p-10 py-16">
            <Credentials>
                <form onSubmit={handleSubmit(onSubmit)}
                    className="bg-gradient-to-b from-[rgb(241,160,58)] from-10% to-100% to-[rgb(252,245,237)] w-full h-full flex justify-center items-center flex-col  px-10 py-8">
                    <h1 className="text-center text-xl md:text-2xl leading-7 bg-gradient-to-r from-[#3b3a3a] to-[#db9235] from-10% to-100% text-transparent bg-clip-text">
                    SIgn up
                    </h1>

                    <div className="text-center mt-5 text-white">
                    <p className="text-sm font-syncopate-light whitespace-nowrap">
                        Dualnet service allows you to run <br /> to 2 trading accounts.
                    </p>
                    </div>

                    <div className="mt-3 md:mt-10 w-full flex justify-center items-center flex-col">
                    <input
                        required
                        className="bg-transparent border-b-2 border-black outline-none p-1 md:p-2 text-sm md:text-base font-syncopate-light text-white placeholder:text-[rgb(137,136,136)] w-full md:w-auto"
                        name="username" 
                        type="text" 
                        {...register('username')}
                        id="username"
                        placeholder="Username *"
                    />
                    <div className="text-red-500 text-xs h-3">{errors.username?.message}</div>
                    <input
                        required
                        className="bg-transparent border-b-2 border-black outline-none p-1 md:p-2 text-sm md:text-base font-syncopate-light text-white placeholder:text-[rgb(137,136,136)] w-full md:w-auto"
                        name="email" 
                        type="email" 
                        {...register('email')}
                        id="email"
                        placeholder="Email *"
                    />
                    <div className="text-red-500 text-xs h-3">{errors.email?.message}</div>
                    <input
                        required
                        className="bg-transparent border-b-2 border-black outline-none p-1 md:p-2 text-sm md:text-base font-syncopate-light text-white placeholder:text-[rgb(137,136,136)] mt-2 w-full md:w-auto"
                        name="password" 
                        type="password" 
                        {...register('password')}
                        id="password"
                        placeholder="Password *"
                    />
                    <div className="text-red-500 text-xs h-3">{errors.password?.message}</div>
                    <input
                        required
                        className="bg-transparent border-b-2 border-black outline-none p-1 md:p-2 text-sm md:text-base font-syncopate-light text-white placeholder:text-[rgb(137,136,136)] mt-2 w-full md:w-auto"
                        name="repassword" 
                        type="password" 
                        {...register('repassword')}
                        id="repassword"
                        placeholder="Confirm Password *"
                    />
                    <div className="text-red-500 text-xs h-3">{errors.repassword?.message}</div>
                    </div>

                    <div className=" text-center">
                        <div className="my-4">
                            <input type="checkbox" name="confirm" id="confirm" />{" "}
                            <span className="text-[rgb(105,105,105) font-syncopate-light text-sm">
                            {" "}
                            I accept Terms of Service *
                            </span>
                        </div>
                        <button
                            disabled={formState.isSubmitting}
                            className="text-white bg-gradient-to-r from-[rgb(54,114,187)] to-[rgb(129,83,210)] w-full md:px-20 py-1 rounded-md mb-5 whitespace-nowrap"
                            >
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}Sign up
                        </button>
                    </div>

                    <div className="mt-3 text-center">
                    <span className="text-[rgb(105,105,105) font-syncopate-light text-sm">
                        Already have an account?{" "}
                    </span>
                    <NavLink
                        className="text-sm text-[rgb(135,25,165)] mt-5 text-center whitespace-nowrap"
                        to="/login">
                        Sign in
                    </NavLink>
                    </div>
                </form>
            </Credentials>
        </div>
    );
}

export { Signup };