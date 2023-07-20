import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { history } from '_helpers';
import { authActions } from '_store';
import { Credentials } from '_components';

function Login() {
    const dispatch = useDispatch();
    const authUser = useSelector(x => x.auth.user);
    const authError = useSelector(x => x.auth.error);
    const [isEye, setIsEye] = useState(false);

    useEffect(() => {
        // redirect to home if already logged in
        if (authUser) history.navigate('/');

    }, []);

    // form validation rules 
    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required('Email is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    // get functions to build form with useForm() 
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    //get current screen width
    let screenWidth = window.innerWidth;
    console.log('screenWidth', screenWidth)

    function onSubmit({ email, password }) {
        return dispatch(authActions.login({ email, password }));
    }

    return (
      <>
        {/* check whether pc or mobile version */}
        {screenWidth > 425 ? (
        <div className="hidden md:grid place-items-center w-[70em] p-10 py-16">
            <Credentials>
              <form
                method="post" onSubmit={handleSubmit(onSubmit)}
                className="bg-gradient-to-b from-[rgb(160,91,255)] from-10% to-100% to-[rgb(215,215,216)] w-auto h-full flex justify-center items-center flex-col px-10 py-8 dark:from-[rgb(147, 39, 232)] dark:to-[#454555] dark:from-0 dark:to-90%">
                <h1 className="text-center text-2xl leading-7 whitespace-nowrap bg-gradient-to-r from-[#483e4e] to-[#7df04a] from-10% to-100% text-transparent bg-clip-text dark:from-[#3A3737] dark:to-[#44AAFF]">
                  Welcome into <br /> dualnet
                </h1>

                <div className="text-center mt-8 text-white">
                  <h1 className="text-xl">Sign in</h1>
                  <p className="text-sm font-syncopate-light">
                    to access your account
                  </p>
                </div>

                <div className="mt-10 w-full flex justify-center items-center flex-col">
                  <input
                  className={`bg-transparent border-b-[1px] border-black font-syncopate-light outline-none p-2 text-lg text-white placeholder:text-[rgb(107,102,109)] w-auto ${errors.username ? 'is-invalid' : ''} dark:placeholder:text-[#fff] dark:border-white`}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email *"
                    {...register('email')} 
                  />
                  <div className="text-red-500 text-sm h-3">{errors.email?.message}</div>
                  <div className='relative'>
                    <input
                      className={`bg-transparent border-b-[1px] border-black outline-none p-2 text-lg font-syncopate-light text-white placeholder:text-[rgb(107,102,109)] mt-5 w-auto ${errors.password ? 'is-invalid' : ''} dark:placeholder:text-[#fff] dark:border-white`}
                      type={isEye?"password": "text"}
                      name="password"
                      id="password"
                      placeholder="Password *"
                      {...register('password')}
                    />
                    <span className='absolute top-8 right-1 text-lg' onClick={()=>setIsEye(!isEye)} >{isEye?<FaEye />: <FaEyeSlash />}</span>
                  </div>
                  <div className="text-red-500 text-sm h-3">{errors.password?.message}</div>
                </div>

                <div className="mt-5 text-center">
                  <button disabled={formState.isSubmitting} className="text-white bg-gradient-to-r from-[rgb(54,114,187)] to-[rgb(129,83,210)] w-full px-20 py-1 rounded-md mb-3">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                    Login
                  </button>
                  <br />
                  {/* <NavLink to="/forgot" className="text-sm text-[rgb(87,87,87)] text-center">ORGOT YOUR PASSWORD?</NavLink> */}
                </div>

                <NavLink
                  className="text-base text-[rgb(135,25,165)] mt-5 text-center whitespace-nowrap dark:text-white"
                  to="/signup">
                  not a member? Sign up now!
                </NavLink>
              </form>
            </Credentials>
        </div>
        ) : (
        <div className="md:hidden grid place-items-center">
          <Credentials>
            <form
              method="post" onSubmit={handleSubmit(onSubmit)}
              className="bg-gradient-to-b from-[#9327E8] from-0% to-100% to-[rgb(217, 217, 217)] w-auto h-full flex justify-center items-center flex-col px-10 pt-[35px] pb-[115px] dark:from-[rgb(147, 39, 232)]">
              <h1 className="text-center text-base whitespace-nowrap bg-gradient-to-r from-[#483e4e] to-[#7df04a] from-10% to-100% text-transparent bg-clip-text dark:from-[#3A3737] dark:to-[#44AAFF]">
                Welcome into <br /> dualnet
              </h1>

              <div className="text-center mt-[19px] text-white">
                <h1 className="text-base">Sign in</h1>
              </div>

              <div className="w-full flex justify-center items-center flex-col">
                <p className='text-base text-center mt-[53px] text-black'>E-MAIL</p>
                <input
                className={`bg-transparent border-b-[1px] text-sm border-[#544A4A] font-roboto outline-none p-2 text-black placeholder:text-[rgb(107,102,109)] w-auto text-center ${errors.username ? 'is-invalid' : ''}`}
                  type="email"
                  name="email"
                  id="email"
                  {...register('email')} 
                />
                <div className="text-red-500 text-sm h-3">{errors.email?.message}</div>
                <div className='relative'>
                  <p className='text-base text-center mt-[32px] text-black'>PASSWORD</p>
                  <input
                    className={`bg-transparent border-b-[1px] text-sm	border-[#544A4A] font-roboto outline-none p-2 text-black placeholder:text-[rgb(107,102,109)] text-center w-auto ${errors.password ? 'is-invalid' : ''}`}
                    type={isEye?"password": "text"}
                    name="password"
                    id="password"
                    {...register('password')}
                  />
                  {/* <span className='absolute top-8 right-1 text-lg' onClick={()=>setIsEye(!isEye)} >{isEye?<FaEye />: <FaEyeSlash />}</span> */}
                </div>
                <div className="text-red-500 text-sm h-3">{errors.password?.message}</div>
              </div>

              <div className="mt-[38px] text-center">
                <button disabled={formState.isSubmitting} className="text-white bg-gradient-to-r from-[rgb(54,114,187)] to-[rgb(129,83,210)] w-full px-[28px] py-[7px] rounded-md mb-3">
                  {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                  Sign in
                </button>
                <br />
                {/* <NavLink to="/forgot" className="text-sm text-[rgb(87,87,87)] text-center">ORGOT YOUR PASSWORD?</NavLink> */}
              </div>

              <NavLink
                className="text-base text-black text-opacity-68 text-center"
                to="/signup">
                Forgot Your Password
              </NavLink>
            </form>
          </Credentials>
        </div>
        )}
      </>
    )
}

export { Login };
