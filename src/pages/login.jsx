import React, { use, useState } from 'react'
import Navbar from '../component/navbar'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Bounce, Slide, Flip, Zoom } from 'react-toastify';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        axios.get('https://bewakoof-db-deploy.onrender.com/users')
            .then(response => {
                const users = response.data;
                const foundUser = users.find(u => u.email === user.email && u.password === user.password);
                if (foundUser) {
                    toast.success("Login successful!", {
                        position: "top-right",
                        autoClose: 2000,
                        theme: "dark",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    localStorage.setItem('user', JSON.stringify(foundUser));
                    localStorage.setItem('isAuth', true);
                    navigate('/');
                } else {
                    toast.error("Invalid email or password", {
                        position: "top-right",
                        autoClose: 2000,
                        theme: "dark",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
            .catch(error => {
                console.error(error);
                toast.error("Login failed. Please try again.", {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "dark",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    }

    return (
        <div>
            <div className='hidden md:block'>
                <Navbar />
            </div>
            <div className='w-full flex flex-col md:flex-row md:justify-center md:items-center h-screen md:mt-[100px]'>
                <div className='w-full sticky top-0 md:h-full md:w-[35%] md:static'>
                    <i className="fa-solid fa-circle-chevron-left absolute top-5 left-5 text-white text-2xl opacity-[0.5] cursor-pointer md:hidden" onClick={() => navigate('/')}></i>
                    <img src="https://images.bewakoof.com/web/rm-login-desk-v2.jpg" className='w-full h-full hidden md:block' alt="" />
                    <img src="https://images.bewakoof.com/web/rm-login-mobile-v3.jpg?dt=23:10:2024:15" className='w-full h-full md:hidden' alt="" />
                </div>
                <div className='w-full bg-white rounded-tl-4xl rounded-tr-4xl mt-[-30px] p-10 flex flex-col items-start z-1 md:w-[65%] md:rounded-none md:px-40'>
                    <p className='font-bold text-lg md:text-2xl'>Login</p>
                    <p className='text-[gray] text-sm mb-10 mt-2'>Join us now to be a part of Bewakoof® family.</p>
                    <label htmlFor="" className='font-bold mb-2 text-sm md:text-base'>Email</label>
                    <input type="text" placeholder='Enter your email' className='border border-[gray] w-full h-[40px] ps-5 mb-5 rounded md:h-[50px] text-sm md:text-base' name='email' value={user.email} onChange={handleChange} />
                    <label htmlFor="" className='font-bold mb-2 text-sm md:text-base'>Password</label>
                    <input type="text" placeholder='Enter your password' className='border border-[gray] w-full h-[40px] ps-5 mb-5 rounded md:h-[50px] text-sm md:text-base' name='password' value={user.password} onChange={handleChange} />
                    <button className='border-none w-full h-[40px] bg-black text-white hover:bg-gray-800 rounded md:h-[50px] cursor-pointer' onClick={handleSubmit}>Login</button>
                    <div className='w-full flex items-center mt-5'>
                        <hr className='flex-grow border-[gray]' />
                        <p className='mx-2'>OR</p>
                        <hr className='flex-grow border-[gray]' />
                    </div>
                    <div className='w-full flex justify-between mt-5'>
                        <button className='border-none w-[48%] h-[40px] flex items-center justify-center bg-black text-white rounded cursor-pointer hover:bg-gray-800 md:w-[49%] md:h-[50px]'><i className="fa-brands fa-google mr-2"></i> Google</button>
                        <button className='border-none w-[48%] h-[40px] flex items-center justify-center bg-blue-800 text-white rounded cursor-pointer hover:bg-blue-600 md:w-[49%] md:h-[50px]'><i className="fa-brands fa-facebook mr-2"></i> Facebook</button>
                    </div>
                    <p className='text-xs text-center mt-10 w-full '>New Bewakoof? <span className='font-bold text-[#207BB4] cursor-pointer' onClick={() => navigate('/signup')}>Create Account</span></p>
                    <p className='text-xs text-center mt-5 md:w-full'>By creating an account or logging in, you agree with Bewakoof's <span className='font-bold text-[#207BB4]'>T&C</span> and <span className='font-bold text-[#207BB4]'>Privacy Policy</span></p>
                </div>
            </div>
            <ToastContainer transition={Slide} />
        </div>
    )
}

export default Login