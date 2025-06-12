import React, { use, useState } from 'react'
import Navbar from '../component/navbar'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast, Bounce, Slide, Flip, Zoom } from 'react-toastify';

function Signup() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
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

    // Regex patterns for validation
    const usernameRegex = /^[a-zA-Z0-9]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    // Validation checks
    const isValidUsername = usernameRegex.test(user.username);
    const isValidEmail = emailRegex.test(user.email);
    const isValidPassword = passwordRegex.test(user.password);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle signup logic here
        if (isValidUsername && isValidEmail && isValidPassword) {
            axios.post('https://bewakoof-db-deploy.onrender.com/users', user)
                .then(response => {
                    console.log(response.data);
                    toast.success("Signup successful!", {
                        position: "top-right",
                        autoClose: 2000,
                        theme: "dark",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    navigate('/login');
                })
                .catch(error => {
                    console.error(error);
                    toast.error("Signup failed. Please try again.", {
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
        } else {
            toast.error("Please fill in all fields correctly.", {
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
    }

    return (
        <div>
            <div className='hidden md:block sticky top-0 bg-white z-2'>
                <Navbar />
            </div>
            <div className='w-full flex flex-col md:flex-row md:justify-center md:items-center h-screen md:mt-[100px]'>
                <div className='w-full sticky top-0 md:h-full md:w-[35%] md:static'>
                    <i className="fa-solid fa-circle-chevron-left absolute top-5 left-5 text-white text-2xl opacity-[0.5] cursor-pointer md:hidden" onClick={() => navigate('/')}></i>
                    <img src="https://images.bewakoof.com/web/rm-login-desk-v2.jpg" className='w-full h-full hidden md:block' alt="" />
                    <img src="https://images.bewakoof.com/web/rm-login-mobile-v3.jpg?dt=23:10:2024:15" className='w-full h-full md:hidden' alt="" />
                </div>
                <div className='w-full bg-white rounded-tl-4xl rounded-tr-4xl mt-[-30px] p-10 flex flex-col items-start z-1 md:w-[65%] md:rounded-none md:px-40'>
                    <p className='font-bold text-lg md:text-2xl'>Signup</p>
                    <p className='text-[gray] text-sm mb-10 mt-2'>Join us now to be a part of Bewakoof® family.</p>
                    {/* Username */}
                    <label htmlFor="" className='font-bold mb-2 text-sm md:text-base'>Username</label>
                    <input type="text" placeholder='Enter your username' className='border border-[gray] w-full h-[40px] ps-5 mb-1 rounded md:h-[50px] text-sm md:text-base' name='username' value={user.username} onChange={handleChange} />
                    {user.username && !isValidUsername && <p className='text-[brown] text-xs mb-5'>Username must be at least 3 characters long and can only contain letters and numbers.</p>}
                    {user.username && isValidUsername && <p className='text-[green] text-xs mb-5'>Valid username</p>}
                    {/* Email */}
                    <label htmlFor="" className='font-bold mb-2 text-sm md:text-base'>Email</label>
                    <input type="text" placeholder='Enter your email' className='border border-[gray] w-full h-[40px] ps-5 mb-1 rounded md:h-[50px] text-sm md:text-base' name='email' value={user.email} onChange={handleChange} />
                    {user.email && !isValidEmail && <p className='text-[brown] text-xs mb-5'>Please enter a valid email address.</p>}
                    {user.email && isValidEmail && <p className='text-[green] text-xs mb-5'>Valid email</p>}
                    {/* Password */}
                    <label htmlFor="" className='font-bold mb-2 text-sm md:text-base'>Password</label>
                    <input type="text" placeholder='Enter your password' className='border border-[gray] w-full h-[40px] ps-5 mb-1 rounded md:h-[50px] text-sm md:text-base' name='password' value={user.password} onChange={handleChange} />
                    {user.password && !isValidPassword && <p className='text-[brown] text-xs mb-5'>Password must be at least 8 characters long and contain at least one letter and one number.</p>}
                    {user.password && isValidPassword && <p className='text-[green] text-xs mb-5'>Valid password</p>}
                    <button className='border-none w-full h-[40px] bg-black text-white hover:bg-gray-800 rounded mt-5 md:h-[50px] cursor-pointer' onClick={handleSubmit}>Signup</button>
                    <div className='w-full flex items-center mt-5'>
                        <hr className='flex-grow border-[gray]' />
                        <p className='mx-2'>OR</p>
                        <hr className='flex-grow border-[gray]' />
                    </div>
                    <div className='w-full flex justify-between mt-5'>
                        <button className='border-none w-[48%] h-[40px] flex items-center justify-center bg-black text-white rounded cursor-pointer hover:bg-gray-800 md:w-[49%] md:h-[50px]'><i className="fa-brands fa-google mr-2"></i> Google</button>
                        <button className='border-none w-[48%] h-[40px] flex items-center justify-center bg-blue-800 text-white rounded cursor-pointer hover:bg-blue-600 md:w-[49%] md:h-[50px]'><i className="fa-brands fa-facebook mr-2"></i> Facebook</button>
                    </div>
                    <p className='text-xs text-center mt-10 w-full '>Already Bewakoof? <span className='font-bold text-[#207BB4] cursor-pointer' onClick={() => navigate('/login')}>Login</span></p>
                    <p className='text-xs text-center mt-5 md:w-full'>By creating an account or logging in, you agree with Bewakoof's <span className='font-bold text-[#207BB4]'>T&C</span> and <span className='font-bold text-[#207BB4]'>Privacy Policy</span></p>
                </div>
            </div>
            <div className='hidden md:block'>
                <ToastContainer transition={Slide} />
            </div>
        </div>
    )
}

export default Signup
